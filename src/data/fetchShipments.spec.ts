import { fetchShipments } from './shipments'
import { pipe } from 'fp-ts/lib/pipeable'
import nock from 'nock'
import * as TE from 'fp-ts/lib/TaskEither'
import fetchPonyfill from 'fetch-ponyfill'
import * as fs from 'fs'
import * as path from 'path'

describe('fetchShipments', () => {
	it('should load shipment data from JSON', async () => {
		const scope = nock('https://example.com')
			.get('/shipments.tsv')
			.reply(
				200,
				fs.readFileSync(
					path.join(process.cwd(), 'src', 'data', 'test', 'shipments.tsv'),
					'utf-8',
				),
			)

		await pipe(
			fetchShipments(
				'https://example.com/shipments.tsv',
				fetchPonyfill().fetch,
			),
			TE.map((shipments) => {
				expect(JSON.parse(JSON.stringify(shipments))).toStrictEqual(
					JSON.parse(
						fs.readFileSync(
							path.join(process.cwd(), 'src', 'data', 'test', 'shipments.json'),
							'utf-8',
						),
					),
				)
			}),
			TE.mapLeft((err) => {
				expect(err).toBeUndefined()
			}),
		)()

		expect(scope.isDone()).toBeTruthy()
	})
})
