import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Product from '../Product/Product';
import './OnSearch.css';

function OnSearch() {
  const location = useLocation();
  const searchData = location.state ? location.state.searchData : null;

  // Number of products to display in each row
  const productsPerRow = 3;

  return (
    <div className='total'>
      {searchData && searchData.length ? (
        <div>
          {searchData.reduce((rows, item, index) => {
            if (index % productsPerRow === 0) {
              rows.push([]);
            }
            rows[rows.length - 1].push(item);
            return rows;
          }, []).map((row, rowIndex) => (
            <div key={rowIndex} className="row_onsearch">
              {row.map((item) => (
                <div key={item.id} className = "container d-flex flex-wrap align-items-center">
                  <Product
                    id={item.id}
                    site={item.site}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                     className="main_card m-2 card
                     ct"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default OnSearch;
