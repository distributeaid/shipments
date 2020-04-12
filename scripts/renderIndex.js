const { html, getVersion } = require('./html')

console.log(
	html({
		VERSION: getVersion(),
		IS_PRODUCTION: JSON.stringify(false),
		SITE_DIR: process.env.SITE_DIR,
	}),
)
