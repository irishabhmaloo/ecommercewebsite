import React from 'react';
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product";


// temporary static object for checking purpose
const product = {
    name: "1989 TV",
    images: [{url: "https://lastfm.freetls.fastly.net/i/u/ar0/a5820d29c7bb511ef4887e5f7cd5fa46.jpg"}],
    price: "Rs 1989",
    _id: "check"
}


const Home = () => {
    return (
        <>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll
                        {/* <CgMouse /> */}
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {/* product component will be populated */}
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </>
    )
}

export default Home
