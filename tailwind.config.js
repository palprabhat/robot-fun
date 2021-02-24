module.exports = {
  purge: ["./pages/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  darkMode: false,
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
