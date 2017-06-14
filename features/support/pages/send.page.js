'use strict';
const Page = require('./page');
class SendPage extends Page {
    get url () { return '/file/send'; }
}
module.exports = new SendPage();
