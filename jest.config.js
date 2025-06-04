const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': [
            'babel-jest',
            { configFile: './babel.config.test.js' },
        ],
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        'babel.config.test.js', // abaikan file ini
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
    collectCoverageFrom: [
        'app/**/*.{ts,tsx}',
        '!app/**/page.tsx',
        '!app/api/**',
        '!**/node_modules/**',
        '!**/.next/**',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};
