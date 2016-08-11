module.exports = {

// - - - - SELENIUM  - - - -
  browser: 'chrome',

// - - - - SESSION-MANAGER  - - - -
  noSessionReuse: true,

// - - - - WEBDRIVER-IO  - - - -
// Having specified your base url endpoint here calls to browser.url()
// only need to specify the part which would appear after it. For example
// browser.url('/customer'). If your url parameter starts with "/", the base
// url gets prepended.
  webdriverio: {
	baseUrl: "http://localhost:3000"
  }
};
