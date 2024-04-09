import { IconButton, Stack } from "@mui/material";
import Input from "shared/Input/Input";

const IconInput = ({
	name,
	type = "text",
	value,
	setValue,
	placeholder,
	left = null,
	right = null,
	disabled = false,
	children = null,
}) => (
	<Stack direction={"row"} sx={{ width: "100%" }}>
		{left && (
			<span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
				{left}
			</span>
		)}
		{children ? (
			children
		) : (
			<Input
				type={type}
				name={name}
				value={value}
				className={
					left && right
						? "rounded-none"
						: left
						? "rounded-l-none"
						: right
						? "rounded-r-none"
						: ""
				}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
			/>
		)}

		{right && (
			<span className="inline-flex items-center px-0.5 rounded-r-2xl border border-l-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
				{right}
			</span>
		)}
	</Stack>
);

export default IconInput;
