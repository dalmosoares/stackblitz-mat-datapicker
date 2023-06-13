const webpack = require('webpack');

module.exports = (config, options, targetOptions) => {
  config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pt-br/));

  return config;
};
