'use strict';
const os = require('os');
const lodash = require('lodash');
let commonConfig = require("./common.conf").config;

let browserstackUser = process.env.BROWSERSTACK_USERNAME;
let browserstackKey = process.env.BROWSERSTACK_ACCESS_KEY;

if (!(browserstackUser || browserstackKey)) {
    throw new Error("Please ensure that the BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables are defined.")
}

const setupCapabilities = function (capabilitiesArray) {
    let buildTimestamp = new Date().toISOString();
    buildTimestamp = buildTimestamp.substring(0, buildTimestamp.length - 8);

    return capabilitiesArray.map(cap => lodash.merge({}, cap, {
        "build": `${process.env.USER}@${os.hostname()} ${buildTimestamp}`.replace(/[^A-Za-z0-9 :._@]/g, '_'),
        "maxInstances": 1,
        "project": "Data Returns",
        "browserstack.local": true,
        "browserstack.debug": false,
        "browserstack.video": true,
        "browserstack.timezone": "London",
        "browserstack.javascriptEnabled": true
    }));
};

let browserStackProxyOpts = {};
if (process.env.BROWSER_PROXY_HOST) {
    browserStackProxyOpts = {
        "-force-proxy": true,
        "-proxy-host": process.env.BROWSER_PROXY_HOST,
        "-proxy-port": process.env.BROWSER_PROXY_PORT || 3128
    };
}


let browserStackConfig = {
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

    // At the current time there is a mismatch between the browserstack-local npm package and the BrowserStackLocal binary with respect
    // to supplying command line arguments. The binary moved from arguments preceded with a single dash to the standard double-dash method,
    // however currently the npm package has not been updated to reflect this.
    //
    // This caused problems attempting to set the appropriate proxy information (see browserStackProxyOpts above) so as a workaround
    // I am currently supplying all browserStackOpts according to the command line rules (https://www.browserstack.com/local-testing#modifiers)
    // but with a single dash only.  This is because the browserstack-local npm package automatically prepends a second dash to any argument
    // it doesn't recognise.
    //
    // It is likely that browserstack-local will likely be updated to fix this issue very soon (I can already see the new code in the github
    // repo) and at this point the options here will need to be reworked to comply to the browserstack-local guidance.
    browserstackOpts: lodash.merge({}, browserStackProxyOpts, {
        "-force": true,
        "-force-local": true,
    }),

    // ============
    // Capabilities
    // ============
    maxInstances: 5,
    capabilities: setupCapabilities([
        {
            "browserName": "chrome",
            "os": "Windows",
            "os_version": "10",
        },
        {
            "browserName": "firefox",
            "os": "Windows",
            "os_version": "10",
        },
        {
            "os": "Windows",
            "os_version": "XP",
            "browserName": "ie",
            "browser_version": "7.0"
        },
        {
            "os": "Windows",
            "os_version": "7",
            "browserName": "ie",
            "browser_version": "8.0"
        },
        {
            "os": "Windows",
            "os_version": "7",
            "browserName": "ie",
            "browser_version": "9.0"
        },
        {
            "os": "Windows",
            "os_version": "7",
            "browserName": "ie",
            "browser_version": "10.0"
        },
        {
            "os": "Windows",
            "os_version": "7",
            "browserName": "ie",
            "browser_version": "11.0"
        },
        // The microsoft edge driver is currently very buggy (clicking a button returning element obscured error)
        // disabled until the automation driver is more mature.
        // {
        //     "os": "Windows",
        //     "os_version": "10",
        //     "browserName": "edge",
        //     // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
        //     "preloadFiles": true
        // },
        {
            "os": "OS X",
            "os_version": "Sierra",
            "browserName": "safari",
            "browser_version": "10.0",
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            "preloadFiles": true
        },
        {
            "os": "android",
            "os_version": "4.4",
            "browser": "android",
            "device": "Samsung Galaxy S5",
            "browser_version": null,
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            "preloadFiles": true
        },
        {
            "os": "ios",
            "os_version": "6.0",
            "browser": "iphone",
            "device": "iPhone 5",
            "browser_version": null,
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            "preloadFiles": true
        },
        {
            "os": "ios",
            "os_version": "8.3",
            "browser": "ipad",
            "device": "iPad Air",
            "browser_version": null,
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            "preloadFiles": true
        },
        {
            "os": "ios",
            "os_version": "9.1",
            "browserName": "iphone",
            "browser_version": null,
            "device": "iPhone 6S Plus",
            // The automation driver for this browser does support file uploads - use data returns preloading to load data and establish sessions.
            "preloadFiles": true
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

    // Configure cucumberjs to ignore any features marked with browserstackIgnore.
    cucumberOpts: {
        tags: ['~@browserstackIgnore']
    }
};
exports.config = lodash.defaultsDeep(browserStackConfig, commonConfig);