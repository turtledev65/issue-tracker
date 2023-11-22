// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: "none",
  arrowParens: "avoid",
  tabWidth: 2,
  pluginSearchDirs: ".",
  plugins: ["prettier-plugin-organize-imports"]
};
