"use strict";
class Page {
    constructor() {
    }

    get url() {
        throw new Error("Page implementation does not override method url()")
    }

    open() {
        browser.url(this.url);
    }

    checkOpen() {
        let checkFn = function () {
            return browser.getUrl().includes(this.url);
        }.bind(this);

        browser.waitUntil(checkFn,
            browser.options.waitforTimeout,
            `Expected URL '${browser.getUrl()}' to contain '${this.url}'`,
            browser.options.waitforInterval);
    }

    continue() {

    }
}
module.exports = Page;