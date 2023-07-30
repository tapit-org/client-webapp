import React, { FC } from 'react';
import MainNav from 'shared/Header/MainNav';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
	return (
		<div id="nc-chifis-header" className="nc-Header w-full z-40">
			{/* NAV */}
			<MainNav isTop />
		</div>
	);
};

export default Header;
