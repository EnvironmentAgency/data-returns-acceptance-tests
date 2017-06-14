'use strict';
const winston = require('winston');
const waitForNav = require('../lib/wait-for-navigation-on-action');
class Page {
    get url () {
        throw new Error('Page implementation does not override method url()');
    }

    open () {
        const self = this;
        winston.debug(`Opening url ${this.url}`);
        waitForNav(function () {
            browser.url(self.url);
        });
    }

    isOpen () {
        return browser.getUrl().includes(this.url);
    }

    checkOpen () {
        if (!this.isOpen()) {
            winston.debug(`Page.checkOpen waiting for browser URL ${browser.getUrl()} to match ${this.url}`);
            const fn = this.isOpen.bind(this);
            const url = this.url;
            try {
                browser.waitUntil(fn, browser.options.waitforTimeout, `Expected URL '${browser.getUrl()}' to contain '${url}'`, 1000);
            } catch (e) {
                winston.error('Error checking if page is open ', e);
                throw e;
            }
        }
        winston.debug(`Page.checkOpen - checking for ${this.url} completed successfully`);
    }

    continue () {
        const self = this;
        self.checkOpen();

        try {
            browser.waitUntil(function () {
                const isDisabled = browser.getAttribute('#continueBtn', 'disabled') === 'true';
                if (isDisabled) {
                    winston.info(`Waiting for continue button on ${self.url} to be enabled before continuing. (isDisabled=${isDisabled})`);
                }
                return !isDisabled;
            }, browser.options.waitforTimeout, `Continue button on ${self.url} not enabled within the allowed time.`, browser.options.waitforInterval);
        } catch (e) {
            winston.error('Error waiting for continue to be enabled', e);
            throw e;
        }

        waitForNav(function () {
            browser.click('#continueBtn');
        });
    }
}
module.exports = Page;
