'use strict';
const os = require('os');
const lodash = require('lodash');
const commonConfig = require('./common.conf').config;

const browserstackUser = process.env.BROWSERSTACK_USERNAME;
const browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY;

if (!(browserstackUser || browserstackKey)) {
    throw new Error('Please ensure that the BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables are defined.');
}

const setupCapabilities = function (capabilitiesArray) {
    let buildTimestamp = new Date().toISOString();
    buildTimestamp = buildTimestamp.substring(0, buildTimestamp.length - 8);
    return capabilitiesArray.map(cap => lodash.defaultsDeep(cap, {
        'build': `${process.env.USER}@${os.hostname()} ${buildTimestamp}`.replace(/[^A-Za-z0-9 :._@]/g, '_'),
        'maxInstances': 1,
        'project': 'Data Returns',
        'browserstack.local': true,
        'browserstack.debug': true,
        'browserstack.video': true,
        'browserstack.timezone': 'London',
        'browserstack.javascriptEnabled': true,
        'pageLoadStrategy': 'normal',
        'acceptSslCerts': true
    }));
};

let browserStackProxyOpts = {};
if (process.env.BROWSER_PROXY_HOST) {
    browserStackProxyOpts = {
        forceProxy: true,
        proxyHost: process.env.BROWSER_PROXY_HOST,
        proxyPort: process.env.BROWSER_PROXY_PORT || 3128
    };
}

const browserStackConfig = {
    // ==================
    // Browserstack selenium host/port
    // ==================
    host: 'hub-cloud.browserstack.com',
    port: 80,
    path: '/wd/hub',

    //
    // =================
    // Browserstack options
    // =================
    user: browserstackUser,
    key: browserstackKey,
    browserstackLocal: true,

    browserstackOpts: lodash.defaultsDeep(browserStackProxyOpts, {
        logFile: './logs/local.log',
        force: true,
        forceLocal: true
    }),
    // Default timeout for all waitFor* commands.
    waitforTimeout: 90000,

    // Disable screenshots when used with browserstack.  Their usually of little use on the test runner side.
    // Browserstack video and screenshots are more useful.
    screenshotPath: null,
    screenshotOnReject: false,

    /**
     * Project-specific configuration options
     *
     * Add any project-specific configuration options here (keep things separate from the standard wdio config)
     *
     */
    _projectConfiguration: {
        // Winston log level (used by step definitions) (defaults to 'info', see winston for options)
        winstonLogLevel: 'info',
        // timeout that specifies a time to wait for the implicit element location strategy when locating elements using the element or elements commands
        implicitTimeout: 0,
        // time to wait for the page loading to complete (allow much longer when running on browserstack)
        pageTimeout: 90000,
        // time to wait for asynchronous scripts to run
        scriptTimeout: 30000
    },

    // ============
    // Capabilities
    // ============
    maxInstances: 3,
    capabilities: setupCapabilities([
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'ie',
            'browser_version': '8.0'
        },
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'ie',
            'browser_version': '9.0'
        },
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'ie',
            'browser_version': '10.0'
        },
        {
            'os': 'Windows',
            'os_version': '7',
            'browserName': 'ie',
            'browser_version': '11.0'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browserName': 'edge',
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            'preloadFiles': true
        },
        {
            'os': 'OS X',
            'os_version': 'Sierra',
            'browserName': 'safari',
            'browser_version': '10.0',
            'browserstack.safari.allowAllCookies': true,
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            'preloadFiles': true
        },
        {
            'os': 'android',
            'os_version': '4.4',
            'browser': 'android',
            'device': 'Samsung Galaxy S5',
            'browser_version': null,
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            'preloadFiles': true
        },
        {
            'os': 'ios',
            'os_version': '9.1',
            'browserName': 'iphone',
            'browser_version': null,
            'device': 'iPhone 6S Plus',
            'browserstack.safari.allowAllCookies': true,
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            'preloadFiles': true
        }
    ]),

    // ===================
    // Test Configurations
    // ===================

    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: process.env.SERVICE_URL || 'http://localhost:3000',

    // Test runner services
    services: ['browserstack'],

    cucumberOpts: {
        // Configure cucumberjs to ignore any features marked with browserstackIgnore.
        tags: ['~@browserstackIgnore'],
        // Increase step timeout on browserstack (things just seem to take longer!)
        timeout: 240000
    }

};
exports.config = lodash.defaultsDeep(browserStackConfig, commonConfig);
