/* eslint-disable import/no-extraneous-dependencies */

const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');

const lernaExist = fs.existsSync(path.join(process.cwd(), '../../lerna.json'));

const componentFolder = path.basename(process.cwd());
const imagesPath = `${process.cwd()}/demo/images/*`;
const snapshotsPath = `${process.cwd()}/__snapshots__`;
const snapshotResolver = (basePath, suiteName) => {
  return lernaExist ? 
    path.join(basePath, 'packages', componentFolder, '__snapshots__', `${suiteName}.md`) :
    path.join(basePath, '__snapshots__', `${suiteName}.md`);
};

module.exports = config => {
  const files = [
    require.resolve('axe-core/axe.min.js'),
    {
      pattern: `node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js`,
      type: 'js',
      included: true,
    },
    {
      pattern: `node_modules/@webcomponents/shadycss/scoping-shim.min.js`,
      type: 'js',
      included: true,
    },
    {
      pattern: `node_modules/@webcomponents/shadycss/custom-style-interface.min.js`,
      type: 'js',
      included: true,
    },
  ];

  if (fs.existsSync(snapshotsPath)) {
    files.push({
      pattern: `${snapshotsPath}/**/*.md`,
      type: 'js',
    });
  }

  if (config.forcePolyfills) {
    files.unshift(`${process.cwd()}/force-polyfills.js`);
  }

  if (fs.existsSync(imagesPath)) {
    files.push({
      pattern: imagesPath,
      watched: false,
      included: false,
      served: true,
      nocache: false,
    });
  }

  files.push({ pattern: `${process.cwd()}/test/**/*.test.js`, type: 'module' });

  config.set(
    merge(
      { ...createDefaultConfig(config), files },
    {
     basePath:  lernaExist ? '../../' : './',
     plugins: [
       // resolve plugins relative to this config so that they don't always need to exist
       // at the top level
       require.resolve('karma-junit-reporter'),
     ],
     reporters: ['junit'],
       junitReporter: {
         outputDir: `${__dirname}/build/junit`,
         outputFile: 'xunit-report.xml',
         xmlVersion: 0
        },
      esm: {
        nodeResolve: true,
      },

      coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary', 'json'],
        dir: 'build/coverage-reports',
        'report-config': {
          // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
          html: { subdir: 'lcov-report' },
          json: { file: 'coverage-final.json' },
          text: {}
        },
      },
       proxies: {
          '/images/': `/base/${path.relative('../../..', '.')}/demo/images/`,
        },
        snapshot: {
          pathResolver: snapshotResolver,
        },
      client: {
        mocha: {
          ui: 'tdd',
        },
      },
    }),
  );
  return config;
};