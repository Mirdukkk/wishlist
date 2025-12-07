export const formatPrice = (price: number) => {
	return new Intl.NumberFormat(['ru-RU'], {
		currency: 'RUB',
		currencyDisplay: 'symbol',
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
		currencySign: 'standard',
		style: 'currency'
	}).format(price)
}
