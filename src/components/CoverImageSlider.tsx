import { FC, useEffect, useId, useRef } from "react";
import ProductCard from "components/ProductCard";
import { ProductListItemInterface } from "interfaces/product.interface";
import Glide from "@glidejs/glide";
import NcImage from "shared/NcImage/NcImage";

export interface CoverImageSliderProps {
	data?: any[];
}

const CoverImageSlider: FC<CoverImageSliderProps> = ({ data = [] }) => {
	const sliderRef = useRef(null);
	const id = useId();
	const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

	useEffect(() => {
		if (!sliderRef.current) {
			return () => {};
		}

		// @ts-ignore
		const OPTIONS: Glide.Options = {
			perView: 4,
			gap: 15,
			bound: true,
			breakpoints: {
				1280: {
					perView: 4 - 1,
				},
				1024: {
					gap: 20,
					perView: 4 - 1,
				},
				768: {
					gap: 20,
					perView: 4 - 2,
				},
				640: {
					gap: 20,
					perView: 1.5,
				},
				500: {
					gap: 20,
					perView: 1.3,
				},
			},
		};

		let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
		slider.mount();
		return () => {
			slider.destroy();
		};
	}, [sliderRef, UNIQUE_CLASS]);
	return (
		<div
			style={{
				width: "calc(100% - 100px)",
			}}
		>
			<div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{data.map((image, index) => (
							<li className={`glide__slide`} key={index}>
								<NcImage
									containerClassName="w-full relative h-0 aspect-h-9 aspect-w-16 rounded-xl overflow-hidden"
									className="w-full rounded-2xl object-cover"
									src={image.base64}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CoverImageSlider;
