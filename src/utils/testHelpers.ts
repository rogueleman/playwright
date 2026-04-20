/**
 * Test utility helpers for common operations
 */

/**
 * Generate a unique username using UUID format
 * Format: gmg-{random-hex}
 * Example: gmg-a1b2c3d4e5f6
 */
export function generateUniqueUsername(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(6));
  const hexString = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `gmg-${hexString}`;
}
