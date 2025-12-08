export interface ProductSummary {
	name: string
	image: string
	shortDescription?: string
	price?: number
}

export interface Product extends ProductSummary {
	id: string
	longDescription?: string
	price?: number
	link?: string
	reserved?: boolean
}
