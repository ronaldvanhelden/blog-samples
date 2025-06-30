module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@microsoft/sp-core-library$': '<rootDir>/src/tests/mocks/spCoreLibrary.ts',
    '^@microsoft/sp-webpart-base$': '<rootDir>/src/tests/mocks/spWebpartBase.ts'
  }
};
