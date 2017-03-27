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
    };
    return capabilitiesArray.map(cap => lodash.defaultsDeep(cap, common));
};

let localConfig = {
    // ============
    // Capabilities
    // ============
    // Maximum instances to run in parallel.  Can be overridden on a per-browser basis by adding maxInstances option under each capability.
    maxInstances: 2,
    maxInstancesPerCapability: 1,
    capabilities: setupCapabilities([
        {
            browserName: 'chrome'
        },
        {
            browserName: 'firefox'
        }
    ]),

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
        'network.proxy.http_port': process.env.BROWSER_PROXY_PORT ? parseInt(process.env.BROWSER_PROXY_PORT) : 3128,
        'network.proxy.ssl': process.env.BROWSER_PROXY_HOST,
        'network.proxy.ssl_port': process.env.BROWSER_PROXY_PORT ? parseInt(process.env.BROWSER_PROXY_PORT) : 3128,

        // Workaround for issue with firefox when multiple aliases for localhost are defined in the hosts file
        // Without this, the Firefox driver will respond with BAD REQUEST to all calls.
        'webdriver_firefox_allowed_hosts': 'localhost,ip6-localhost,ip6-loopback'
    },

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