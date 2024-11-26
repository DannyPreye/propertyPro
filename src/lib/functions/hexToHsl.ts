export default function hexToHSL(hex: string)
{
    // Remove the hash sign if present
    hex = hex.replace("#", "");

    // Convert hex to RGB first
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find the minimum and maximum values of R, G, and B
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate lightness
    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (max !== min) {
        const d = max - min;

        // Calculate saturation
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        // Calculate hue
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100
    )}%`;
};
