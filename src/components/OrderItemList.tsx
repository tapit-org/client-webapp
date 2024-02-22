import { CircularProgress, Grid, Stack } from "@mui/material";
// import { AddressInterface } from "interfaces/order.interface";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { FC, useEffect, useState } from "react";
import Prices from "./Prices";
import { ProductInterface } from "interfaces/product.interface";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const renderOrder = (order: any, showName: boolean = false) => {
	let addressString = "";
	if (order) {
		addressString = `${order.line1}, ${order.line2}, ${order.city}, ${order.state}, ${order.country}. ${order.zip}.`;
		if (order.landmark) {
			addressString += ` Near ${order.landmark}`;
		}
		if (showName) {
			addressString = `${order.name} - ${addressString}`;
		}
	}
	return addressString;
};

interface OrderItemListProps {
	orderItems: any;
}

const OrderItemList: FC<OrderItemListProps> = ({ orderItems }) => {
	const [showLoader, setShowLoader] = useState(false);
	if (showLoader)
		return (
			<Stack alignItems={"center"}>
				<CircularProgress />
			</Stack>
		);
	if (orderItems.length == 0) return <Grid>No Products</Grid>;
	const getProductObject = () => {};
	return (
		<>
			{orderItems.map((orderItem: any, index: number) => (
				<div
					key={index}
					className="flex py-4 sm:py-7 last:pb-0 first:pt-0"
				>
					<div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
						<img
							src={orderItem.thumbnail}
							alt={orderItem.name}
							className="h-full w-full object-cover object-center"
						/>
					</div>

					<div className="ml-4 flex flex-1 flex-col">
						<div>
							<div className="flex justify-between ">
								<div>
									<h3 className="text-base font-medium line-clamp-1">
										{orderItem.name}
									</h3>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
										<span>{orderItem.category}</span>
									</p>
								</div>
								<Prices
									price={orderItem.price}
									className="mt-0.5 ml-2"
								/>
							</div>
						</div>
						<Stack
							className="text-sm mt-4"
							direction={"row"}
							spacing={3}
						>
							<Link to={`/@/${orderItem.profileId}`}>
								<p className="text-gray-500 dark:text-slate-400 flex items-center hover:text-primary-500">
									View profile
								</p>
							</Link>
							<Link to={`/product/${orderItem.id}`}>
								<p className="text-gray-500 dark:text-slate-400 flex items-center hover:text-primary-500">
									Leave a review
								</p>
							</Link>
						</Stack>
					</div>
				</div>
			))}
		</>
	);
};

export default OrderItemList;
