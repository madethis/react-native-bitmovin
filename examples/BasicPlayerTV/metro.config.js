/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const resolve = require('metro-resolver/src/resolve');

const libPath = path.resolve('../..');

module.exports = {
  watchFolders: [path.resolve(__dirname, '../..')],
  resolver: {
    resolveRequest(
      {resolveRequest, originModulePath, ...context},
      moduleName,
      platform,
    ) {
      const newOriginModulePath =
        !moduleName.startsWith('.') && !originModulePath.startsWith(__dirname)
          ? path.join(__dirname, 'node_modules')
          : originModulePath;

      const result = moduleName.startsWith('react-native-bitmovin')
        ? resolve(
            context,
            moduleName.replace('react-native-bitmovin', libPath),
            platform,
          )
        : resolve(
            {
              ...context,
              originModulePath: newOriginModulePath,
            },
            moduleName,
            platform,
          );

      return result;
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
