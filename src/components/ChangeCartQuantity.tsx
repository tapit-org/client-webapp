import NcInputNumber from 'components/NcInputNumber';
import { CartItemInterface } from 'interfaces/cart.interface';
import { FC } from 'react';
import { dispatch } from 'store';
import { addCartItem, removeCartItem } from 'store/reducers/cart';

interface CartQuantityEditorProps {
    cartItem: CartItemInterface
}

const CartQuantityEditor: FC<CartQuantityEditorProps> = ({ cartItem }) => {
    const handleIncreaseQuantity = (cartItem: CartItemInterface) => {
        const itemToAdd = {
            id: cartItem.id,
            name: cartItem.name,
            category: cartItem.category,
            thumbnail: cartItem.thumbnail,
            price: cartItem.price,
            status: cartItem.status,
        }
        dispatch(addCartItem(itemToAdd));
    }
    const handleDescreaseQuantity = (id: string) => {
        dispatch(removeCartItem(id));
    }

    return (
        <NcInputNumber
            className="relative z-10"
            value={cartItem.quantity}
            handleIncrement={() => handleIncreaseQuantity(cartItem)}
            handleDecrement={() => handleDescreaseQuantity(cartItem.id)}
        />
    );
};

export default CartQuantityEditor;
