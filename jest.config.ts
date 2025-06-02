import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // karena kamu testing komponen React
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // untuk import alias seperti @/components
    },
    testMatch: [
        '**/__tests__/**/*.(test|spec).(ts|tsx)',
        '**/?(*.)+(test|spec).(ts|tsx)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

export default config;
