import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import SectionHero from "components/SectionHero/SectionHero";
import ProductList from "components/ProductList";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import SectionFAQs from "components/SectionFAQs/SectionFAQs";
const PageHome = () => {
	return (
		<div className="nc-PageHome relative overflow-hidden">
			<SectionHero />
			<div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
				<ProductList
					heading="Start Shopping"
					subHeading="Check out our line of products"
					type="SLIDER"
				/>
				<SectionHowItWork />
				<SectionClientSay />
				<SectionFAQs />
			</div>
		</div>
	);
};

export default PageHome;
