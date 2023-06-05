/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {},
    // --breakpoint-xs: 0;
    // --breakpoint-sm: 576px;
    // --breakpoint-md: 768px;
    // --breakpoint-lg: 992px;
    // --breakpoint-xl: 1200px;

    screens: {},
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
