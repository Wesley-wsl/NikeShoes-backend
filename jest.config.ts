/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    collectCoverageFrom: ["<rootDir>/src/**/tests/*.test.ts"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
};
