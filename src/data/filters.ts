interface FilterType {
	name: string;
	description?: string;
	defaultChecked?: boolean;
}
export const FILTER_COLORS: FilterType[] = [
	{ name: 'SILVER' },
	{ name: 'GOLD' },
	{ name: 'ROSE GOLD' },
];

export const FILTER_CATEGORIES: FilterType[] = [{ name: 'CARD' }, { name: 'TAG' }];
