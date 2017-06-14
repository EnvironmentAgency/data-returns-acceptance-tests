'use strict';
const Page = require('./page');
class SentPage extends Page {
    get url () { return '/file/sent'; }

    isReturnSent () {
        const heading = browser.getText('span#title');
        heading.should.equal('Data sent');
    }
}
module.exports = new SentPage();
