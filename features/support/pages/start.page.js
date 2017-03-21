"use strict";
let Page = require('./page');
class StartPage extends Page {
    get url() { return "/start" }
}
module.exports = new StartPage();