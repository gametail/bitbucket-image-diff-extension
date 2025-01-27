/** @type {import('tailwindcss').Config} */

export default {
    content: ["src/**/*.{html,js,tsx,ts}"],
    theme: {
        extend: {},
        colors: {
            "red-light": "#ffeceb",
            "red-saturated": "#ae2e24",
            "red-main": "#FD9891",
            "red-shade": "#42221F",
            "green-light": "#dcfff1",
            "green-saturated": "#216e4e",
            "green-main": "#7EE2B8",
            "green-shade": "#1C3329",
            "blue-light": "#d6e7ff",
            "blue-saturated": "#4b79c1",
            "blue-main": "#579DFF",
            "blue-shade": "#1D2B41",
            "dark-container": "#161a1d",
            "light-container": "#f7f8f9",
        },
    },
    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            "light",
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    "base-100": "#1d2125",
                    "base-200": "#282d33",
                    "base-300": "#333c43",
                },
            },
        ],
    },
};
