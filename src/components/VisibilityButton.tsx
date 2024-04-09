import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";

const VisibilityToggleButton = ({ isVisible, toggle }) => {
	return (
		<Tooltip title={isVisible ? "Hide" : "Show"}>
			<IconButton onClick={toggle}>
				{isVisible ? (
					<VisibilityOutlined fontSize="small" />
				) : (
					<VisibilityOffOutlined fontSize="small" />
				)}
			</IconButton>
		</Tooltip>
	);
};

export default VisibilityToggleButton;
