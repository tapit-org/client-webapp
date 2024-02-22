import { Popover, Transition } from "@headlessui/react";
import {
	AccountCircleOutlined,
	BadgeOutlined,
	Brightness1Outlined,
	Brightness4Outlined,
	ExitToAppOutlined,
	HelpOutlineOutlined,
	LogoutOutlined,
	ShoppingBagOutlined,
	ShoppingBagRounded,
	ShoppingBagSharp,
} from "@mui/icons-material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import SwitchDarkMode2 from "shared/SwitchDarkMode/SwitchDarkMode2";

export default function AvatarDropdown({ user, handleLogout }) {
	return (
		<div className="AvatarDropdown ">
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
						>
							<svg
								className=" w-6 h-6"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
										<div className="flex items-center space-x-3">
											<Avatar
												imgUrl={user.image}
												userName={user.name}
												sizeClass="w-12 h-12"
											/>

											<div className="flex-grow">
												<h4 className="font-semibold">
													{user.name}
												</h4>
												<p className="text-xs mt-0.5">
													{user.email}
												</p>
											</div>
										</div>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 1 --------------------- */}
										<Link
											to={"/account"}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											onClick={() => close()}
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<AccountCircleOutlined />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													My Account
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											to={"/orders"}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											onClick={() => close()}
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<ShoppingBagOutlined />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													Orders
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											to={"/profiles"}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											onClick={() => close()}
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<BadgeOutlined />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													Profiles
												</p>
											</div>
										</Link>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 2 --------------------- */}
										<div className="flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
											<div className="flex items-center">
												<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
													<Brightness4Outlined />
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium ">
														Dark theme
													</p>
												</div>
											</div>
											<SwitchDarkMode2 />
										</div>

										{/* ------------------ 2 --------------------- */}
										<Link
											to={"/#"}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											onClick={() => close()}
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<HelpOutlineOutlined />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													Help
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											to={"/#"}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											onClick={() => handleLogout(close)}
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<ExitToAppOutlined />
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													Log out
												</p>
											</div>
										</Link>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
}
