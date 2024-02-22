import Prices from 'components/Prices';
import { CartItemInterface } from 'interfaces/cart.interface';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { FC } from 'react';

interface CartButtonProps {
    cartQuantity: number
}

const CartButton: FC<CartButtonProps> = ({ cartQuantity }) => {
    return (
        <Link to={'/cart'}>
            <div className='group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative'>
                <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                    <span className="mt-[1px]">{cartQuantity}</span>
                </div>
                <ShoppingCartOutlined fontSize='medium'/>
            </div>
        </Link>
    );
}

export default CartButton