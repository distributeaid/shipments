import * as TE from 'fp-ts/lib/TaskEither'
import localForage from 'localforage'
import { ErrorInfo, ErrorType } from './shipments'
import { pipe } from 'fp-ts/lib/pipeable'
import { debugLog } from '../debugLog'

type CacheEntry<A> = {
	ttl: number
	item: A
}

const getCache = <A>(key: string) =>
	TE.tryCatch(
		async () =>
			localForage.getItem<CacheEntry<A>>(key).then(entry => {
				if (entry === null) {
					debugLog('Cache', `Cache entry is null for ${key}`)
					throw new Error('Cache entry is null.')
				}
				debugLog(
					'Cache',
					`Hit for ${key}`,
					entry.item,
					`TTL: ${Math.round((entry.ttl - Date.now()) / 1000 / 60)} min`,
				)
				return entry
			}),
		() =>
			({
				type: ErrorType.EntityNotFound,
				message: `Cache entry for ${key} not found`,
			} as ErrorInfo),
	)

const cacheEntry = <A>(key: string, lifeTimeInMinutes = 60) => (item: A) =>
	TE.tryCatch<ErrorInfo, A>(
		async () =>
			localForage
				.setItem(key, {
					ttl: Date.now() + lifeTimeInMinutes * 60 * 1000,
					item,
				})
				.then(() => {
					debugLog('Cache', `Stored item for ${key}`, item)
					return item
				}),
		() =>
			({
				type: ErrorType.InternalError,
				message: `Failed to write cache entry for ${key}`,
			} as ErrorInfo),
	)

export const cache = <A>(
	url: string,
	fn: TE.TaskEither<ErrorInfo, A>,
): TE.TaskEither<ErrorInfo, A> =>
	pipe(
		getCache<A>(url),
		TE.chain(({ ttl, item }) => {
			if (ttl > Date.now()) return TE.right(item)
			return TE.left({
				type: ErrorType.EntityNotFound,
				message: 'Cache expired',
			})
		}),
		TE.orElse(() => pipe(fn, TE.chain(cacheEntry(url)))),
	)
