import { fetchShipments } from './shipments'
import { pipe } from 'fp-ts/lib/pipeable'
import nock from 'nock'
import * as TE from 'fp-ts/lib/TaskEither'
import fetchPonyfill from 'fetch-ponyfill'
import * as fs from 'fs'
import * as path from 'path'

const shipmentsTSV = fs.readFileSync(
	path.join(process.cwd(), 'src', 'data', 'test', 'shipments.tsv'),
	'utf-8',
)
const shipmentsJSON = JSON.parse(
	fs.readFileSync(
		path.join(process.cwd(), 'src', 'data', 'test', 'shipments.json'),
		'utf-8',
	),
)

describe('fetchShipments', () => {
	it('should load shipment data from JSON', async () => {
		const scope = nock('https://example.com')
			.get('/shipments.tsv')
			.reply(200, shipmentsTSV)

		await pipe(
			fetchShipments(
				'https://example.com/shipments.tsv',
				fetchPonyfill().fetch,
			),
			TE.map((shipments) => {
				expect(JSON.parse(JSON.stringify(shipments))).toStrictEqual(
					shipmentsJSON,
				)
			}),
			TE.mapLeft((err) => {
				expect(err).toBeUndefined()
			}),
		)()

		expect(scope.isDone()).toBeTruthy()
	})
	it('should ignore invalid entries', async () => {
		const scope = nock('https://example.com')
			.get('/shipments-with-invalid.tsv')
			.reply(
				200,
				[
					shipmentsTSV,
					['Missing Data'].join('\t'),
					[
						'This',
						'has',
						'all',
						'fields',
						'filled',
						'but',
						'with',
						'bogus',
						'data',
					].join('\t'),
				].join('\n'),
			)
		await pipe(
			fetchShipments(
				'https://example.com/shipments-with-invalid.tsv',
				fetchPonyfill().fetch,
			),
			TE.map((shipments) => {
				expect(JSON.parse(JSON.stringify(shipments))).toStrictEqual(
					shipmentsJSON,
				)
			}),
			TE.mapLeft((err) => {
				expect(err).toBeUndefined()
			}),
		)()

		expect(scope.isDone()).toBeTruthy()
	})
})
