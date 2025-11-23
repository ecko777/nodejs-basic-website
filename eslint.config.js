import js from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [
  // 1. CONFIGURACIÓN BASE (Para archivos de código fuente normales)
  {
    files: ["**/*.js"],
    
    // Reglas recomendadas de ESLint
    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Habilitar entornos Node y ES2021
        ...globals.node,
        ...globals.es2021
      }
    },
    
    // Reglas generales del proyecto
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "consistent-return": "warn"
    }
  },

  // 2. CONFIGURACIÓN JEST (Sobreescribe la configuración SÓLO para archivos de prueba)
  {
    files: ["**/__tests__/**/*.js"],
    
    plugins: {
      jest: jestPlugin
    },

    rules: {
      // Cargar reglas recomendadas de jest
      ...jestPlugin.configs.recommended.rules
    },
    
    languageOptions: {
        globals: {
            ...globals.jest // Habilita describe, test, expect, etc.
        }
    }
  },

  // 3. CONFIGURACIÓN DE PRETTIER (Debe ir al final para anular reglas de estilo)
  prettierRecommended
];