import { NavItemType } from 'shared/Navigation/NavigationItem';
import ncNanoId from 'utils/ncNanoId';

export const NAVIGATION: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/products',
		name: 'Products',
	},
	{
		id: ncNanoId(),
		href: '/about',
		name: 'Profile Designs',
	},
	{
		id: ncNanoId(),
		href: '/about',
		name: 'About',
	},
	{
		id: ncNanoId(),
		href: '/contact',
		name: 'Contact',
	},
];
