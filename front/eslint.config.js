const config = require('../eslint.config');
const { fixupPluginRules } = require('@eslint/compat');
const eslintTanstackQuery = require('@tanstack/eslint-plugin-query');

// const tanStackRecommended = eslintTanstackQuery.configs.recommended;

const tanStackRecommended = {
  plugins: {
    '@tanstack/eslint-plugin-query': fixupPluginRules(eslintTanstackQuery)
  }
};

module.exports = [...config, tanStackRecommended];
