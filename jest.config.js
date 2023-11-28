module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
 
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-async-storage|other-modules))',
  ],
};
