import {
	AddCircleOutlineOutlined,
	AlternateEmailOutlined,
	Label,
} from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Heading from "components/Heading/Heading";
import {
	PROFILE_THEMES,
	ProfileListItemInterface,
} from "interfaces/profile.interface";
import { FC, useState } from "react";
import { createProfile } from "services/profile.service";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";

interface ThemeSelectorProps {
	selectedTheme: PROFILE_THEMES;
	onSelect: (theme: PROFILE_THEMES) => void;
}
const ThemeSelector: FC<ThemeSelectorProps> = ({ selectedTheme, onSelect }) => {
	const themes = Object.values(PROFILE_THEMES).map((theme) => {
		return {
			title: theme,
			image: require("images/HIW1img.png"),
		};
	});
	return (
		<Box>
			<Grid container spacing={2} direction={"row"}>
				{themes.map((theme) => {
					return (
						<Grid xs={4} item key={theme.title}>
							<Paper
								className={`px-3 py-6 cursor-pointer hover:bg-primary-500`}
								onClick={() => onSelect(theme.title)}
							>
								<Stack
									direction={"column"}
									spacing={2}
									onClick={() => onSelect(theme.title)}
									alignItems={"center"}
								>
									<img
										width={200}
										src={theme.image}
										alt={theme.title}
									/>
									<Typography variant="body2">
										{theme.title}
									</Typography>
								</Stack>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default ThemeSelector;
