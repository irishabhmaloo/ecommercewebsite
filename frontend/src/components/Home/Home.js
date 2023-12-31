import React, { useEffect } from 'react';
// import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./ProductCard";
import MetaData from "../layout/metaData";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";

// temporary static object for checking purpose
// const product = {
//     name: "1989 TV",
//     images: [{url: "https://lastfm.freetls.fastly.net/i/u/ar0/a5820d29c7bb511ef4887e5f7cd5fa46.jpg"}],
//     price: "Rs 1989",
//     _id: "check"
// }


const Home = () => {

    // GET all products from backend
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    // console.log(products);
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title="ShauKing" />

                <div className="banner">
                    <p>Welcome to ShauKing</p>
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
                    {products && products.map((product) => <Product key={product._id} product={product} />)}
                </div>
            </>}
        </>
    )
}

export default Home
