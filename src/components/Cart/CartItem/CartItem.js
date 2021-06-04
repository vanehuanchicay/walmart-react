import React, { useContext } from 'react';
import CartContext from '../../../context/Cart/CartContext';
import '../CartItem/CartItem.css';

const CartItem = ({ item }) => {
  const { removeItems } = useContext(CartContext);
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

  return (
    <li className='cart-items'>
      <img src={`https://${item.image}`} alt='' />
      <div>
        {item.brand}
        <br />
        {item.description}
        <br />
        {formatter.format(`${item.price}`, formatter)}
      </div>
      <button className='delete-items-btn' onClick={() => removeItems(item.id)}>
        Eliminar
      </button>
    </li>
  );
};

export default CartItem;
