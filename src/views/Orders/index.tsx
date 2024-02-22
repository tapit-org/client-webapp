import OrderList from "components/OrderList";
import Prices from "components/Prices";
import { PRODUCTS } from "data/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrderList } from "services/order.service";
import { getProductList } from "services/product.service";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "views/Account/CommonLayout";

const AccountOrder = () => {
	const uid = useSelector((state: any) => state.user.uid);
	const [orderList, setOrderList] = useState([]);
	const [productList, setProductList] = useState([]);
	const [showLoader, setShowLoader] = useState(true);
	useEffect(() => {
		const init = async () => {
			setShowLoader(true);
			setOrderList(await fetchOrderList(uid));
			setProductList(await getProductList());
			setShowLoader(false);
		};
		init();
	}, []);

	return (
		<div className="nc-CommonLayoutProps container">
			<div className="mt-14 sm:mt-20">
				<div className="max-w-2xl">
					<h2 className="text-3xl xl:text-4xl font-semibold">
						Orders
					</h2>
				</div>
				<hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

				<div className="mt-6">
					<OrderList
						orderList={orderList}
						showLoader={showLoader}
						productList={productList}
					/>
				</div>
			</div>
		</div>
	);
};

export default AccountOrder;
