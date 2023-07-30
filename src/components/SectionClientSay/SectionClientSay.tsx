import Glide from '@glidejs/glide';
import Heading from 'components/Heading/Heading';
import { useId, useState } from 'react';
import { useEffect } from 'react';
import clientSayMain from 'images/clientSayMain.png';
import clientSay1 from 'images/clientSay1.png';
import clientSay2 from 'images/clientSay2.png';
import clientSay3 from 'images/clientSay3.png';
import clientSay4 from 'images/clientSay4.png';
import clientSay5 from 'images/clientSay5.png';
import clientSay6 from 'images/clientSay6.png';
import quotationImg from 'images/quotation.png';
import quotationImg2 from 'images/quotation2.png';
import { StarIcon } from '@heroicons/react/24/solid';

const TESTIMONIAL_DATA = [
	{
		id: 1,
		clientName: 'Tiana Abie',
		content:
			'Great quality products, affordable prices, fast and friendly delivery. I very recommend.',
		image: clientSayMain,
	},
	{
		id: 2,
		clientName: 'Lennie Swiffan',
		content:
			'Great quality products, affordable prices, fast and friendly delivery. I very recommend.',
		image: clientSayMain,
	},
	{
		id: 3,
		clientName: 'Berta Emili',
		content:
			'Great quality products, affordable prices, fast and friendly delivery. I very recommend.',
		image: clientSayMain,
	},
];

const SectionClientSay = () => {
	const id = useId();
	const UNIQUE_CLASS = 'glidejs' + id.replace(/:/g, '_');
	useEffect(() => {
		// @ts-ignore
		const OPTIONS: Glide.Options = {
			perView: 1,
		};

		let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
		slider.mount();
		return () => {
			slider.destroy();
		};
	}, [UNIQUE_CLASS]);

	const renderBg = () => {
		return (
			<div className="hidden md:block">
				<img className="absolute top-9 -left-20" src={clientSay1} alt="" />
				<img className="absolute bottom-[100px] right-full mr-40" src={clientSay2} alt="" />
				<img className="absolute top-full left-[140px]" src={clientSay3} alt="" />
				<img className="absolute -bottom-10 right-[140px]" src={clientSay4} alt="" />
				<img className="absolute left-full ml-32 bottom-[80px]" src={clientSay5} alt="" />
				<img className="absolute -right-10 top-10 " src={clientSay6} alt="" />
			</div>
		);
	};

	return (
		<div className={`nc-SectionClientSay relative flow-root`} data-nc-id="SectionClientSay">
			<Heading
				rightDescText={"Let's see what people think of us"}
				hasNextPrev={false}
				isCenter
			>
				Testimonials
			</Heading>
			<div className="relative md:mb-16 max-w-2xl mx-auto">
				{renderBg()}

				<div className={`mt-12 lg:mt-16 relative ${UNIQUE_CLASS}`}>
					<div className="glide__track " data-glide-el="track">
						<ul className="glide__slides ">
							{TESTIMONIAL_DATA.map((item) => (
								<li
									key={item.id}
									className="glide__slide flex flex-col items-center text-center"
								>
									<img className="mx-auto" src={item.image} alt="" />
									<span className="block text-2xl">{item.content}</span>
									<span className="block mt-8 text-2xl font-semibold">
										{item.clientName}
									</span>
									<div className="flex items-center space-x-0.5 mt-3.5 text-yellow-500">
										<StarIcon className="w-6 h-6" />
										<StarIcon className="w-6 h-6" />
										<StarIcon className="w-6 h-6" />
										<StarIcon className="w-6 h-6" />
										<StarIcon className="w-6 h-6" />
									</div>
								</li>
							))}
						</ul>
					</div>
					<div
						className="mt-10 glide__bullets flex items-center justify-center"
						data-glide-el="controls[nav]"
					>
						{TESTIMONIAL_DATA.map((item, index) => (
							<button
								key={item.id}
								className="glide__bullet w-2 h-2 rounded-full bg-neutral-300 mx-1 focus:outline-none"
								data-glide-dir={`=${index}`}
							></button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionClientSay;
