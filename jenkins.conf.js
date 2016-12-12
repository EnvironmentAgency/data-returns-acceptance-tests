'use strict';
const lodash = require("lodash");
let commonConfig = require("./common.conf").config;

/**
 * Helper to set common options on capabilities
 *
 * @param capabilitiesArray
 * @returns {Array|*}
 */
const setupCapabilities = function (capabilitiesArray) {
    let common = {
        maxInstances: 1
    };

    // if (process.env.BROWSER_PROXY) {
    //     common.proxyType = 'manual';
    //     common.httpProxy = process.env.BROWSER_PROXY;
    //     common.sslProxy = process.env.BROWSER_PROXY;
    // }

    return capabilitiesArray.map(cap => lodash.merge({}, cap, common));
};

let localConfig = {
    // ============
    // Capabilities
    // ============
    // Maximum instances to run in parallel.  Can be overridden on a per-browser basis by adding maxInstances option under each capability.
    maxInstances: 3,
    capabilities: setupCapabilities([
        // {
        //     browserName: 'chrome'
        // },
        {
            browserName: 'firefox'
        }
    ]),

    // Temporary - diagnosing problems on Jenkins
    logLevel: 'verbose',


    // ===================
    // Test Configurations
    // ===================
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: process.env.SERVICE_URL || 'http://localhost:3000',

    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone', 'firefox-profile'],

    seleniumLogs: './logs/selenium',

    firefoxProfile: {
        'network.proxy.type': 1,
        'network.proxy.http': process.env.BROWSER_PROXY_HOST,
        'network.proxy.http_port': parseInt(process.env.BROWSER_PROXY_PORT) || 3128,
        'network.proxy.ssl': process.env.BROWSER_PROXY_HOST,
        'network.proxy.ssl_port': parseInt(process.env.BROWSER_PROXY_PORT) || 3128,
    },

    // Disabled screenshots as these are failing when using the firefox driver
    screenshotOnReject: false,

    // Running Jenkins with older version of selenium as the 3.0.1 release does not integrate with firefox correcly
    // Geckodriver firefox v48+ uses seems unreliable and needs more time to mature.
    seleniumArgs: {
        version: '2.53.1'
    },
    seleniumInstallArgs: {
        version: '2.53.1'
    }
};
exports.config = lodash.defaultsDeep(localConfig, commonConfig);