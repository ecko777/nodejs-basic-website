module.exports = {
  // Configuración base para todo el proyecto (archivos JS normales)
  extends: [
    "eslint:recommended", 
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    node: true,
    es2021: true
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    "consistent-return": "warn"
  },

 
  overrides: [
    {
      files: ["**/__tests__/**/*.js"],
      env: {
        jest: true // Habilita las variables globales de Jest (describe, test, expect)
      },
      extends: [
        "plugin:jest/recommended" // Carga las reglas de Jest 
      ],
      plugins: ["jest"]
    }
  ]
};