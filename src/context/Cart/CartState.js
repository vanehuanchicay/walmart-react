import React, { useReducer, useState } from 'react';
import { ADD_TO_CART, REMOVE_ITEMS, SHOW_HIDE_CART } from '../Types';
import CartContext from './CartContext';
import CartReducer from './CartReducer';

const CartState = ({ children }) => {
  const initalState = {
    showCart: false,
    cartItems: [],
  };
  const [discount, setDiscount] = useState([]);

  const fetchDiscount = () => {
    fetch('http://localhost:8080/api/discounts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDiscount(data.discounts);
      });
  };

  const [state, dispatch] = useReducer(CartReducer, initalState);

  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
    fetchDiscount();
  };

  const showHideCart = () => {
    dispatch({ type: SHOW_HIDE_CART });
  };
  const removeItems = (id) => {
    dispatch({ type: REMOVE_ITEMS, payload: id });
  };

  return (
    <div>
      <CartContext.Provider
        value={{
          showCart: state.showCart,
          cartItems: state.cartItems,
          addToCart,
          showHideCart,
          removeItems,
          discountData: discount,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartState;
