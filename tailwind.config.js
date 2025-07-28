//  /** @type {import('tailwindcss').Config} */
// export default {
//    content: ["./views/**/*.ejs"],
//    theme: {
//      extend: {},
//    },
//    plugins: [],
//  }
/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./views/**/*.ejs", "./public/**/*.js"], // adjust paths as per your project
  content: ["./views/**/*.{html,js,ejs}", "./*.html", "./*.ejs"], // adjust paths as per your project

  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      animation: {
        rise: "rise 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        rise: {
          "0%, 100%": { transform: "translateY(20px)", opacity: "0.5" },
          "50%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      textStrokeWidth: {
        DEFAULT: "1px",
        2: "2px",
      },
      textStrokeColor: {
        black: "#000",
        white: "#fff",
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./*.html",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

