/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        textAnim: "textAnim 4s",
        text: "text 5s ease infinite",
      },
      keyframes: {
        textAnim: {
          "0%, 100%": {
            transform: " scale(1)",
          },
          "50%": {
            transform: " scale(1.05)",
          },
          /*  "66%": {
            transform: "translate(-20px,20px) scale(0.9)",
          }, */
          /* "100%": {
            transform: "translate(0px,0px) scale(1)",
          }, */
        },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
