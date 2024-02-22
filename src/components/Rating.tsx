import { Star, StarHalf, StarOutline } from "@mui/icons-material";
import React, { FC } from "react";

export interface RatingProps {
	rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
	return (
		<div className="mt-0.5 flex text-yellow-500">
			{[1, 2, 3, 4, 5].map((e, i) => {
				if (e == Math.floor(rating) && e < rating) {
					return (
						<>
							<Star key={i} />
							<StarHalf key={i + 1} />
						</>
					);
				}
				if (e <= Math.floor(rating)) {
					return (
						<>
							<Star key={i} />
						</>
					);
				}
				if (e > Math.ceil(rating)) {
					return <StarOutline key={i} />;
				}
			})}
		</div>
	);
};

export default Rating;
