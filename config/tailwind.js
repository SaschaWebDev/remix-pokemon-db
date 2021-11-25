module.exports = {
  purge: ["./app/**/*{ts,tsx}"],
  darkMode: "media",
  theme: { extend: {} },
  variants: {},
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
