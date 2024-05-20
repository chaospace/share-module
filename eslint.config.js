// import { fixupPluginRules } from "@eslint/compat";
const tseslint = require("typescript-eslint");
const eslintReactRecommended = require("eslint-plugin-react");
const eslintReactHooks = require("eslint-plugin-react-hooks");
const { fixupPluginRules } = require("@eslint/compat");
const { plugins } = require("eslint-plugin-react/configs/all");

const tsconfig = tseslint.config({
  files: ["src/**/*.{tsx,ts}"],
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: [
        "tsconfig.json",
        "./front/tsconfig.json",
        "./share/tsconfig.json",
        "./styled-composer/tsconfig.json",
      ],
      tsConfigRootDir: __dirname,
    },
  },
  rules: {
    "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    react: {
      version: "18.3.1",
    },
  },
});

const arules = {};
for (let p in eslintReactRecommended.rules) {
  if (p !== "react/no-string-refs") {
    arules[p] = eslintReactRecommended.rules[p];
  }
}

const reactRecommended = {
  files: ["src/**/*.tsx", "src/**/*.ts"],
  plugins: {
    react: fixupPluginRules(eslintReactRecommended),
  },
  languageOptions: {
    ...eslintReactRecommended.configs.recommended.languageOptions,
  },
  rules: {
    ...eslintReactRecommended.configs.recommended.rules,
  },
};
const reactHooks = {
  files: ["src/**/*.{tsx,ts}"],
  plugins: {
    "react-hooks": fixupPluginRules(eslintReactHooks),
  },
  rules: {
    ...eslintReactHooks.configs.recommended.rules,
    "react/no-unescaped-entities": "off",
  },
};

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [...tsconfig, reactRecommended, reactHooks];

module.exports = config;
