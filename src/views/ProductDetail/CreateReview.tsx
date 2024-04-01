import React, { FC, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Box, FormControl, Rating, Stack } from "@mui/material";
import Label from "components/Label/Label";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Textarea from "shared/Textarea/Textarea";

export interface CreateReviewProps {
	onCreate: (review: string, rating: number) => void;
}
const labels = {
	1: "Useless",
	2: "Poor",
	3: "Ok",
	4: "Good",
	5: "Excellent",
};
const getLabelText = (value: number): string => {
	return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};
const CreateReview: FC<CreateReviewProps> = ({ onCreate }) => {
	const [rating, setRating] = useState<number>(5);
	const [text, setText] = useState<string>("");
	const [hover, setHover] = React.useState<number>(-1);
	return (
		<Stack
			spacing={3}
			className="p-4"
			justifyContent={"center"}
			// alignItems={"center"}
		>
			<FormControl>
				<Label className="text-sm">
					Please tell us about your experience with the product!
				</Label>
				<Textarea
					className="mt-2 p-4"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</FormControl>
			<Stack
				direction={"column"}
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Rating
					size="large"
					value={rating}
					precision={1}
					getLabelText={getLabelText}
					onChange={(event, newValue) => {
						setRating(newValue);
					}}
					onChangeActive={(event, newHover) => {
						setHover(newHover);
					}}
					emptyIcon={
						<StarIcon
							style={{ opacity: 0.55 }}
							fontSize="inherit"
						/>
					}
				/>
				{rating !== null && (
					<Box sx={{ mt: 2 }}>
						<Label className="text-sm">
							{labels[hover !== -1 ? hover : rating]}
						</Label>
					</Box>
				)}
			</Stack>
			<ButtonPrimary
				sizeClass="py-2 px-4"
				fontSize="text-sm font-medium"
				className="bg-slate-50 dark:bg-slate-800 !rounded-lg"
				onClick={() => onCreate(text, rating)}
			>
				Create
			</ButtonPrimary>
		</Stack>
	);
};

export default CreateReview;
