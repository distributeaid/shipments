/**
 * A nice list of colors to use for map markers
 */
const colors = [
	'#03a8a0',
	'#039c4b',
	'#66d313',
	'#fedf17',
	'#ff0984',
	'#21409a',
	'#04adff',
	'#e48873',
	'#f16623',
	'#f44546',
	'#1f73b7',
	'#04444d',
	'#038153',
	'#ed961c',
	'#cc3340',
	'#a81897',
	'#d42054',
	'#c72a1c',
	'#c44f00',
	'#ffbb10',
	'#058541',
	'#028079',
	'#1371d6',
	'#3353e2',
	'#6a27b8',
	'#337fbd',
	'#335d63',
	'#228f67',
	'#f5a133',
	'#d93f4c',
	'#d653c2',
	'#ec4d63',
	'#e34f32',
	'#de701d',
	'#ffd424',
	'#00a656',
	'#02a191',
	'#3091ec',
	'#5d7df5',
	'#b552e2',
]

export const colorGenerator = function*() {
	let i = 0
	while (true) {
		yield colors[i]
		i = (i + 1) % colors.length
	}
}
