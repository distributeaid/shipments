const numberFormatter = new Intl.NumberFormat(navigator.language, {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
})

export const formatWeight = (weight: number) => {
	const inKg = weight < 1000
	return `${numberFormatter.format(
		inKg ? weight : Math.round(weight / 1000),
	)} ${inKg ? 'kg' : 't'}`
}
