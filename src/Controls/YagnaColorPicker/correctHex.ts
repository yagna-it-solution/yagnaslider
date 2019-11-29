export const MIN_HEX_LENGTH = 3;
export const MAX_HEX_LENGTH = 6;

/**
 * Corrects a hex color to have length 3 or 6. Defaults to white if too short.
 * Does NOT check anything besides the length (such as valid characters) and does NOT handle
 * hex values starting with # sign.
 */
export function correctHex(hex: string): string {
    if (!hex || hex.length < MIN_HEX_LENGTH) {
        return 'ffffff'; // not a valid color--default to white
    }
    if (hex.length >= MAX_HEX_LENGTH) {
        return hex.substring(0, MAX_HEX_LENGTH);
    }
    return hex.substring(0, MIN_HEX_LENGTH);
}
