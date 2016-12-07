'use strict';
const winston = require('winston');
class Page {
    constructor() {
    }

    get url() {
        throw new Error("Page implementation does not override method url()")
    }

    open() {
        browser.url(this.url);
    }


    isOpen() {
        winston.debug(`Page.isOpen() checking browser URL ${browser.getUrl()} matches ${this.url}`);
        return browser.getUrl().includes(this.url);
    }


    checkOpen() {
        let fn = this.isOpen.bind(this);
        let url = this.url;
        try {
            browser.waitUntil(fn,
                20000,
                `Expected URL '${browser.getUrl()}' to contain '${url}'`,
                500);
        } catch(e) {
            winston.error(e);
            throw e;
        }
        winston.debug(`Checking for ${url} completed successfully`);
    }

    continue() {
    }
}
module.exports = Page;