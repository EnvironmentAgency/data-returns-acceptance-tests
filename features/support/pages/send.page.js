"use strict";
let Page = require('./page');
class SendPage extends Page {
    get url() { return "/file/send" }
}
module.exports = new SendPage();