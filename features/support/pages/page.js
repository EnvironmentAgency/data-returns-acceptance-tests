'use strict';
const winston = require('winston');
class Page {
    constructor() {
    }

    get url() {
        throw new Error("Page implementation does not override method url()")
    }

    open() {
        winston.debug(`Opening url ${this.url}`);
        browser.url(this.url);
    }

    isOpen() {
        return browser.getUrl().includes(this.url);
    }

    checkOpen() {
        if (!this.isOpen()) {
            winston.debug(`Page.checkOpen waiting for browser URL ${browser.getUrl()} to match ${this.url}`);
            let fn = this.isOpen.bind(this);
            let url = this.url;
            try {
                browser.waitUntil(fn, 20000, `Expected URL '${browser.getUrl()}' to contain '${url}'`, 500);
            } catch (e) {
                winston.error(e);
                throw e;
            }
        }
        winston.debug(`Page.checkOpen - checking for ${this.url} completed successfully`);
    }

    continue() {
    }
}
module.exports = Page;