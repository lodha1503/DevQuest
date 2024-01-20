import React, {useEffect} from "react";
import "./Home.css";
import Product from "../Product/Product";

function Home() {
        useEffect(() => {
          const intervalId = setInterval(() => {
            // Trigger the next slide after a certain interval
            const carousel = document.getElementById("carouselExampleInterval");
            if (carousel) {
              const currentIndex = parseInt(carousel.dataset.bsSlideTo);
              const nextIndex = (currentIndex + 1) % 3; // Assuming 3 slides, adjust as needed
              carousel.dataset.bsSlideTo = nextIndex;
              carousel.dispatchEvent(new Event("slide.bs.carousel"));
            }
          }, 5000); // Change the interval as needed (milliseconds)
      
          // Cleanup the interval on component unmount
          return () => clearInterval(intervalId);
        }, []);
      
    return (
        <div className="home">
            <div className="home_container">
                <div
                    id="carouselExampleInterval"
                    className="carousel slide"
                    
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div
                            className="carousel-item active "
                            data-bs-interval="2000"
                        >
                            <img
                                src="https://wallpapers.com/images/featured/amazon-npcp6jc782ixp9zs.jpg"
                                className="home_image d-block w-100" 
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img
                                src="https://kalingatv.com/wp-content/uploads/2020/12/myntra.jpg"
                                className="home_image d-block w-100"
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img
                                src="https://media.licdn.com/dms/image/D4D12AQFIfehamvKU9g/article-cover_image-shrink_720_1280/0/1680263836040?e=2147483647&v=beta&t=Mq7Zi9AaqBPCf_l82Nu9tV1ZERQMl7b2OFC3EOcALhs"
                                className="home_image w-100 d-block "
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className="home_row">
                    <Product
                        id={1}
                        title="Apple iPhone 14 Pro Max (128 GB) - Deep Purple"
                        price={1549.97}
                        image="https://m.media-amazon.com/images/I/31GmCJTD0GL._SY445_SX342_QL70_FMwebp_.jpg"
                        rating={5}
                    ></Product>

                    <Product
                        id={2}
                        title="OnePlus Nord CE 2 Lite 5G (Black Dusk, 6GB RAM, 128GB Storage)"
                        price={2107.91}
                        image="https://m.media-amazon.com/images/I/61K7ujVUm+L._SX679_.jpg"
                        rating={4}
                    ></Product>

                    <Product
                        id={3}
                        title="OnePlus Bullets Z2 Bluetooth Wireless in Ear Earphones with Mic, Bombastic Bass - 12.4 Mm Drivers, 10 Mins Charge - 20 Hrs Music, 30 Hrs Battery Life (Magico Black)"
                        price={24.21}
                        image="https://m.media-amazon.com/images/I/31pAe23ncfL._SX300_SY300_QL70_FMwebp_.jpg"
                        rating={4}
                    ></Product>
                </div>

                <div className="home_row">
                    <Product
                        id={4}
                        title="PUMA Phase Backpack, Nero (Forest Night), One Size"
                        price={13.31}
                        image="https://m.media-amazon.com/images/I/91K2x5Z-qQL._AC_UL640_FMwebp_QL65_.jpg"
                        rating={4}
                    ></Product>

                    <Product
                        id={5}
                        title="Safari Pentagon 75 cms Large Check-in Polypropylene Hard Sided 4 Wheeler Luggage/Suitcase/Trolley Bag (Cyan)"
                        price={42.61}
                        image="https://m.media-amazon.com/images/I/51ak7RFRBbL._UX679_.jpg"
                        rating={4}
                    ></Product>
                </div>

                <div className="home_row">
                    <Product
                        id={6}
                        title="Myprotein Impact Whey Protein, Chocolate Brownie, 1 Kg"
                        price={41.88}
                        image="https://m.media-amazon.com/images/I/41dIr2KpbhL._SX679_.jpg"
                        rating={5}
                    ></Product>

                    <Product
                        id={7}
                        title="MuscleBlaze Beginner's Protein (Jar Pack), Whey Supplement (Chocolate, 1 kg / 2.2 lb) with 650 ml Shaker (Combo Pack)"
                        price={40.75}
                        image="https://m.media-amazon.com/images/I/61Sc0VAsleL._SX679_PIbundle-2,TopRight,0,0_AA679SH20_.jpg"
                        rating={4}
                    ></Product>

                    <Product
                        id={8}
                        title="MuscleBlaze Creatine Monohydrate, Labdoor USA Certified Creatine (Unflavoured, 250 g / 0.55 lb, 83 Servings)"
                        price={12.1}
                        image="https://m.media-amazon.com/images/I/71fpCxOFU-L._SX679_.jpg"
                        rating={5}
                    ></Product>

                    <Product
                        id={9}
                        title="Optimum Nutrition (ON) Gold Standard 100% Whey Isolate (2 lbs/907 g) (Double Rich Chocolate) Protein Powder "
                        price={41.61}
                        image="https://m.media-amazon.com/images/I/71-C2n5MW4L._SX679_.jpg"
                        rating={5}
                    ></Product>
                </div>
            </div>
        </div>
    );
}

export default Home;
