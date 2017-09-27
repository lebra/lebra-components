const libDir = process.env.LIB_DIR;

const transformIgnorePatterns = [
    '/src/',
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
    testRegex: '.*\\.test\\.js$',
    collectCoverageFrom: [
        'src/components/**/*.{js,jsx}',
        '!src/components/*/style/*.{js,jsx}',
    ],
    transformIgnorePatterns,
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.js$": "babel-jest"
    }
};
