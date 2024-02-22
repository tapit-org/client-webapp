import { Transition } from '@headlessui/react';
import { ProductListItemInterface } from 'interfaces/product.interface';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface NotifyAddToCartProps {
    product: ProductListItemInterface;
}

const NotifyAddToCart: FC<NotifyAddToCartProps> = ({ product }) => {
    return (
        <Transition
            appear
            show={true}
            className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
            enter="transition-all duration-150"
            enterFrom="opacity-0 translate-y-0"
            enterTo="opacity-100 translate-y-5"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 translate-y-5"
            leaveTo="opacity-0 translate-y-0"
        >
            <p className="block text-base font-semibold leading-none">Added to cart!</p>
            <hr className=" border-slate-200 dark:border-slate-700 my-4" />
            <div className="flex ">
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="h-full w-full object-contain object-center"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div className='mb-4'>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium ">{product.name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>
                                        {product.category}
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                    <Link
                        to={'/cart'}
                        className="font-medium text-primary-6000 dark:text-primary-500 "
                    >
                        View Cart
                    </Link>
                </div>
            </div>
        </Transition>
    );
};

export default NotifyAddToCart;