import { FC, useEffect, useState } from "react";
import ProductList from "components/ProductList";
import Reviews from "views/ProductDetail/Reviews";
import ProductSidebar from "views/ProductDetail//Sidebar";
import { useParams } from "react-router-dom";
import { getProduct } from "services/product.service";
import { ProductInterface } from "interfaces/product.interface";
import FAQs from "./FAQs";

const ProductDetailPage = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<ProductInterface>(null);
	useEffect(() => {
		(async () => {
			setProduct(await getProduct(id));
		})();
	}, [id]);
	if (product) {
		return (
			<div className={`nc-ProductDetailPage`}>
				{/* MAIn */}

				<main className="container mt-5 lg:mt-11">
					<div className="lg:flex">
						{/* CONTENT */}
						<div className="w-full lg:w-[55%] ">
							{/* HEADING */}
							<div className="relative">
								<div className="aspect-w-16 aspect-h-16">
									<img
										src={product.images[0]}
										className="w-full rounded-2xl object-cover"
										alt="product detail 1"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
								{[product.images[1], product.images[2]].map(
									(item, index) => {
										return (
											<div
												key={index}
												className="aspect-w-16 xl:aspect-w-16 2xl:aspect-w-16 aspect-h-16"
											>
												<img
													src={item}
													className="w-full rounded-2xl object-cover"
													alt="product detail 1"
												/>
											</div>
										);
									},
								)}
							</div>
						</div>

						{/* SIDEBAR */}
						<div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
							<ProductSidebar product={product} />
						</div>
					</div>
					<div className="my-12 sm:my-16 space-y-10 sm:space-y-16">
						<hr className="border-slate-200 dark:border-slate-700" />
						<div id="reviews">
							<Reviews
								setProduct={setProduct}
								productId={product.id}
								rating={product.rating}
								reviewCount={product.reviewCount}
							/>
						</div>
						<hr className="border-slate-200 dark:border-slate-700" />
						<FAQs />
						<hr className="border-slate-200 dark:border-slate-700" />
						<ProductList
							heading="Customers also purchased"
							subHeading=""
							type="SLIDER"
						/>
					</div>
				</main>
			</div>
		);
	}
	return <></>;
};

export default ProductDetailPage;
