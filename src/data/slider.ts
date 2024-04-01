import imageRightPng from "images/hero-right.png";
import imageRightPng2 from "images/hero-right-2.png";
import imageRightPng3 from "images/hero-right-3.png";

interface SliderType {
	image: string;
	heading: string;
	subHeading: string;
	btnText: string;
	btnLink: string;
}

export const SLIDER_DATA: SliderType[] = [
	{
		image: imageRightPng2,
		heading: "Tap-It and Connect.",
		subHeading: "Your digital business card redefined",
		btnText: "View Products",
		btnLink: "/products",
	},
	{
		image: imageRightPng3,
		heading: "Your digital business card",
		subHeading: "In this season, find the best 🔥",
		btnText: "View Products",
		btnLink: "/products",
	},
	{
		image: imageRightPng,
		heading: "Your digital business card",
		subHeading: "In this season, find the best 🔥",
		btnText: "View Products",
		btnLink: "/products",
	},
];
