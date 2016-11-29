"use strict";
let Page = require('./page');


class SentPage extends Page {
    get url() { return "/file/sent" }
}
module.exports = new SentPage();