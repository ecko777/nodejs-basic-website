import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  // 1. CONFIGURACIÓN BASE
  {
    files: ['**/*.js'],

    // Reglas recomendadas de ESLint
    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },

    // Reglas generales
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'consistent-return': 'warn',
    },
  },

  // 2. CONFIGURACIÓN JEST
  {
    files: ['**/__tests__/**/*.js'],

    plugins: {
      jest: jestPlugin,
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // 3. CONFIGURACIÓN PRETTIER (Siempre al final)
  prettierRecommended,
];
