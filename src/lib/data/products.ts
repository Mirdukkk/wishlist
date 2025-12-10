import type { Product } from '$lib/types'

export const products: Product[] = [
	{
		id: 'kinder-bueno',
		type: 'product',
		name: 'Киндер Буено',
		image: 'https://placehold.co/192',
		shortDescription: 'Вкусни шоколадка',
		longDescription:
			'Сумка-кофр выполнена из плащевой ткани с мембраной. Сумку можно носить как на лицевую, так и наизнанку.',
		price: 1000,
		link: 'https://example.com/kinder-bueno'
	},
	{
		id: 'snickers',
		type: 'product',
		name: 'Сникерс',
		image: 'https://placehold.co/192',
		shortDescription: 'Шоколад с карамел',
		price: 1200,
		link: 'https://example.com/kinder-bueno'
	},
	{
		id: 'mars',
		type: 'product',
		name: 'Марс',
		image: 'https://placehold.co/192',
		shortDescription: 'Класически шоколад',
		price: 900,
		link: 'https://example.com/kinder-bueno'
	}
]
