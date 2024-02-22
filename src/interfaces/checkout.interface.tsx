export interface CheckoutItemInterface {
	id: string;
	name: string;
	category: string;
	thumbnail: string;
	price: number;
	profileId: string;
	status: "ACTIVE" | "INACTIVE" | "SOLD OUT";
}
