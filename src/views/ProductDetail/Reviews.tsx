import React, { FC, useEffect, useState } from "react";
import ReviewItem from "components/ReviewItem";
import { StarRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {
	createProductReview,
	getProductReviews,
} from "services/product.service";
import Modal from "components/Modal";
import CreateReview from "views/ProductDetail/CreateReview";
import {
	ProductInterface,
	ProductReviewInterface,
} from "interfaces/product.interface";
import { useSelector } from "react-redux";
import useBoolState from "hooks/useBoolState";
import toast from "react-hot-toast";

export interface ReviewPageProps {
	productId: string;
	rating: number;
	reviewCount: number;
	setProduct: any;
	scrollId?: string;
}

const Reviews: FC<ReviewPageProps> = ({
	productId,
	rating,
	reviewCount,
	setProduct,
	scrollId = "review",
}) => {
	const user = useSelector((state: any) => state.user);
	const [showCreateReviewModal, toggleCreateReviewModal] =
		useBoolState(false);
	const [reviews, setReviews] = useState<ProductReviewInterface[]>([]);
	const handleSetReviews = async (id: string) => {
		setReviews((await getProductReviews(id)) || []);
	};
	const handleShowCreateReviewModal = () => {
		console.log(user);
		if (!user.uid) {
			toast.error("Please login to leave a review.");
			return;
		}
		toggleCreateReviewModal();
	};
	const handleCreateReview = async (reviewText: string, rating: number) => {
		const response = await createProductReview(productId, {
			review: reviewText,
			rating: rating,
		});
		if (response) {
			setReviews((prev: ProductReviewInterface[]) => [
				response.review,
				...prev,
			]);
			setProduct((prev: ProductInterface) => ({
				...prev,
				rating: response.rating,
				reviewCount: response.reviewCount,
			}));
			toggleCreateReviewModal();
		}
	};
	useEffect(() => {
		if (productId) {
			handleSetReviews(productId);
		}
	}, [productId]);
	return (
		<div id={scrollId}>
			<h2 className="text-2xl font-semibold flex items-center">
				<StarRounded fontSize="large" />
				<span className="ml-1.5">
					{" "}
					{rating != 0 ? rating.toString() : ""} ·{" "}
					{reviewCount.toString()} Reviews
				</span>
			</h2>
			<div className="mt-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
					{reviews.map((review, index) => {
						return <ReviewItem key={index} review={review} />;
					})}
				</div>
				<Stack direction="row" spacing={2} className="mt-6">
					<ButtonPrimary
						onClick={handleShowCreateReviewModal}
						className="border border-slate-300 dark:border-slate-700 "
					>
						Leave a Review
					</ButtonPrimary>
				</Stack>
			</div>
			<Modal
				show={showCreateReviewModal}
				onCloseModalQuickView={toggleCreateReviewModal}
			>
				<CreateReview onCreate={handleCreateReview} />
			</Modal>
		</div>
	);
};

export default Reviews;
