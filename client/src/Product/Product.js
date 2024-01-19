import React,{useState} from 'react'
import './Product.css'
import ProductPopup from './productPopup';
import { useStateValue } from '../StateProvider';

function Product({id,title,image,price,rating}) {

  const [{ basket} , dispatch] = useStateValue();
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const addToBasket=()=>{
    // Dispatch the item into the data layer

    dispatch({
      type:"ADD_TO_BASKET",
      item:{
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  }
  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };
  return (
    <div className={`product ${isPopupVisible ? 'popup-active' : ''}`} onClick={openPopup}>

      <div className="product_info">
        <p>{title}</p>
        <p className='product_price'>
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating).fill().map((_,)=>(<p>&#x2B50;</p>))}
          
          
        </div>
        
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Wishlist</button>

      {isPopupVisible && (
        <ProductPopup
          product={{ id, title, image, price, rating }}
          onClose={closePopup}
          isPopupVisible={isPopupVisible}
        />
      )}


    </div>
  )
}

export default Product
