import { ProductFeatureInterface } from 'interfaces/product.interface';
import { FC } from 'react';
import Policy from 'views/ProductDetail/Policy';

export interface DescriptionPageProps {
    description: string,
    features: ProductFeatureInterface[],
}

const Description: FC<DescriptionPageProps> = ({ description = '', features = [] }) => {
    return (
        <div className="space-y-7 2xl:space-y-8">
            <div className="">
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                    <p>
                        {description}
                    </p>
                    <ul>
                        {features.map((feature, index) => <li key={index}>
                            <span className='font-weight-bold'>{feature.title}</span> - <span className=''>{feature.text}</span> 
                        </li>)}
                    </ul>
                </div>
            </div>
            <Policy />
        </div>
    );
};

export default Description;
