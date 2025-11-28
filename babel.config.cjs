// babel.config.cjs

module.exports = {
  // Configuración base para todos los entornos
  presets: [
    [
      '@babel/preset-env',
      {
        // Establece la compatibilidad con la versión actual de Node.js
        targets: { node: 'current' },

        // Conversión a CommonJS para Jest
        modules: 'commonjs',
      },
    ],
  ],
  // *** SOLUCIÓN CLAVE para import.meta.url ***
  plugins: [
    // Este plugin permite que Babel reconozca la sintaxis 'import.meta'
    '@babel/plugin-syntax-import-meta',
  ],
};
