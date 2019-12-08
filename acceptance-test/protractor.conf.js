// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/features/**/*.feature'],
  // capabilities: {
  //   browserName: 'chrome',
  //   chromeOptions: {
  //     args: [ "--headless", "--disable-gpu", "--window-size=1366,768" ]
  //   }
  // },
  multiCapabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [ "--headless" ]
    }
  }, {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--window-size=1366,768", "--ignore-certificate-errors" ]
    }
  }],
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./src/steps/**/*.steps.ts'],
    format: ['json:.tmp/acceptance-test/results.json'],
    profile: false,
    'no-source': true
  },
  plugins: [{
    package: 'protractor-multiple-cucumber-html-reporter-plugin',
    options:{
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      reportPath: 'acceptance-test/report',
      displayDuration: true
    }
  }],
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  },
  afterLaunch: function() {}
};
