// Product.js

import React, { useState } from 'react';
import './Product.css';
import ProductPopup from './productPopup';
import { useStateValue } from '../StateProvider';

function Product({ id,site, title, image, price, rating }) {
  console.log(image);
  const [{ basket }, dispatch] = useStateValue();
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const isInWishlist = basket.some(item => item.id === id);

  const addToBasket = (event) => {
    // Dispatch the item into the data layer
    event.stopPropagation();
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        site:site,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };

  return (
    <>
      <div className={`product`} onClick={openPopup}>
        <div className="product_info">
          <p>{title}</p>
          <p className='product_price'>
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className="product_rating">
            {Array(rating).fill().map((_, index) => (<p key={index}>&#x2B50;</p>))}
          </div>
        </div>
        <img src={image} alt="" />
       
        <button className={`wishlist_button ${isInWishlist ? 'wishlist_active' : ''}`} onClick={addToBasket}>
  <span>&#x2764;</span> {/* Heart emoji */}
  <h7 style={{ color: "white", marginLeft: "8px" }}>Wishlist</h7>
</button>
        
      </div>

      {isPopupVisible && (
        <ProductPopup
          product={{ id, site,title, image, price, rating }}
          onClose={closePopup}
          isPopupVisible={isPopupVisible}
        />
      )}
    </>
  );
}

export default Product;
