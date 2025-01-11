/** @type {import('tailwindcss').Config} */
export default {
    content: ["src/**/*.{html,js,tsx,ts}"],
    theme: {
        extend: {},
        colors: {
            "red-main": "#FD9891",
            "red-shade": "#42221F",
            "green-main": "#7EE2B8",
            "green-shade": "#1C3329",
            "blue-main": "#579DFF",
            "blue-shade": "#1D2B41",
            "gray-dark": "#151a1d",
            "gray-light": "#303a43",
            "tab-wrapper-gray": "#1e2125",
        },
    },
    plugins: [require("daisyui")],
};
