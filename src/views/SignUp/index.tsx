import facebookSvg from 'images/Facebook.svg';
import twitterSvg from 'images/Twitter.svg';
import googleSvg from 'images/Google.svg';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FirebaseSocial from 'components/FirebaseSocial';
import SignupForm from './SignupForm';

const loginSocials = [
	{
		name: 'Continue with Facebook',
		href: '#',
		icon: facebookSvg,
	},
	{
		name: 'Continue with Twitter',
		href: '#',
		icon: twitterSvg,
	},
	{
		name: 'Continue with Google',
		href: '#',
		icon: googleSvg,
	},
];

const PageSignUp = () => {
	return (
		<div className={`nc-PageSignUp`} data-nc-id="PageSignUp">
			<Helmet>
				<title>Sign up | Tap-it</title>
			</Helmet>
            <div className="container mb-24 lg:mb-32">
				<h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
					Create Account
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
					<SignupForm />
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
                        Already have an account? {` `}
						<Link to="/login">
							Sign in
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default PageSignUp;
