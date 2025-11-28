module.exports = {
  // Entorno de pruebas para Node.js
  testEnvironment: 'node',

  // Transformar archivos JS usando babel-jest
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
  },

  // Ignorar transformaciones en node_modules excepto en librerías que lo necesiten
  transformIgnorePatterns: ['/node_modules/(?!(supertest)/)'],

  // Rutas de los tests
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).js'],

  // Configuración de cobertura
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // Excluir entry points que no sean lógica pura si es necesario
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
