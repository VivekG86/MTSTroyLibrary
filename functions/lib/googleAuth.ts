/**
 * Exchanges a long-lived OAuth 2.0 refresh token for a short-lived access token.
 * Called on every request — Google tokens expire in 1 hour and are not cached
 * across Workers invocations (stateless environment).
 */
export async function getAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string> {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OAuth token refresh failed (${res.status}): ${text}`);
  }

  const data = await res.json() as { access_token?: string; error?: string };
  if (!data.access_token) {
    throw new Error(`OAuth token refresh returned no access_token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}
