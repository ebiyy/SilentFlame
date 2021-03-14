const obfuscatingTransformer = require('react-native-obfuscating-transformer');
const typescriptTransformer = require('react-native-typescript-transformer');

// setting:
// https://qiita.com/u83unlimited/items/970f819d1fafa325bfbf#%E4%BD%8E%E9%9B%A3%E8%AA%AD%E5%8C%96%E9%AB%98%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9
// https://github.com/javascript-obfuscator/react-native-obfuscating-transformer#configuration
module.exports = obfuscatingTransformer({
  upstreamTransformer: typescriptTransformer,
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  renameGlobals: false,
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: false,
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
});
