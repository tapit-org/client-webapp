import { FC, useEffect, useId, useRef } from "react";
import ProductCard from "components/ProductCard";
import { ProductListItemInterface } from "interfaces/product.interface";
import Glide from "@glidejs/glide";
import NcImage from "shared/NcImage/NcImage";
import { Button, IconButton } from "@mui/material";
import { Delete, DeleteOutline } from "@mui/icons-material";

export interface ImageSliderProps {
	images: any[];
	selected: any;
	aspectRatio: number;
	rounded?: boolean;
	handleSelect: (image: any) => void;
	handleDelete: (filename: string) => void;
}

const ImageSlider: FC<ImageSliderProps> = ({
	images,
	selected,
	aspectRatio,
	rounded = false,
	handleSelect,
	handleDelete,
}) => {
	const sliderRef = useRef(null);
	const id = useId();
	const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

	useEffect(() => {
		if (!sliderRef.current) {
			return () => {};
		}

		// @ts-ignore
		const OPTIONS: Glide.Options =
			aspectRatio == 1
				? {
						perView: 6,
						gap: 15,
						bound: true,
						breakpoints: {
							1280: {
								perView: 3,
							},
							1024: {
								perView: 3,
							},
							768: {
								perView: 5,
							},
							640: {
								perView: 4,
							},
							500: {
								perView: 2.2,
							},
							400: {
								perView: 1.8,
							},
						},
				  }
				: {
						perView: 4,
						gap: 15,
						bound: true,
						breakpoints: {
							1280: {
								perView: 2,
							},
							1024: {
								perView: 2,
							},
							768: {
								perView: 3.5,
							},
							640: {
								perView: 2.8,
							},
							500: {
								perView: 1.5,
							},
							400: {
								perView: 1.2,
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
				width: "calc(100% - 120px)",
			}}
		>
			<div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{images.map((image, index) => (
							<span
								className={`glide__slide`}
								key={index}
								style={{
									width: `${100 / aspectRatio}px !important`,
									height: 100,
									position: "relative",
								}}
							>
								<IconButton
									onClick={() => handleDelete(image.filename)}
									sx={{
										position: "absolute",
										top: 0,
										left: 100 / aspectRatio - 20,
										zIndex: 100,
										p: 0,
									}}
								>
									<DeleteOutline
										fontSize="medium"
										className="bg-primary-900 rounded-full p-1"
										sx={{
											color: "white",
										}}
									/>
								</IconButton>

								<NcImage
									onClick={() => handleSelect(image)}
									containerClassName={`w-full relative h-0  ${
										aspectRatio == 1
											? "aspect-h-9 aspect-w-9"
											: "aspect-h-9 aspect-w-16"
									} ${
										rounded ? "rounded-full" : "rounded-xl"
									} overflow-hidden`}
									className={`w-full p-1 ${
										selected == image.filename
											? "bg-primary-200"
											: ""
									} ${
										rounded ? "rounded-full" : "rounded-xl"
									} object-contain`}
									src={image.url}
									height={100}
									width={100 / aspectRatio}
								/>
							</span>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ImageSlider;
