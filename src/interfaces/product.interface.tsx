export interface ProductListItemInterface {
	id: string;
	name: string;
	price: number;
	thumbnail: string;
	category: string;
	tag: string;
	rating: number;
	reviewCount: number;
	status?: "ACTIVE" | "INACTIVE" | "SOLD OUT";
}

export interface ProductFeatureInterface {
	title: string;
	text: string;
}

export interface ProductInterface {
	id: string;
	name: string;
	price: number;
	thumbnail: string;
	images: string[];
	category: string;
	tag: string;
	rating: number;
	reviewCount: number;
	description: string;
	features: ProductFeatureInterface[];
	status: "ACTIVE" | "INACTIVE" | "SOLD OUT";
}

export interface ProductReviewInterface {
	id?: string;
	createdAt: number;
	review: string;
	rating: number;
	productId?: string;
	userId?: string;
	userName: string;
}
