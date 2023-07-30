import SectionHowItWork from 'components/SectionHowItWork/SectionHowItWork';
import SectionHero from 'components/SectionHero/SectionHero';
import SectionSliderProductCard from 'components/SectionSliderProductCard';
import SectionClientSay from 'components/SectionClientSay/SectionClientSay';
import { PRODUCTS } from 'data/data';

const PageHome = () => {
	return (
		<div className="nc-PageHome relative overflow-hidden">
			<SectionHero />
			<div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
				<SectionSliderProductCard data={PRODUCTS} />
				<SectionHowItWork />
				<SectionClientSay />
			</div>
		</div>
	);
};

export default PageHome;
