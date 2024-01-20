// ProductPopup.js

import React from 'react';
import './productPopup.css';

function ProductPopup({ product, onClose }) {
  return (
    <div className="productPopup" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <div className="popupLeft">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="popupRight">
          <button className="closeButton" onClick={onClose}>
            &times; {/* Cross symbol */}
          </button>
          <h2>{product.title}</h2>
          <p className='product_price'>
          <small>₹</small>
          <strong>{product.price}</strong>
        </p>
        <div className="product_rating">
          {Array(product.rating).fill().map((_,)=>(<p>&#x2B50;</p>))}  
        </div>
        
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
