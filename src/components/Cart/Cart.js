import React, { useContext } from 'react';
import CartContext from '../../context/Cart/CartContext';
import { GrFormClose } from 'react-icons/gr';
import CartImg from '../../assets/empty-cart.svg';
import CartItem from './CartItem/CartItem';
import './Cart.css';

export const Cart = () => {
  const { showCart, cartItems, showHideCart, discountData } =
    useContext(CartContext);
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

  const totalCart = cartItems.reduce((amount, item) => item.price + amount, 0);
  let mapBrand = new Map();
  for (let i in cartItems) {
    const aux = mapBrand.get(cartItems[i].brand);
    if (aux) {
      const auxPrice = aux + cartItems[i].price;
      mapBrand.set(cartItems[i].brand, auxPrice);
    } else {
      mapBrand.set(cartItems[i].brand, cartItems[i].price);
    }
  }
  let messageDiscount = '';
  let messageSuggest = '';
  let auxDiscountMax = 0;
  let auxSuggestMax = 0;

  for (let [brand, sumTotalBrand] of mapBrand.entries()) {
    const discountBrand = discountData.find((item) => item.brand === brand);
    if (
      sumTotalBrand >= discountBrand?.threshold &&
      discountBrand.discount > auxDiscountMax
    ) {
      messageDiscount = `Se aplicó un descuento de $${discountBrand.discount} por haber comprado $${sumTotalBrand} de productos ${brand}!`;
      auxDiscountMax = discountBrand.discount;
    }
    if (
      sumTotalBrand < discountBrand?.threshold &&
      discountBrand.discount > auxSuggestMax
    ) {
      messageSuggest = `Agrega $${
        discountBrand.threshold - sumTotalBrand
      } más en productos ${brand} y aprovecha un descuento total de $${
        discountBrand.discount
      } en tu compra!`;
      auxSuggestMax = discountBrand.discount;
    }
  }

  return (
    <>
      {showCart && (
        <div className='card-wrapper'>
          <GrFormClose onClick={showHideCart} />
          <div className='card-innerWrapper'>
            {cartItems.length === 0 ? (
              <>
                <img src={CartImg} alt='' width='25%' />
                <h3>Tu carro está vacío</h3>
              </>
            ) : (
              <ul>
                {cartItems.map((item, idx) => (
                  <CartItem key={idx} item={item} />
                ))}
              </ul>
            )}
          </div>
          <div>
            {messageSuggest && (
              <>
                <span className='messageSuggest'>{messageSuggest}</span>
              </>
            )}
          </div>
          <div>
            {messageDiscount && (
              <>
                <div className='totalDiscount'>
                  <span>Subtotal de productos</span>
                  <div>{formatter.format(totalCart)}</div>
                </div>
                <div className='totalDiscount'>
                  <span>Descuento por marca</span>
                  <div>{formatter.format(auxDiscountMax)}</div>
                </div>
                <span className='messageDiscount'>*{messageDiscount}</span>
              </>
            )}
          </div>
          <div className='subTotal'>
            {cartItems.length > 0 && (
              <>
                <span>Total a pagar</span>
                <div>{formatter.format(totalCart - auxDiscountMax)}</div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
