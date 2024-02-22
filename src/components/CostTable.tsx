import { CartItemInterface } from "interfaces/cart.interface";
import { FC } from "react";
import { useSelector } from "react-redux";

const formatAmount = (amount: number) => {
	return "Rs. " + amount.toFixed(2);
};

interface CostTableProps {
	cart: CartItemInterface[];
	shippingCost?: number;
	tax?: number;
}
const CostTable: FC<CostTableProps> = ({ cart, shippingCost = 0, tax = 0 }) => {
	const cartValue = cart
		? cart
				.map(
					(cartItem: CartItemInterface) =>
						cartItem.quantity * cartItem.price,
				)
				.reduce(
					(total: number, currentNumber: number) =>
						total + currentNumber,
					0,
				)
		: 0;

	return (
		<div className="sticky top-28">
			<h3 className="text-lg font-semibold ">Order Summary</h3>
			<div className="mt-7 text-sm text-slate-500 dark:text-slate-400">
				{cart.map((cartItem: CartItemInterface) => (
					<div
						className="flex justify-between pb-4"
						key={cartItem.id}
					>
						<span>
							{cartItem.name} x {cartItem.quantity}
						</span>
						<span className="font-semibold text-slate-900 dark:text-slate-200">
							{formatAmount(cartItem.price * cartItem.quantity)}
						</span>
					</div>
				))}
			</div>
			<hr />
			<div className=" text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
				<div className="flex justify-between py-4">
					<span>Subtotal</span>
					<span className="font-semibold text-slate-900 dark:text-slate-200">
						{formatAmount(cartValue)}
					</span>
				</div>
				{shippingCost != 0 && (
					<div className="flex justify-between py-4">
						<span>Shipping Estimate</span>
						<span className="font-semibold text-slate-900 dark:text-slate-200">
							{formatAmount(shippingCost)}
						</span>
					</div>
				)}
				{tax != 0 && (
					<div className="flex justify-between py-4">
						<span>Tax Estimate</span>
						<span className="font-semibold text-slate-900 dark:text-slate-200">
							{formatAmount(tax)}
						</span>
					</div>
				)}
				<div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
					<span>Order total</span>
					<span>{formatAmount(cartValue + shippingCost + tax)}</span>
				</div>
			</div>
		</div>
	);
};

export default CostTable;
