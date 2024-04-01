import { StarIcon } from "@heroicons/react/24/solid";
import { Star, StarHalf, StarOutline, ThumbDown } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { ProductReviewInterface } from "interfaces/product.interface";
import React, { FC, memo } from "react";
import Avatar from "shared/Avatar/Avatar";

export interface ReviewItemProps {
	review?: ProductReviewInterface;
}

function formatTimeDifference(date: any) {
	const currentTime = new Date();
	const timeDifference = currentTime.getTime() - new Date(date).getTime();
	const secondsDifference = Math.floor(timeDifference / 1000);
	console.log(secondsDifference);
	if (secondsDifference >= 86400) {
		const days = Math.floor(secondsDifference / 86400);
		return `${days} day${days === 1 ? "" : "s"} ago`;
	} else if (secondsDifference >= 3600) {
		const hours = Math.floor(secondsDifference / 3600);
		return `${hours} hour${hours === 1 ? "" : "s"} ago`;
	} else if (secondsDifference >= 60) {
		const minutes = Math.floor(secondsDifference / 60);
		return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
	} else {
		return "just now";
	}
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {
	return (
		<div className={`nc-ReviewItem flex flex-col`} data-nc-id="ReviewItem">
			<div className="flex space-x-4">
				<div className="flex-shrink-0 pt-0.5">
					<Avatar
						sizeClass="h-10 w-10 text-lg"
						radius="rounded-full"
						userName={review.name}
						imgUrl={""}
					/>
				</div>

				<div className="flex-1 flex justify-between">
					<div className="text-sm sm:text-base">
						<span className="block font-semibold">
							{review.name}
						</span>
						<span className="block mt-0.5 text-slate-500 dark:text-slate-400 text-xs">
							{formatTimeDifference(review.createdAt)}
						</span>
					</div>

					<Rating value={review.rating} precision={0.1} readOnly />
				</div>
			</div>
			<div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
				<p className="text-slate-600 dark:text-slate-300">
					{review.text}
				</p>
			</div>
		</div>
	);
};

export default memo(ReviewItem);
