import { CircularProgress, Grid, Stack, Tooltip } from "@mui/material";
// import { AddressInterface } from "interfaces/order.interface";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { FC, useEffect, useState } from "react";
import Prices from "./Prices";
import { ProductInterface } from "interfaces/product.interface";
import OrderItemList from "./OrderItemList";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { InfoRounded } from "@mui/icons-material";

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

interface OrderListProps {
	showLoader: boolean;
	orderList: any[];
	productList: ProductInterface[];
}

const OrderList: FC<OrderListProps> = ({
	showLoader,
	orderList,
	productList,
}) => {
	const [expandedOrder, setExpandedOrder] = useState(null);
	if (showLoader)
		return (
			<Stack alignItems={"center"}>
				<CircularProgress />
			</Stack>
		);
	if (orderList.length == 0) return <Grid>No Saved Addresses</Grid>;
	const getOrderItems = (order) => {
		return order.items.map((item: any) => {
			return {
				...productList.find((product) => product.id == item.id),
				price: item.price,
				profileId: item.profileId,
			};
		});
	};
	const getStatusTooltip = (status) => {
		if (status == "PENDING") {
			return "Our team will get in touch for more details about the order and confirm it.";
		}
	};
	return (
		<>
			{orderList.map((order: any) => (
				<div
					className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 mt-4"
					key={order.id}
				>
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
						<div>
							<p className="text-lg font-semibold">#{order.id}</p>
							<p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
								<Stack direction={"row"} spacing={1}>
									<span>
										{new Date(
											order.createdAt * 1000,
										).toLocaleString(undefined, {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
										})}
									</span>
									<span className="mx-2">|</span>
									<span className="text-primary-500">
										{order.status}
									</span>
									<Tooltip
										title={getStatusTooltip(order.status)}
									>
										<InfoRounded
											className="text-primary-500"
											fontSize={"small"}
										/>
									</Tooltip>
								</Stack>
							</p>
						</div>
						<div className="mt-3 sm:mt-0">
							<ButtonSecondary
								onClick={() => {
									expandedOrder == order.id
										? setExpandedOrder(null)
										: setExpandedOrder(order.id);
								}}
								sizeClass="py-2.5 px-4 sm:px-6"
								fontSize="text-sm font-medium"
							>
								{expandedOrder == order.id
									? "Hide Items"
									: "View Items"}
							</ButtonSecondary>
						</div>
					</div>
					{expandedOrder == order.id && (
						<div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
							<OrderItemList orderItems={getOrderItems(order)} />
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default OrderList;
