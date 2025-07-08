const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable support for additional asset types
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db',
  // Adds support for additional font formats
  'ttf',
  'otf'
);

module.exports = config;