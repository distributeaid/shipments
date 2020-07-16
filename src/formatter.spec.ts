import { formatWeight } from './formatter'

describe('formatWeight', () => {
	it.each([
		[250, '250 kg'],
		[999, '999 kg'],
		[1000, '1 t'],
		[1001, '1 t'],
		[20000, '20 t'],
		[20000000, '20,000 t'],
	])('should format %d to %s', (value, expected) => {
		expect(formatWeight(value)).toEqual(expected)
	})
})
