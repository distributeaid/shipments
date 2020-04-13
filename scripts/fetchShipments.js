const { fetchShipments } = require('../dist/data/shipments')
const { pipe } = require('fp-ts/lib/pipeable')
const TE = require('fp-ts/lib/TaskEither')
const { isLeft } = require('fp-ts/lib/Either')
const fetchPonyfill = require('fetch-ponyfill')

const { fetch } = fetchPonyfill()

pipe(
	fetchShipments(process.env.SHIPMENTS_URL, fetch),
	TE.map(shipments => {
		console.log(JSON.stringify(shipments, null, 2))
	}),
)().then(res => {
	if (isLeft(res)) {
		console.error(res.left.message)
		process.exit(1)
	}
})
