module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          450: "#CBCBFF",
        },
        purple: {
          850: "#853594",
          950: "#43144A",
          990: "#23144B",
        },
        pink: {
          950: "#EE8D94",
        },
        yellow: {
          950: "#FFC700",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
