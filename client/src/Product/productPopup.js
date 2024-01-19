// ProductPopup.js

import React from 'react';
import './productPopup.css';

function ProductPopup({ product, onClose, isPopupVisible }) {
    
  return (
    <div className={`productPopup `}  onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} />
        <p>{product.price}</p>
        {/* Add more details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProductPopup;
