import React, { useContext } from 'react';
import CartContext from '../../context/Cart/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

  return (
    <div className='productCard-wrapper'>
      <img
        className='productCard-img'
        src={`https://${product.image}`}
        alt=''
      ></img>
      <span>{product.brand}</span>
      <p>{product.description}</p>
      <div className='product-price'>
        <p>{formatter.format(product.price)} </p>
      </div>
      <div className='addProduct-wrapper'>
        <button
          className='addProduct-btn'
          onClick={() => {
            addToCart(product);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
