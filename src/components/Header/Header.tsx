import { FC } from 'react';
import Logo from 'shared/Logo/Logo';
import MenuBar from 'shared/MenuBar/MenuBar';
import AvatarDropdown from 'components/Header/AvatarDropdown';
import Navigation from 'shared/Navigation/Navigation';
import CartDropdown from 'components/Header/CartDropdown';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { useSelector } from 'react-redux';
import Button from 'shared/Button/Button';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { Link } from 'react-router-dom';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
	const { user } = useSelector((state: any) => {
		return {
			user: state.user,
		};
	});
	const handleLogout = async (close: any) => {
		console.log('Signing out');
		await signOut(auth);
		close();
	};
	return (
		<div className="sticky top-0 w-full z-40 ">
			<div className="relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
				<div className="container">
					<div className="h-20 flex justify-between">
						<div className="flex items-center lg:hidden flex-1">
							<MenuBar />
							<Logo className="mx-2 h-100" />
						</div>

						<div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
							<div className="hidden lg:block">
								<Logo className="h-100" />
							</div>
							<div className="hidden lg:block h-10 border-l border-slate-200 dark:border-slate-700"></div>
							<div className="hidden lg:block">
								<Navigation />
							</div>
						</div>

						<div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
							<CartDropdown />
							{user.uid ? (
								<AvatarDropdown user={user} handleLogout={handleLogout} />
							) : (
								<Link to="/login">
									<ButtonPrimary type="submit" className="mx-3">
										Login
									</ButtonPrimary>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
