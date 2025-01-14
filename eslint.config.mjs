/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
// @ts-nocheck
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { default as eslintPlugin } from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    )
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(eslintPlugin),
      prettier: fixupPluginRules(prettier)
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json"
      }
    },

    rules: {
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto"
        },
        {
          usePrettierrc: true
        }
      ],

      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "array",
          readonly: "array"
        }
      ],

      "@typescript-eslint/consistent-type-exports": "error",

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],

      "default-param-last": "off",
      "@typescript-eslint/default-param-last": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"]
        },
        {
          selector: "typeLike",
          format: ["PascalCase"]
        }
      ],

      "@typescript-eslint/no-array-delete": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-duplicate-type-constituents": "error",

      "@typescript-eslint/typedef": [
        "warn",
        {
          memberVariableDeclaration: true,
          propertyDeclaration: true,
          parameter: true
        }
      ],

      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];
