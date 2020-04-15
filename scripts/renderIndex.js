const { html, getVersion } = require('./html')
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')

console.log(
	html({
		VERSION: getVersion(),
		IS_PRODUCTION: JSON.stringify(true),
		SITE_DIR: process.env.SITE_DIR,
		SHIPMENTS_URL: new Handlebars.SafeString(process.env.SHIPMENTS_URL),
		FALLBACK_SHIPMENTS: new Handlebars.SafeString(
			fs.readFileSync(path.join(process.cwd(), 'dist', 'shipments.json')),
		),
	}),
)
