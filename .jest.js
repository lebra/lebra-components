const libDir = process.env.LIB_DIR;

const transformIgnorePatterns = [
  '/dist/',
  'node_modules\/[^/]+?\/(?!(es|node_modules)\/)', // Ignore modules without es dir
];

module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'md',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '_site',
    'docs'
  ],
  testRegex: libDir === 'dist' ? 'demo\\.test\\.js$' : '.*\\.test\\.js$',
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    '!components/**/*.native.{js,jsx}',
    '!components/*/style/*.{js,jsx}',
  ],
  transformIgnorePatterns,
  testEnvironment: 'jsdom',
};
