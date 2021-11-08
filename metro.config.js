/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'css'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-css-transformer'),
  },
}
