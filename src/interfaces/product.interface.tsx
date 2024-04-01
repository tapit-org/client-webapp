export interface ProductListItemInterface {
	id: string;
	name: string;
	price: number;
	thumbnail: string;
	category: string;
	tag: string;
	totalRating: number;
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
	totalRating: number;
	reviewCount: number;
	description: string;
	features: ProductFeatureInterface[];
	status: "ACTIVE" | "INACTIVE" | "SOLD OUT";
}

export interface ProductReviewInterface {
	id: string;
	uid: string;
	text: string;
	rating: number;
	name: string;
	createdAt: Date;
}
