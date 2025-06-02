import type { Config } from 'jest';
import { defaults } from 'ts-jest/presets';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1', // ✅ ini bagian penting
    },
    transform: {
        ...defaults.transform,
    },
};

export default config;
