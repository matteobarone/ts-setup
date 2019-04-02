const merge = require('webpack-merge');
const common = require('./webpack.common.js');
require('colors');

console.log(`ENV: development\n`.green);

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
});