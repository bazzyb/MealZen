import eslintPlugin from "@eslint/js";
import eslintTsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
// import eslintReact from "eslint-plugin-react";
// import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintA11y from "eslint-plugin-jsx-a11y";
import eslintTestingLibrary from "eslint-plugin-testing-library";

const filesToIgnore = [
  // default
  "**/.git",
  "**/node_modules/**",

  // configs
  "**/.prettierrc",
  "**/*.config.js",

  // build artifiacts
  "**/dist/**",
  "**/build/**",
];

const config = (async () => {
  /**
   * @type {import("eslint").Linter.Config}
   */
  const config = [
    {
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      files: ["**/*.{cjs,mjs,js,jsx,ts,tsx}"],
      ignores: filesToIgnore,
      plugins: {
        // react: eslintReact,
        // "react-hooks": eslintReactHooks,
        "jsx-a11y": eslintA11y,
        "@typescript-eslint": eslintTsPlugin,
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        // Recommended rules
        ...eslintPlugin.configs.recommended.rules,
        ...eslintTsPlugin.configs.recommended.rules,
        // ...eslintReact.configs.recommended.rules,
        // ...eslintReactHooks.configs.recommended.rules,
        ...eslintA11y.configs.recommended.rules,

        // OFF
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        "no-undef": "off",
        // "react/react-in-jsx-scope": "off",

        // WARN
        // I'm ok with non-null assertions, but I want to be warned about them
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",

        // ERROR
        "no-console": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            varsIgnorePattern: "_",
            argsIgnorePattern: "_",
          },
        ],
      },
    },
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      ...eslintTestingLibrary.configs["flat/dom"],
    },
  ];
  return config;
})();

export default config;
