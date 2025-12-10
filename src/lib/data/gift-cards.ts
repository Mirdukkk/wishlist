import type { GiftCard } from '$lib/types'

export const giftCards: GiftCard[] = [
	{
		id: 'gold-apple',
		type: 'gift-card',
		name: 'Золотое Яблоко',
		longDescription:
			'Подарочные карты «Золотое Яблоко» — это универсальный и стильный подарок для ваших близких и друзей.',
		color: [219, 254, 0],
		logo: '/images/logos/gold-apple.svg',
		link: 'https://goldapple.ru/cards',
		maxReservations: 2
	},
	{
		id: 'skuratov-coffee',
		type: 'gift-card',
		name: 'Skuratov Coffee',
		longDescription:
			'Подарочные карты Skuratov Coffee — отличный способ порадовать себя и своих близких качественным кофе и аксессуарами.',
		color: [208, 204, 201],
		logo: '/images/logos/skuratov-coffee.svg',
		link: 'https://skuratovcoffee.ru/shop/card',
		maxReservations: 2
	},
	{
		id: 'ozon',
		type: 'gift-card',
		name: 'Ozon',
		longDescription:
			'Подарочные сертификаты Ozon — это универсальный подарок, который позволяет выбрать из миллионов товаров на крупнейшей онлайн-платформе России.',
		color: [0, 105, 255],
		logo: '/images/logos/ozon.svg',
		link: 'https://www.ozon.ru/landing/giftcertificates/',
		maxReservations: 2
	}
]
