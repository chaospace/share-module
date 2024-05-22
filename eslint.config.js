// import { fixupPluginRules } from "@eslint/compat";
const tseslint = require("typescript-eslint");
const eslintReactRecommended = require("eslint-plugin-react");
const eslintReactHooks = require("eslint-plugin-react-hooks");
const { fixupPluginRules } = require("@eslint/compat");

const tsconfig = tseslint.config({
  files: ["src/**/*.{tsx,ts}"],
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true, // 실행 위치에서 가장 가까운 tsconfig참조
      tsConfigRootDir: __dirname,
    },
  },
  rules: {
    "jsx-quotes": ["warn", "prefer-single"],
    "@typescript-eslint/quotes": ["warn", "single", { avoidEscape: true }],
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
});

const arules = {};
for (let p in eslintReactRecommended.rules) {
  if (p !== "react/no-string-refs") {
    arules[p] = eslintReactRecommended.rules[p];
  }
}

const reactRecommended = {
  // files: ["src/**/*.{tsx,ts}"],
  plugins: {
    react: fixupPluginRules(eslintReactRecommended),
  },
  languageOptions: {
    ...eslintReactRecommended.configs.recommended.languageOptions,
  },
  rules: {
    ...eslintReactRecommended.configs.recommended.rules,
  },
  settings: {
    react: {
      version: "18.3.1",
    },
  },
};
const reactHooks = {
  // files: ["src/**/*.{tsx,ts}"],
  plugins: {
    "react-hooks": fixupPluginRules(eslintReactHooks),
  },
  rules: {
    ...eslintReactHooks.configs.recommended.rules,
    "react/no-unescaped-entities": "off",
  },
};

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...tsconfig,
  reactRecommended,
  reactHooks,
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "config/**",
      "assets/**",
      ".storybook/**",
    ],
  },
];

module.exports = config;
