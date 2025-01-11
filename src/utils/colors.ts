import { ClassValue } from "clsx";

export const COLOR_CONFIG_MAP: Record<ColorNames, ColorConfig> = {
    green: {
        text: "text-green-main",
        bg: "bg-green-shade",
        border: "border-green-main",
    },
    red: {
        text: "text-red-main",
        bg: "bg-red-shade",
        border: "border-red-main",
    },
    blue: {
        text: "text-blue-main",
        bg: "bg-blue-shade",
        border: "border-blue-main",
    },
};

type ColorConfig = {
    text: string;
    bg: string;
    border: string;
};

export type ColorNames = "green" | "red" | "blue";

type RGBTuple = [number, number, number];

/**
 * Converts a hex color string (e.g., "#ff00ff") to an RGBTuple.
 * @param hex - The hex color string (e.g., "#ff00ff").
 * @returns An RGBTuple representing the color (e.g., [255, 0, 255]).
 */
export function hexToRGBTuple(hex: string): RGBTuple {
    // Validate hex string
    if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        console.error("Invalid hex color string. Must be in the format #RRGGBB.");
        return [255, 0, 0];
    }

    // Parse the hex string into RGB components
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
}
