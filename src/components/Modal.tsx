import { Dialog, Transition } from "@headlessui/react";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";

export interface ModalQuickViewProps {
	show: boolean;
	onCloseModalQuickView: () => void;
	children: any;
	title?: string;
	position?: string;
	hideClose?: boolean;
	padding?: number;
}

const Modal: FC<ModalQuickViewProps> = ({
	show,
	onCloseModalQuickView,
	children,
	title = "",
	position = "center",
	hideClose = false,
	padding = 5,
}) => {
	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50"
				onClose={onCloseModalQuickView}
			>
				<div className="flex items-stretch md:items-center justify-center h-full text-center md:px-4">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/70" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div
							className="relative inline-flex xl:py-8 w-full max-w-5xl max-h-full px-3 "
							style={
								position == "bottom"
									? {
											position: "fixed",
											bottom: 0,
									  }
									: {}
							}
						>
							<div
								style={{ padding }}
								className={`max-h-full w-full text-left align-middle transition-all transform lg:rounded-2xl bg-white 
              dark:bg-neutral-900 dark:border dark:border-slate-700 dark:text-slate-100 shadow-xl rounded-xl`}
							>
								<Stack
									width={"100%"}
									direction={"row"}
									justifyContent={"space-between"}
									alignItems={"center"}
								>
									<Typography variant="h6">
										{title}
									</Typography>
									{!hideClose && (
										<ButtonClose
											onClick={onCloseModalQuickView}
										/>
									)}
								</Stack>
								{children}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;
