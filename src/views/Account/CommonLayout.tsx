import React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export interface CommonLayoutProps {
	children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
	const { user } = useSelector((state: any) => {
		return {
			user: state.user,
		};
	});
	return (
		<div className="nc-CommonLayoutProps container">
			<div className="mt-14 sm:mt-20">
				<div className="max-w-4xl mx-auto">
					<div className="max-w-2xl">
						<h2 className="text-3xl xl:text-4xl font-semibold">Account</h2>
					</div>
					<hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

					<div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
						{[
							{
								name: 'Account Info',
								link: '/account',
							},
							{
								name: 'Addresses',
								link: '/account/address',
							},
							{
								name: 'Profiles',
								link: '/account/profiles',
							},
							{
								name: 'Orders',
								link: '/account/orders',
							},
							{
								name: 'Change Password',
								link: '/account/change-password',
							},
						].map((item, index) => (
							<NavLink
								key={item.name}
								to={item.link}
								className={({ isActive }) =>
									`block py-5 md:py-5 border-b-2 border-transparent flex-shrink-0  text-sm sm:text-base ${
										isActive
											? 'border-primary-500 font-medium text-slate-900 dark:text-slate-200'
											: 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
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
			<div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">{children}</div>
		</div>
	);
};

export default CommonLayout;
