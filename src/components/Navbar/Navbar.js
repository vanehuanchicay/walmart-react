import React, { useContext, useState, useEffect } from 'react';
import Logo from '../../assets/lider-logo.svg';
import Cart from '../../assets/lider-cart.svg';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import CartContext from '../../context/Cart/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import './Navbar.css';

const Navbar = () => {
  const { cartItems, showHideCart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
     fetch('http://localhost:8080/api/products-catalog', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
      .then(res => {
        return res.json() 
    }).then(data =>{
      setProductsData(data.products);
    })
  }, []);
  
  const counterFilter = productsData.filter((i) => {
    return i.description.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <>
      <nav>
        <div className='nav-left'>
          <img src={Logo} alt='' width='110' />
        </div>
        <div className='categories-wrapper'>
          <AiOutlineMenu />
          <p>Categorías</p>
        </div>
        <div className='nav-search'>
          <div className='input-wrapper'>
            <BsSearch />
            <input
              type='text'
              placeholder='¿Qué estás buscando?'
              onChange={(ev) => setSearch(ev.target.value)}
            />
          </div>
        </div>
        <div className='cart-wrapper' onClick={showHideCart}>
          <div className='cart-icon'>
            <img src={Cart} alt='' width='29' />
          </div>
          <div>
            {cartItems.length >= 0 && (
              <div className='item-count'>
                <span>{cartItems.length}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className='products-wrapper'>
        {counterFilter.map((productItems, idx) => {
          return (
            <ProductCard
              key={idx}
              product={productItems}
            ></ProductCard>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
