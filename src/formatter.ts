const numberFormatter = new Intl.NumberFormat(navigator.language, {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
})

export const formatWeight = (weight: number) =>
	`${numberFormatter.format(Math.round(weight / 1000))} t`
