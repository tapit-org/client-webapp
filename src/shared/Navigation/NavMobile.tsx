import React from 'react';
import ButtonClose from 'shared/ButtonClose/ButtonClose';
import Logo from 'shared/Logo/Logo';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { NavItemType } from 'shared/Navigation/NavigationItem';
import { NAVIGATION } from 'data/navigation';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import SocialsList from 'shared/SocialsList/SocialsList';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import SwitchDarkMode from 'shared/SwitchDarkMode/SwitchDarkMode';

export interface NavMobileProps {
	data?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ data = NAVIGATION, onClickClose }) => {
	const renderNavigationItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure key={index} as="li" className="text-slate-900 dark:text-white">
				<NavLink
					className={({ isActive }) =>
						`flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg ${
							isActive ? 'text-secondary' : ''
						}`
					}
					to={{
						pathname: item.href || undefined,
					}}
				>
					<span className={'block w-full'} onClick={onClickClose}>
						{item.name}
					</span>
				</NavLink>
			</Disclosure>
		);
	};

	return (
		<div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
			<div className="py-6 px-5">
				<Logo />
				<div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">
					<span>Tap your Tag to someone's phone and instantly share your profile.</span>
				</div>
				<span className="absolute right-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col py-6 px-2 space-y-1">{data.map(renderNavigationItem)}</ul>
			<div className="py-6 px-5">
				<div className="flex flex-col text-slate-600 dark:text-slate-300 text-sm">
					<div className="flex justify-between items-center ">
						<SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
						<span className="block">
							<SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavMobile;
