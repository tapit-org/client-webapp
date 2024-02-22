import { Link } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const NewProfileCard = () => {
	return (
		<Box
			className="rounded-2xl m-1 p-3 bg-primary-50"
			sx={{
				flexGrow: 1,
				textAlign: {
					xs: "center",
					sm: "left",
				},
				height: "calc(100% - 10px)",
				boxSizing: "border-box",
			}}
		>
			<Link to={"/profile/create"}>
				<Grid
					item
					container
					className="px-2"
					sx={{
						alignItems: "center",
						height: "100%",
						minHeight: "200px",
						boxSizing: "border-box",
						cursor: "pointer",
					}}
				>
					<Stack direction="row" spacing={2} className="m-auto">
						<AddCircleOutline
							fontSize="large"
							className="text-neutral-800"
						/>
						<h2 className="text-xl md:text-2xl text-neutral-800 font-semibold">
							New Profile
						</h2>
					</Stack>
				</Grid>
			</Link>
		</Box>
	);
};

export default NewProfileCard;
