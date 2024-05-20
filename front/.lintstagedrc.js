const baseConfig = require("../.lintstagedrc.js");

module.exports = {
  ...baseConfig,
  "*.{tsx,ts}": "pnpm lint",
};
