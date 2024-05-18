// Helper function to get a color based on the first letter of the string
export const charToColor = (char: string, saturation = 1, lightness = 0.7, random = false) => {
    // Get the number from the first character
    const code = char.charCodeAt(0);

    // Bound saturation and lightness values
    saturation = Math.min(100, Math.max(0, saturation * 100));
    lightness = Math.min(100, Math.max(0, lightness * 100));

    // Generate hue from the char
    const hue = (code * (random ? Math.random() : 1) * 137) % 360;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}