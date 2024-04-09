import { RemoveRedEye } from "@mui/icons-material";
import { Box, IconButton, InputAdornment } from "@mui/material";
import React, { InputHTMLAttributes, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	sizeClass?: string;
	paddingClass?: string;
	fontClass?: string;
	rounded?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className = "",
			sizeClass = "h-11",
			paddingClass = "px-4 py-3",
			fontClass = "text-sm font-normal",
			rounded = "rounded-2xl",
			children,
			type = "text",
			...args
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const handleClickShowPassword = () => {
			setShowPassword(!showPassword);
		};

		const handleMouseDownPassword = (event) => {
			event.preventDefault();
		};
		return (
			<Box
				sx={{
					position: "relative",
					width: "100%",
				}}
			>
				<input
					ref={ref}
					type={showPassword ? "text" : type}
					className={`block w-full border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${paddingClass} ${className}`}
					{...args}
				/>
				{type == "password" && (
					<IconButton
						className={`${sizeClass}`}
						sx={{
							mr: 0.1,
							position: "absolute",
							right: 0,
							top: 0,
						}}
						aria-label="toggle password visibility"
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						edge="end"
						size="large"
					>
						{showPassword ? <RemoveRedEye /> : <RemoveRedEye />}
					</IconButton>
				)}
			</Box>
		);
	},
);

export default Input;
