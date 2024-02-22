// types
import { createSlice } from "@reduxjs/toolkit";
import { CartItemInterface } from "interfaces/cart.interface";

// initial state
const initialState: CartItemInterface[] = [];

// ==============================|| SLICE - MENU ||============================== //

const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		initCart: (state) => {
			const localStorageCart = localStorage.getItem("cart");
			console.log(localStorageCart);
			if (localStorageCart) {
				return JSON.parse(localStorageCart);
			}
			return [];
		},
		addCartItem: (state, action) => {
			const id = action.payload.id;
			const quantityToBeAdded = action.payload.quantity
				? action.payload.quantity
				: 1;
			let updatedCart = [];
			const existingItem = [...state].find(
				(cartItem) => cartItem.id === id,
			);
			if (existingItem) {
				updatedCart = [...state].map((cartItem) =>
					cartItem.id === id
						? {
								...cartItem,
								quantity: cartItem.quantity + quantityToBeAdded,
						  }
						: cartItem,
				);
			} else {
				updatedCart = [
					...state,
					{ ...action.payload, quantity: quantityToBeAdded },
				];
			}
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		},
		removeCartItem: (state, action) => {
			const id = action.payload;
			const updatedCart = [...state]
				.map((cartItem) =>
					cartItem.id === id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem,
				)
				.filter((cartItem) => cartItem.quantity > 0);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		},
		removeAllCartItems: (state, action) => {
			const id = action.payload;
			const updatedCart = [...state].filter(
				(cartItem) => cartItem.id != id,
			);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		},
		emptyCart: () => {
			const emptyCart = [];
			localStorage.setItem("cart", JSON.stringify(emptyCart));
			return [];
		},
	},
});

export default cart.reducer;

export const {
	initCart,
	addCartItem,
	removeCartItem,
	removeAllCartItems,
	emptyCart,
} = cart.actions;
