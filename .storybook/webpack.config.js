const path = require("path");

module.exports = ({ config }) => {

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loaders: ['awesome-typescript-loader', 'react-docgen-typescript-loader'],
    include: path.resolve(__dirname, '../'),
  },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      });
  config.resolve.extensions.push(".ts", ".tsx",".scss");
  return config;
};