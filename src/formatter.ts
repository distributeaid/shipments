const numberFormatter = new Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})
const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

export const formatWeight = (weight: number) => {
    return (numberFormatter.format(Math.round(weight / 1000)) + ' t')
}
export const formatCurrency = (currency: number) => currencyFormatter.format(currency)