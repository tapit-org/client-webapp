import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo_black.png";
import logoLightImg from "images/logo_white.png";

export interface LogoProps {
	img?: string;
	imgLight?: string;
	className?: string;
}

const Logo: React.FC<LogoProps> = ({
	img = logoImg,
	imgLight = logoLightImg,
	className = "flex-shrink-0",
}) => {
	return (
		<Link
			to="/"
			className={`ttnc-logo inline-block text-slate-600 ${className}`}
		>
			{img ? (
				<img
					className={`block max-h-8 sm:max-h-10 ${
						imgLight ? "dark:hidden" : ""
					}`}
					src={img}
					alt="Logo"
				/>
			) : (
				"Logo Here"
			)}
			{imgLight && (
				<img
					className="hidden max-h-8 sm:max-h-10 dark:block"
					src={imgLight}
					alt="Logo-Light"
				/>
			)}
		</Link>
	);
};

export default Logo;
