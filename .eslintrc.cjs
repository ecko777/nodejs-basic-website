module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true  
  },
  extends: [
    "eslint:recommended", 
    "plugin:prettier/recommended",
    "plugin:jest/recommended" 
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "jest" 
  ],
  rules: {
    "no-console": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "consistent-return": "warn"
  }
};