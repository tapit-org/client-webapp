import { FC } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export interface NcInputNumberProps {
	className?: string;
	value: number;
	handleIncrement: any;
	handleDecrement: any;
}

const NcInputNumber: FC<NcInputNumberProps> = ({
	className = "w-full",
	value,
	handleIncrement,
	handleDecrement,
}) => {
	return (
		<div
			className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
		>
			<div
				className={`nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28`}
			>
				<button
					className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
					type="button"
					onClick={handleDecrement}
					disabled={value == 0}
				>
					<MinusIcon className="w-4 h-4" />
				</button>
				<span className="select-none block flex-1 text-center leading-none">
					{value}
				</span>
				<button
					className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
					type="button"
					onClick={handleIncrement}
				>
					<PlusIcon className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default NcInputNumber;
