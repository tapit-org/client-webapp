import { Link as RouterLink } from "react-router-dom";
import FirebaseSocial from "components/FirebaseSocial";
import { Link } from "@mui/material";
import LoginForm from "views/Login/LoginForm";
import Modal from "components/Modal";
import { useState } from "react";
import SignupForm from "views/SignUp/SignupForm";

const LoginModal = ({ showModal, handleToggleModal }) => {
	const [showCreateAccount, setShowCreateAccount] = useState(false);
	return (
		<div>
			<Modal
				show={showModal}
				onCloseModalQuickView={handleToggleModal}
				position="center"
				padding={15}
			>
				<div className="container mb-24 lg:mb-32">
					<h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
						{showCreateAccount ? "Create Account" : "Login"}
					</h2>
					<div className="max-w-md mx-auto space-y-6">
						<div className="grid gap-3">
							<FirebaseSocial callback={handleToggleModal} />
						</div>
						<div className="relative text-center">
							<span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
								OR
							</span>
							<div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
						</div>
						{showCreateAccount ? (
							<>
								<SignupForm callback={handleToggleModal} />
								<span className="block text-center text-neutral-700 dark:text-neutral-300">
									Already have an account? {` `}
									<Link
										color="text.primary"
										className="text-neutral-800 dark:text-neutral-200"
										onClick={(e) => {
											e.preventDefault();
											setShowCreateAccount(false);
										}}
										sx={{
											cursor: "pointer",
										}}
									>
										Login
									</Link>
								</span>
							</>
						) : (
							<>
								<LoginForm callback={handleToggleModal} />
								<span className="block text-center text-neutral-700 dark:text-neutral-300">
									New user? {` `}
									<Link
										color="text.primary"
										className="text-neutral-800 dark:text-neutral-200"
										onClick={(e) => {
											e.preventDefault();
											setShowCreateAccount(true);
										}}
										sx={{
											cursor: "pointer",
										}}
									>
										Create an account
									</Link>
								</span>
							</>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default LoginModal;
