const {
  defineConfig,
  globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const promise = require("eslint-plugin-promise");
const checkedExceptions = require("eslint-plugin-checked-exceptions");
const globals = require("globals");
const js = require("@eslint/js");

const {
  FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([{
  files: ["**/*.ts"],
  languageOptions: {
    parser: tsParser,
    sourceType: "module",
    ecmaVersion: 2020,

    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
    },

    globals: {
      ...globals.node,
    },
  },

  plugins: {
    promise,
    "checked-exceptions": checkedExceptions,
  },

  extends: compat.extends(
    "plugin:promise/recommended",
  ),

  settings: {
    
  },

  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "checked-exceptions/undocumented-errors": ["warn"],
    "checked-exceptions/uncaught-errors": "error",
  },
}, globalIgnores(["**/node_modules/", "**/dist/", "**/build/"])]);