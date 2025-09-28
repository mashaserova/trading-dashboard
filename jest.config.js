const nextJext = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-enviroment-jsdom',
}

module.exports = createJestConfig(customJestConfig)