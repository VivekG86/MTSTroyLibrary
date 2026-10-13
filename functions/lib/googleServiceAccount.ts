/**
 * Google Service Account JWT authentication for Cloudflare Workers.
 *
 * Uses Web Crypto (SubtleCrypto) — no Node.js APIs.
 * Never logs the private key, JWT, or access token.
 */

/** Base64url-encode an ArrayBuffer (used for JWT signature). */
function base64urlFromBuffer(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Base64url-encode a plain string (used for JWT header/payload). */
function base64urlFromString(str: string): string {
  const bytes = new TextEncoder().encode(str);
  return base64urlFromBuffer(bytes.buffer as ArrayBuffer);
}

/**
 * Import a PEM-encoded RSA private key (PKCS#8) as a CryptoKey.
 *
 * Cloudflare secrets replace real newlines with the literal two-character
 * sequence \n — this is normalised before decoding.
 */
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  // Normalise literal \n sequences that Cloudflare injects into secrets.
  const normalised = pem.replace(/\\n/g, '\n');

  const pemBody = normalised
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/-----BEGIN RSA PRIVATE KEY-----/g, '')
    .replace(/-----END RSA PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '');

  let binaryStr: string;
  try {
    binaryStr = atob(pemBody);
  } catch {
    throw new Error('Private key is not valid base64 — check GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY format.');
  }

  const der = Uint8Array.from(binaryStr, c => c.charCodeAt(0)).buffer;

  return crypto.subtle.importKey(
    'pkcs8',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,   // not extractable
    ['sign'],
  );
}

/**
 * Obtain a short-lived Google OAuth2 access token using a service account.
 *
 * @param serviceAccountEmail  Value of GOOGLE_SERVICE_ACCOUNT_EMAIL secret
 * @param privateKeyPem        Value of GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY secret
 * @param scope                OAuth2 scope(s), space-separated
 */
export async function getServiceAccountAccessToken(
  serviceAccountEmail: string,
  privateKeyPem: string,
  scope: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header  = base64urlFromString(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64urlFromString(JSON.stringify({
    iss: serviceAccountEmail,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));

  const signingInput = `${header}.${payload}`;

  let privateKey: CryptoKey;
  try {
    privateKey = await importPrivateKey(privateKeyPem);
  } catch (err) {
    throw new Error(`Private key import failed: ${err instanceof Error ? err.message : 'unknown error'}`);
  }

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signingInput),
  );

  const jwt = `${signingInput}.${base64urlFromBuffer(signature)}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString(),
  });

  if (!tokenRes.ok) {
    // Do not include the response body — it may contain token details.
    throw new Error(`Token exchange failed with HTTP ${tokenRes.status}`);
  }

  const data = await tokenRes.json() as { access_token?: string; error?: string; error_description?: string };
  if (!data.access_token) {
    const hint = data.error ? `(${data.error})` : '';
    throw new Error(`Token exchange returned no access_token ${hint}`);
  }

  return data.access_token;
}
