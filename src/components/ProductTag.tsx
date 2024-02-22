import {
	NoSymbolIcon,
	ClockIcon,
	SparklesIcon,
	AdjustmentsVerticalIcon,
} from '@heroicons/react/24/outline';
import React, { FC } from 'react';
import IconDiscount from 'components/IconDiscount';

interface Props {
	tag: string;
	className?: string;
}

const ProductTag: FC<Props> = ({
	tag,
	className = 'absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300',
}) => {
	const renderTag = () => {
		if (!tag) {
			return null;
		}
		const CLASSES = `nc-shadow-lg rounded-full flex items-center justify-center ${className}`;
		if (tag === '50% Discount') {
			return (
				<div className={CLASSES}>
					<IconDiscount className="w-3.5 h-3.5" />
					<span className="ml-1 leading-none">{tag}</span>
				</div>
			);
		}
		if (tag === 'Sold Out') {
			return (
				<div className={CLASSES}>
					<NoSymbolIcon className="w-3.5 h-3.5" />
					<span className="ml-1 leading-none">{tag}</span>
				</div>
			);
		}
		if (tag === 'Limited edition') {
			return (
				<div className={CLASSES}>
					<ClockIcon className="w-3.5 h-3.5" />
					<span className="ml-1 leading-none">{tag}</span>
				</div>
			);
		}
		if (tag === 'Customizable Design') {
			return (
				<div className={CLASSES}>
					<AdjustmentsVerticalIcon className="w-3.5 h-3.5" />
					<span className="ml-1 leading-none">{tag}</span>
				</div>
			);
		}
		return null;
	};

	return renderTag();
};

export default ProductTag;
