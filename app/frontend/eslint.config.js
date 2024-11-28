import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"] 
  },
  { 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn instead of error for unused vars, ignore vars starting with "_"
      "react/prop-types": "off", // Disable prop-types validation
      "react/react-in-jsx-scope": "off", // Disable requirement for React import in scope for JSX
      "react/no-unescaped-entities": "warn", // Warn for unescaped characters like quotes
    },
  },
];
