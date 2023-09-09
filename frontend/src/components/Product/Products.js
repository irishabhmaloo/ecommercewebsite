import React, { useEffect } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from 'react-router-dom'; 
import MetaData from "../layout/metaData";

const Products = () => {

    const {keyword} = useParams();
    const dispatch = useDispatch();

    const {
        products,
        loading,
        error,
        productsCount,
    } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword));
    }, [dispatch, alert, error, keyword]);


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                </>}
        </>
    )
}

export default Products
