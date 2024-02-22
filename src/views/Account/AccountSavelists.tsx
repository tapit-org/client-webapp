import ProductCard from 'components/ProductCard';
import { ProductListItemInterface } from 'interfaces/product.interface';
import { useEffect, useState } from 'react';
import { getProductList } from 'services/product.service';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import CommonLayout from 'views/Account/CommonLayout';

const AccountSavelists = () => {
    const [productList, setProductList] = useState<ProductListItemInterface[]>([] as ProductListItemInterface[])
    useEffect(() => {
        (async () => {
            setProductList(await getProductList())
        })()
    }, [])
	const renderSection1 = () => {
		return (
			<div className="space-y-10 sm:space-y-12">
				<div>
					<h2 className="text-2xl sm:text-3xl font-semibold">List of saved products</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
					{productList.filter((_, i) => i < 6).map((stay) => (
						<ProductCard key={stay.id} product={stay} />
					))}
				</div>
				<div className="flex !mt-20 justify-center items-center">
					<ButtonSecondary loading>Show me more</ButtonSecondary>
				</div>
			</div>
		);
	};

	return (
		<div>
			<CommonLayout>{renderSection1()}</CommonLayout>
		</div>
	);
};

export default AccountSavelists;
