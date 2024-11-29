import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    files: ["**/*.js"],
    ignores: ["node_modules/"],
  },

  pluginJs.configs.recommended,

  {
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused variables starting with `_`
      "no-console": "off", // Allow `console.log` in tests
      "semi": ["error", "always"], // Enforce semicolons
      "quotes": ["error", "double"], // Enforce double quotes
    },
  },
];
