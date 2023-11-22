// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: "none",
  arrowParens: "avoid",
  tabWidth: 2,
  plugins: ["prettier-plugin-organize-imports"]
};

module.exports = config;
