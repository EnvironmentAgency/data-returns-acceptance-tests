'use strict';
const browsers = require('./browsers.json');
const proc = require('child_process');
const lodash = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const tmp = require('tmp');
const maxParallel = 5;

let baseJobName = process.env.JOB_NAME || "Unnamed";
let browserStackUser = process.env.BS_USER || "NO_BROWSER_STACK_USER";
let browserStackKey = process.env.BS_KEY || "NO_BROWSER_STACK_KEY";
let serviceUrl = process.env.SERVICE_URL || "localhost";

let baseConfig = {
    name: baseJobName,
    user: browserStackUser,
    key: browserStackKey,
    host: 'hub-cloud.browserstack.com',
    port: 80,
    noSessionReuse: true,

    webdriverio: {
        baseUrl: serviceUrl,
        logLevel: 'silent',
        // Selenium options
        desiredCapabilities: {
            'browserstack.local': 'true',
            'browserstack.debug': 'true',
        }
    },
    log: 'silent'
};

let currentlyExecuting = 0;
let runBrowser = function (browserConfig) {
    if (currentlyExecuting < maxParallel) {
        let settings = browserConfig.webdriverio.desiredCapabilities;

        browserConfig.name = `${browserConfig.name}-${settings.os}_${settings.os_version}-${settings.browser}_${settings.browser_version ? settings.browser_version : ''}`;

        console.log(`Testing ${browserConfig.name}`);

        let cfgFile = tmp.fileSync({mode: '0644', prefix: 'chimp-', postfix: '.js'}).name;
        fs.outputFileSync(cfgFile, `module.exports = ${JSON.stringify(browserConfig)}`);

        let chimpConfig = path.resolve(__dirname, cfgFile);
        let chimpPath = path.resolve(__dirname, 'node_modules/chimp/dist/bin/chimp.js');

        let childProcess = proc.fork(chimpPath, [chimpConfig], {
            cwd: process.cwd()
        });
        childProcess.on('exit', (code) => {
            if (code !== 0) {
                throw new Error("Child process exited with non-zero return value");
            }
            currentlyExecuting--;
        });
        currentlyExecuting++;
    } else {
        setTimeout(function () {
            runBrowser(browserConfig);
        }, 500);
    }
};


(function () {
    for (let entry of browsers) {
        let browserConfig = lodash.cloneDeep(baseConfig);
        lodash.merge(browserConfig.webdriverio.desiredCapabilities, entry);
        runBrowser(browserConfig);
    }
})();
