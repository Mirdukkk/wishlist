import type { GiftCard } from '$lib/types'

export const giftCards: GiftCard[] = [
	{
		id: 'gold-apple',
		type: 'gift-card',
		name: 'Золотое Яблоко',
		description: 'Иногда хожу туда, люблю покупать уходовую косметику и парфюмерию.',
		color: [219, 254, 0],
		logo: '/images/logos/gold-apple.svg',
		link: 'https://goldapple.ru/cards',
		maxReservations: 10
	},
	{
		id: 'skuratov-coffee',
		type: 'gift-card',
		name: 'Skuratov Coffee',
		description:
			'Часто появляюсь в этой кофейне, хочу чаще радовать себя хорошим кофе и шоколадными печенюшками.',
		color: [208, 204, 201],
		logo: '/images/logos/skuratov-coffee.svg',
		link: 'https://skuratovcoffee.ru/shop/card',
		maxReservations: 10
	},
	{
		id: 'ozon',
		type: 'gift-card',
		name: 'Ozon',
		description:
			'Чтобы покупать нужные мелочи и китайские безделушки на все случаи. И не думать, что «это не самое нужное»',
		color: [0, 105, 255],
		logo: '/images/logos/ozon.svg',
		link: 'https://www.ozon.ru/landing/giftcertificates/',
		maxReservations: 10
	}
]
