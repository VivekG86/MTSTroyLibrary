// Role abstraction — replace this module with real authentication later.
// The rest of the app only imports from here; no auth logic leaks elsewhere.
//
// IMPORTANT: Hiding UI in the frontend is NOT real security.
// The backend Reviews API must independently enforce admin authorization.

export type UserRole = 'user' | 'admin';

/**
 * Returns the current role.
 *
 * To switch to admin for testing:
 *   localStorage.setItem('troylibrary_role', 'admin')  → refresh
 *
 * Replace this function with a real auth token check when auth is added.
 */
export function getRole(): UserRole {
  try {
    return localStorage.getItem('troylibrary_role') === 'admin' ? 'admin' : 'user';
  } catch {
    return 'user';
  }
}
