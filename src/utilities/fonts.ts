import localFont from "next/font/local";

const Satoshi = localFont({
    src: [
        {
            path: "../assets/fonts/Satoshi/Regular[wght].ttf",
            style: "normal",
            weight: "300 900",
        },
        {
            path: "../assets/fonts/Satoshi/Italic[wght].ttf",
            style: "italic",
            weight: "300 900",
        },
    ],
});

export { Satoshi };
