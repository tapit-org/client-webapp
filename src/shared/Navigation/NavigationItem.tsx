import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavItemType {
	id: string;
	name: string;
	href: string;
}

export interface NavigationItemProps {
	menuItem: NavItemType;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {
	// ===================== MENU MAIN MENU =====================
	const renderMainItem = (item: NavItemType) => {
		return (
			<div className="h-20 flex-shrink-0 flex items-center">
				<NavLink
					rel="noopener noreferrer"
					className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
					to={{
						pathname: item.href || undefined,
					}}
				>
					{item.name}
				</NavLink>
			</div>
		);
	};

	return <li className="menu-item flex-shrink-0">{renderMainItem(menuItem)}</li>;
};

export default NavigationItem;
