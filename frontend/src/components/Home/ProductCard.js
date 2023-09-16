import React from 'react';
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {

  const options = {
    size: "large",
    value: product.ratings,
    isHalf: true,
    readOnly: true,
    precision: 0.5
}

  // console.log(product);

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.image[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className='productCardSpan'> ({product.numberOfReviews} Reviews) </span>
      </div>
      <span>{`Rs ${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
