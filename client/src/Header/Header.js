// Since Header is a component we need to capitalize the starting letter of the file

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./Header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import React, { useEffect, useState } from "react";
import SearchBar from "../Services/Search/Search";
import hlogo from "../static/images/hlogo.png"
function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        // Check the scroll position and update state
        const scrollTop = window.scrollY;
        if (scrollTop > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    //Dispatch is used to manipulate the info

    return (
        <div>
            <div className={`Header ${isScrolled ? "scrolled" : ""}`}>
            <div className="Header">
                <Link to="/">
                    <img
                        className="header_logo"
                        src={hlogo}
                    />
                </Link>
                <SearchBar />
                {/* <div className="header_search">
                    <div className="header_searchContainer">
                        <input
                            className="header_searchInput"
                            type="text"
                            placeholder="Search..."
                        />
                        <SearchIcon className="header_searchIcon" />
                    </div>
                </div> */}

                <div className="header_nav" >
                    <Link to="/login" className="auth underline">
                        <div className="header_option">
                            <span className="header_optionLineOne">
                                {user ? "Hello Shreyansh  " : "Hello Guest"}
                            </span>
                            <span className="header_optionLineTwo">
                                {user ? "Sign Out" : "Sign In"}
                            </span>
                        </div>
                    </Link>

                    {/* <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div> */}

                    <Link to="/checkout" className="underline">
                        <div className="header_optionBasket">
                            <div className="header_wishlist">
                                <ShoppingBasketIcon></ShoppingBasketIcon>
                                <span className="header_wishlistLabel">
                                    Wish List
                                </span>
                            </div>
                            <span className="header_optionLineTwo header_basketCount">
                                {basket.length}
                            </span>
                        </div>
                    </Link>

                    {/* <Link to="/checkout">
                        <div className="header_optionBasket">
                            <ShoppingBasketIcon></ShoppingBasketIcon>
                            <span className="header_optionLineTwo header_basketCount">
                                {basket.length}
                            </span>
                            <span className="header_optionLineTwo header_basketCount">
                                Wish List
                            </span>
                        </div>
                    </Link> */}
                </div>
            </div>
            </div>
        </div>
    );
}

export default Header;
