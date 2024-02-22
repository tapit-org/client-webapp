export interface CartItemInterface {
	id: string;
	name: string;
    category: string;
	thumbnail: string;
    quantity: number;
    price: number;
    status: 'ACTIVE' | 'INACTIVE' | 'SOLD OUT';
}