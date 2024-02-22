import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import FirebaseSocial from "components/FirebaseSocial";
import { Link } from "@mui/material";

const Login = () => {
	return (
		<div>
			<Helmet>
				<title>Login | Tap-it</title>
			</Helmet>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					Login
				</h2>
				<div className="max-w-md mx-auto space-y-6">
					<div className="grid gap-3">
						<FirebaseSocial />
					</div>
					<div className="relative text-center">
						<span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
							OR
						</span>
						<div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
					</div>
					<LoginForm />
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						New user? {` `}
						<Link
							component={RouterLink}
							color="text.primary"
							className="text-neutral-800 dark:text-neutral-200"
							to="/signup"
						>
							Create an account
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
