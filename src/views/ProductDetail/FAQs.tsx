import { FC } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Help } from '@mui/icons-material';

const FAQ_LIST = [
    {
        "question": "What is Tapit and how does it work?",
        "answer": "Tapit is a revolutionary digital business card solution that uses NFC technology. Our Tapit cards have a built-in NFC chip that allows you to share your contact information with a simple tap on compatible smartphones."
    },
    {
        "question": "Are Tapit cards compatible with my device?",
        "answer": "Tapit cards work seamlessly with NFC-enabled smartphones and devices, which are commonly found on both Android and iOS platforms. If your device has NFC, it's likely compatible with Tapit."
    },
    {
        "question": "How do I share my contact information using Tapit?",
        "answer": "Sharing your information is effortless. Just tap your Tapit card against the back of a recipient's NFC-enabled smartphone. They'll receive a prompt to save your contact details instantly."
    },
    {
        "question": "Can I customize the design of my Tapit card?",
        "answer": "Absolutely! Personalization is key. Choose from a variety of design templates and customize the colors, fonts, and layout to match your branding and style."
    },
    {
        "question": "What if someone doesn't have an NFC-enabled device?",
        "answer": "No worries. If a recipient doesn't have NFC, you can still manually input your unique Tapit URL into their browser, leading them to your digital profile."
    },
    {
        "question": "Is my information secure when using Tapit?",
        "answer": "Yes, your security is a top priority. The contact-sharing process is one-way, ensuring that only your information is shared, and recipients can't access your device's data."
    },
    {
        "question": "Can I update my information on the Tapit card?",
        "answer": "Absolutely. Your Tapit card is connected to an online dashboard, allowing you to update your details anytime. Recipients will always have access to your most current information."
    },
    {
        "question": "How do I order Tapit cards? Is there a minimum order quantity?",
        "answer": "Ordering is simple. Visit our website, choose your design, and place your order online. Whether you need a few cards or a larger quantity, we're here to meet your needs."
    },
    {
        "question": "What industries benefit from using Tapit?",
        "answer": "Tapit is perfect for professionals across various industries, including business, real estate, creative fields, and more. If you're looking to make a memorable impression, Tapit is for you."
    },
    {
        "question": "What's the durability of Tapit cards?",
        "answer": "Tapit cards are built to last. Made from high-quality materials, they can withstand everyday use while maintaining their functionality and visual appeal."
    },
    {
        "question": "How do I contact customer support for further assistance?",
        "answer": "For any additional questions, reach out to our customer support team at [contact email/phone]. We're dedicated to ensuring your Tapit experience is seamless."
    },
    {
        "question": "What's the environmental impact of Tapit cards?",
        "answer": "Tapit promotes sustainability by reducing the need for traditional paper cards. Make a positive impact on the environment while staying connected."
    }
]


interface Props {
	panelClassName?: string;
	data?: typeof FAQ_LIST;
}




const FAQs: FC<Props> = ({
	panelClassName = 'p-4 pt-3 last:pb-0 text-slate-600 text-sm dark:text-slate-300 leading-6',
	data = FAQ_LIST,
}) => {
	return (
		<div className="w-full rounded-2xl space-y-2.5">
			{/* ============ */}
            <h2 className="my-4 text-2xl font-semibold flex items-center">
                <Help fontSize='large' />
                <span className="ml-1.5">Frequently Asked Questions</span>
            </h2>
			{data.map((item, index) => {
				return (
					<Disclosure key={index}>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
									<span>{item.question}</span>
									{!open ? (
										<PlusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
									) : (
										<MinusIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
									)}
								</Disclosure.Button>
								<Disclosure.Panel
									className={panelClassName}
									as="div"
									dangerouslySetInnerHTML={{ __html: item.answer }}
								></Disclosure.Panel>
							</>
						)}
					</Disclosure>
				);
			})}

			{/* ============ */}
		</div>
	);
};

export default FAQs;
