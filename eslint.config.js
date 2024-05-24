// eslint-disable

const tseslint = require('typescript-eslint');
const eslintReactRecommended = require('eslint-plugin-react');
const eslintReactHooks = require('eslint-plugin-react-hooks');
//const eslitPrettier = require('prettier');
const { fixupPluginRules } = require('@eslint/compat');
const eslintPrettierRecommended = require('eslint-plugin-prettier/recommended');

const tsconfig = tseslint.config({
  files: ['src/**/*.{tsx,ts}'],
  plugins: {
    '@typescript-eslint': tseslint.plugin
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true, // 실행 위치에서 가장 가까운 tsconfig참조
      tsConfigRootDir: __dirname
    }
  },
  rules: {
    'jsx-quotes': ['warn', 'prefer-single'],
    '@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ]
  }
});

const reactRecommended = {
  // files: ["src/**/*.{tsx,ts}"],
  plugins: {
    react: fixupPluginRules(eslintReactRecommended)
  },
  languageOptions: {
    ...eslintReactRecommended.configs.recommended.languageOptions
  },
  rules: {
    ...eslintReactRecommended.configs.recommended.rules,
    'react/no-unescaped-entities': 'off'
  },
  settings: {
    react: {
      version: '18.3.1'
    }
  }
};
const reactHooks = {
  plugins: {
    'react-hooks': fixupPluginRules(eslintReactHooks)
  },
  rules: {
    ...eslintReactHooks.configs.recommended.rules
  }
};

const prettierRecommended = {
  ...eslintPrettierRecommended,
  rules: {
    ...eslintPrettierRecommended.rules,
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true
      }
    ]
  }
};

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...tsconfig,
  reactRecommended,
  reactHooks,
  eslintPrettierRecommended,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'config/**',
      'assets/**',
      '.storybook/**',
      'storybook-static/**'
    ]
  }
];

module.exports = config;
