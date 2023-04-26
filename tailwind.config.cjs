/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        // "./public/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        fontSize: {
            h: ["32px", { lineHeight: "44.8px", fontWeight: "500" }],

            h1: ["28px", { lineHeight: "28px", fontWeight: "600" }],

            h2: ["20px", { lineHeight: "28px", fontWeight: "500" }],

            "header/h2": ["24px", { lineHeight: "33.6px", fontWeight: "600" }],

            h3: ["18px", { lineHeight: "25.2px", fontWeight: "500" }],

            h4: ["16px", { lineHeight: "22.4px", fontWeight: "500" }],
            "body1/medium": [
                "16px",
                { lineHeight: "22.4px", fontWeight: "500" },
            ],
            "body1/regular": [
                "16px",
                { lineHeight: "22.4px", fontWeight: "400" },
            ],

            "body2/medium": [
                "14px",
                { lineHeight: "19.6px", fontWeight: "500" },
            ],
            "body2/regular": [
                "14px",
                { lineHeight: "19.6px", fontWeight: "400" },
            ],
            "body3/medium": [
                "12px",
                { lineHeight: "16.8px", fontWeight: "500" },
            ],
            "body3/regular": [
                "12px",
                { lineHeight: "16.8px", fontWeight: "400" },
            ],

            "label/medium": ["11px", { lineHeight: "11px", fontWeight: "500" }],
            "label/regular": [
                "11px",
                { lineHeight: "15.4px", fontWeight: "400" },
            ],

            "caption/medium": [
                "12px",
                { lineHeight: "12px", fontWeight: "500", letterSpacing: "1%" },
            ],
            "caption/regular": [
                "12px",
                { lineHeight: "12px", fontWeight: "400", letterSpacing: "1%" },
            ],

            "button/bold": [
                "16px",
                { lineHeight: "22.4px", fontWeight: "700" },
            ],
            "button1/semibold": [
                "14px",
                { lineHeight: "19.6px", fontWeight: "600" },
            ],
            "button1/regular": [
                "14px",
                { lineHeight: "14px", fontWeight: "400" },
            ],
            "button2/semibold": [
                "12px",
                { lineHeight: "12px", fontWeight: "600" },
            ],
            "button2/regular": [
                "12px",
                { lineHeight: "12px", fontWeight: "400" },
            ],

            "link1/medium": ["14px", { lineHeight: "14px", fontWeight: "500" }],
            "link1/regular": [
                "14px",
                { lineHeight: "14px", fontWeight: "400" },
            ],
            "link2/medium": ["12px", { lineHeight: "12px", fontWeight: "500" }],
            "link2/regular": [
                "12px",
                { lineHeight: "12px", fontWeight: "400" },
            ],
            "tab/h2": ["24px", { lineHeight: "33.6px", fontWeight: "600" }],
            small: ["8px", { lineHeight: "100%", fontWeight: "500" }],
        },
        colors: {
            custom: {
                gray: "#F8F9FB",
                border: "#E8E9ED"
            },
            gray: {
                900: "#1D2136",
                800: "#2F3246",
                700: "#474A5C",
                600: "#666977",
                500: "#888A95",
                400: "#A7A9B2",
                300: "#C2C4CB",
                200: "#D7D9DE",
                100: "#E8E9ED",
                50: "#F8F9FB",
            },
            blue: {
                900: "#013F74",
                800: "#015195",
                700: "#0161B3",
                600: "#016ECC",
                500: "#017DE8",
                400: "#459FEE",
                300: "#80BDF3",
                200: "#AED4F7",
                100: "#D2E6FB",
                50: "#F4F8FE",
            },
            orange: {
                900: "#803C0C",
                800: "#A44D0F",
                700: "#C55D12",
                600: "#E06A15",
                500: "#FF7918",
                400: "#FE9C57",
                300: "#FDBB8D",
                200: "#FDD3B7",
                100: "#FDE6D7",
                50: "#FDF8F7",
            },
            yellow: {
                900: "#805F0C",
                800: "#A47A0F",
                700: "#C59312",
                600: "#E0A715",
                500: "#FFBE18",
                400: "#FECF57",
                300: "#FDDD8D",
                200: "#FDE9B7",
                100: "#FDF2D7",
                50: "#FDFAF3",
            },
            green: {
                900: "#0C5B18",
                800: "#0F741F",
                700: "#128C25",
                600: "#149F2A",
                500: "#17B530",
                400: "#55C868",
                300: "#8BD999",
                200: "#B5E6BF",
                100: "#D5F0DC",
                50: "#F1F9F4",
            },
            red: {
                900: "#7C1E1E",
                800: "#9F2626",
                700: "#BF2E2E",
                600: "#D93434",
                500: "#F73B3B",
                400: "#F86F70",
                300: "#F99C9E",
                200: "#FABFC2",
                100: "#FBDBDE",
                50: "#FCF6F8",
            },
            white: "#FFFFFF",
            black: "#000000",
            transparent: "transparent",
        },
        extend: {
            //use this for the custom font
            // fontFamily: {
            //     sans: ["nexa", ...defaultTheme.fontFamily.sans],
            // },
            backgroundImage: {
                "register-image":
                    "url('/assets/images/register/register-image.jpeg')",
                "verification-image":
                    "url('/assets/images/register/verification.svg')",
            },
            backgroundSize: {
                "register-size": "100% 60%",
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                13: "repeat(13, minmax(0, 1fr))",
                14: "repeat(14, minmax(0, 1fr))",
                15: "repeat(15, minmax(0, 1fr))",
                16: "repeat(16, minmax(0, 1fr))",
                17: "repeat(17, minmax(0, 1fr))",
                18: "repeat(18, minmax(0, 1fr))",
                19: "repeat(19, minmax(0, 1fr))",
                20: "repeat(20, minmax(0, 1fr))",
                21: "repeat(21, minmax(0, 1fr))",

                // Complex site-specific column configuration
                footer: "200px minmax(900px, 1fr) 100px",
            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1084px",
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/aspect-ratio"),
        require("@headlessui/tailwindcss"),
        require("autoprefixer"),
    ],
};
