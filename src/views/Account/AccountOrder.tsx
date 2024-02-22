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
		<div>
			<CommonLayout>
				<div className="space-y-10 sm:space-y-12">
					<OrderList
						orderList={orderList}
						showLoader={showLoader}
						productList={productList}
					/>
				</div>
			</CommonLayout>
		</div>
	);
};

export default AccountOrder;
