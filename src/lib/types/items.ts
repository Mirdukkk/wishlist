import type { RGBColorValue } from '$lib/types/colors'

export interface ProductSummary {
	name: string
	image: string
	price?: number
}

export interface BaseItem {
	id: string
	name: string
	description?: string
	link?: string
	maxReservations?: number
}

export interface Product extends BaseItem, ProductSummary {
	type: 'product'
}

export interface GiftCard extends BaseItem {
	type: 'gift-card'
	color: RGBColorValue
	logo: string
}
