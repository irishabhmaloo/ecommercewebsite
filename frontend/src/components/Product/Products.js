import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from 'react-router-dom';
import MetaData from "../layout/metaData";
import Pagination from "react-js-pagination";

const Products = () => {

    const { keyword } = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const {
        products,
        loading,
        error,
        productsCount,
        resultsPerPage
    } = useSelector((state) => state.products);

    // console.log(resultsPerPage);
    // console.log(productsCount);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, alert, error, keyword, currentPage]);


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

                    {/* Pagination */}
                    {resultsPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultsPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </>}
        </>
    )
}

export default Products
