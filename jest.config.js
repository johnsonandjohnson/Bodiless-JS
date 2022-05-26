module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/config/jest-preprocess.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    // Uncomment lines below in case multiple react versions appear in the project to
    // resolve react and react-dom to the same folder across multiple packages
    // "^react(.*)$": "<rootDir>/node_modules/react$1",
    // "^react-dom(.*)$": "<rootDir>/node_modules/react-dom$1",
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/__mocks__/fileMock.js',
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['node_modules', '.cache', 'cypress', 'playwright',
    // @todo: remove skipped tests below after jest-resolve issue resolved.
    // https://github.com/johnsonandjohnson/Bodiless-JS/issues/1533
    'create-preview-pages.test.ts',
    'create-pages.test.ts',
    'gatsby-node.test.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  testResultsProcessor: 'jest-sonar-reporter',
  globals: {
    __PATH_PREFIX__: '',
    'ts-jest': {
      tsconfig: './config/tsconfig.test.json',
    },
  },
  testURL: 'http://localhost',
  setupFilesAfterEnv: ['<rootDir>/config/jestTestSetup'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['packages/**/src/**/*.ts(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
