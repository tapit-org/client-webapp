import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export interface CommonLayoutProps {
	children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
	return (
		<div className="container">
			<div className="mt-14 sm:mt-20">
				<div>
					<div className="max-w-2xl">
						<h2 className="text-3xl xl:text-4xl font-semibold">
							My Account
						</h2>
					</div>
					<hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

					<div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
						{[
							{
								name: "Account Info",
								link: "/account",
							},
							{
								name: "Saved Addresses",
								link: "/account/address",
							},
							{
								name: "Change Password",
								link: "/account/change-password",
							},
						].map((item, index) => (
							<NavLink
								key={item.name}
								to={item.link}
								className={({ isActive }) =>
									`block py-5 md:py-5 border-b-2 border-transparent flex-shrink-0  text-sm sm:text-base ${
										isActive
											? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
											: "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
									}`
								}
							>
								{item.name}
							</NavLink>
						))}
					</div>
					<hr className="border-slate-200 dark:border-slate-700"></hr>
				</div>
			</div>
			<div className="pt-6 sm:pt-6 pb-24 lg:pb-32">{children}</div>
		</div>
	);
};

export default CommonLayout;
