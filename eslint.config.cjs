const {
  defineConfig,
  globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const jsdoc = require("eslint-plugin-jsdoc");
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
    "@typescript-eslint": typescriptEslint,
    jsdoc,
    promise,
    "checked-exceptions": checkedExceptions,
  },

  extends: compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsdoc/recommended",
    "plugin:promise/recommended",
  ),

  settings: {
    jsdoc: {
      mode: "typescript",
    },
  },

  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "jsdoc/no-undefined-types": "off",
    "jsdoc/require-jsdoc": [
      "warn",
      {
        contexts: [
          "FunctionDeclaration",
          "FunctionExpression",
          "ArrowFunctionExpression",
          "MethodDefinition",                 // <— aqui!
          "ClassDeclaration > MethodDefinition",
          "ExportNamedDeclaration > ClassDeclaration > MethodDefinition",
          "TSMethodSignature"
        ]
      }
    ],
    "jsdoc/require-throws": [
      "error",
      {
        contexts: [
          "FunctionDeclaration",
          "FunctionExpression",
          "ArrowFunctionExpression",
          "MethodDefinition",                 // <— aqui!
          "ClassDeclaration > MethodDefinition",
          "ExportNamedDeclaration > ClassDeclaration > MethodDefinition",
          "TSMethodSignature"
        ]
      }
    ],
    "checked-exceptions/undocumented-errors": ["warn"],
    "checked-exceptions/uncaught-errors": "error",
    "@typescript-eslint/only-throw-error": "error",
    "promise/catch-or-return": "error",
    "@typescript-eslint/no-floating-promises": "error",
  },
}, globalIgnores(["**/node_modules/", "**/dist/", "**/build/"])]);