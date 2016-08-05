// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

var webpackConfig = require('./webpack.dev.js');

module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ],
        customLaunchers: {
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [
            // 'build-dev/commons.js',
            'src/vendor.ts',
            'src/**/*.spec.ts'
        ],
        preprocessors: {
            'src/vendor.ts': ['webpack'],
            'src/**/*.spec.ts': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
