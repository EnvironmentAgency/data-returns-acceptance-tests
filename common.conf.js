'use strict';
const winston = require("winston");
const DataReturnsUserSession = require('./features/support/lib/preload-file');
const fs = require("fs-extra");

// Ensure logs folder exists
const logDir = __dirname + '/logs';
fs.ensureDirSync(logDir);

exports.config = {
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/**/*.feature'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    // By default WebdriverIO commands are executed in a synchronous way using the wdio-sync package.
    sync: true,
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'error',
    // Winston log level (used by step definitions) (defaults to 'info', see winston for options)
    winstonLogLevel: 'error',

    // Enables colors for log output.
    coloredLogs: true,
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './logs/errorShots/',
    screenshotOnReject: true,
    // Default timeout for all waitFor* commands.
    waitforTimeout: 60000,
    // Default interval for all waitFor* commands (number of ms between checks to see if the runner should stop waiting)
    waitforInterval: 250,
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    // Default request retries count
    connectionRetryCount: 3,
    // Framework to run specs with.
    framework: 'cucumber',
    // Test reporter for stdout.
    reporters: ['spec', 'junit'],
    reporterOptions: {
        junit: {
            outputDir: './logs/junit'
        }
    },

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./features/step_definitions'],        // <string[]> (file/dir) require files before executing features
        backtrace: true,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: true,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: false,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: true,      // <boolean> fail if there are any undefined or pending steps
        tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 60000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    // onPrepare: function (config, capabilities) {
    // },
    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    before: function (capabilities, specs) {
        // Setup the Chai assertion framework
        let chai = require('chai');

        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();


        // // timeout that specifies a time to wait for the implicit element location strategy when locating elements using the element or elements commands
        let defaultTimeout = this.waitforTimeout;

        browser.timeouts('implicit', defaultTimeout);
        // time to wait for asynchronous scripts to run
        browser.timeouts('script', defaultTimeout);
        // time to wait for the page loading to complete
        browser.timeouts('page load', defaultTimeout);

        /**
         * Check if an element exists without waiting for it...
         */
        browser.addCommand('isExistingNoWait', function (selector) {
            browser.timeouts('implicit', 0);
            let isExisting = browser.isExisting(selector);
            browser.timeouts('implicit', defaultTimeout);
            return isExisting;
        });
        browser.addCommand('disableImplicitWait', function () {
            browser.timeouts('implicit', 0);
        });
        browser.addCommand('restoreImplicitWait', function () {
            browser.timeouts('implicit', defaultTimeout);
        });


        /**
         * Add browser command to allow files to be preloaded into a data returns session (files uploaded from test runner rather than
         * from client browser)
         */
        browser.addCommand('preloadFiles', function async(files) {
            let preloadSession = new DataReturnsUserSession(browser.options.baseUrl + '/file/preload');
            let filenames = Array.isArray(files) ? files : [files];
            filenames = filenames.map(filename => `features/support/files/${filename}`);
            return preloadSession.upload(filenames);
        });

        /**
         * Configure winston logging
         */
        winston.clear();
        winston.add(winston.transports.Console, {
            "level": this.winstonLogLevel || "info",
            "colorize": true,
            "silent": false,
            "timestamp": true,
            "json": false,
            "showLevel": true,
            "handleExceptions": false,
            "humanReadableUnhandledException": false
        });
    },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function (suite) {
    // },
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeEach in Mocha)
    // beforeHook: function () {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function () {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // beforeTest: function (test) {
    // },
    //
    // Runs before a WebdriverIO command gets executed.
    // beforeCommand: function (commandName, args) {
    // },
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function (commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // afterTest: function (test) {
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function (suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    // after: function (result, capabilities, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    // onComplete: function(exitCode) {
    // }

    // Cucumber specific hooks
    // beforeFeature: function (feature) {
    // },
    // beforeScenario: function (scenario) {
    // },
    // beforeStep: function (step) {
    // },
    // afterStep: function (stepResult) {
    // },
    // afterScenario: function (scenario) {
    // },
    // afterFeature: function (feature) {
    // }
};