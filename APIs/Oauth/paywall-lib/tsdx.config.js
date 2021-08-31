const css = require('rollup-plugin-import-css');
const postcss = require('rollup-plugin-postcss');

const simplevars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false }),
          cssnano(),
        ],
        externsions: ['.css'],
      })
    );
    return config;
  },
};
