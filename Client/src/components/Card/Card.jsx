import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { addProduct, getCart } from "../../Redux/Actions/Actions";
import { useSelector } from "react-redux";

//
// {
//   "user_id": "63655ee42e2e013aabe52aaf",
//     "products_id": [
//       {
//         "product_id": "635d7eae6d25de9b14540274",
//         "quantity": 7
//       },
//       {
//         "product_id": "635d7eca6d25de9b14540276",
//         "quantity": 9
//       },
//       {
//         "product_id": "635f329a8c2248183912c15e",
//         "quantity": 3
//       }
//     ]
// }

function Card({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);
  const handleAddProduct = () => {
    swal({
      title: "Product added to cart",
      icon: "success",
      button: "Ok",
    });
    let userId = localStorage.getItem("id");
    let productId = product.id;
    let productsToadd = {
      "user_id": userId,
      "products_id": [
        {
          "product_id": productId,
          "quantity": 1
        }
      ]
    }

    dispatch(addProduct(productsToadd));
    dispatch(getCart(userId));
  }

  return (
    <div className="p-4 relative w-80" >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-black p-2 text-white"
      >
        <span className="sr-only">Wishlist</span>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </button>
      <Link to={`/product/${product.id}`}>
        <img
          alt="Toy"
          src={product.image}
          className="h-56 w-full object-contain"
        />
      </Link>
      <div className="p-6">
        {/* price with symol usd */}
        <p className="text-sm font-medium text-gray-600">${product.price}</p>

        <h3 className="mt-1 text-lg font-bold">{product.name}</h3>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center rounded-sm bg-yellow-500 px-8 py-4"
          onClick={handleAddProduct}
        >
          <span className="text-sm font-medium"> Add to cart</span>

          <svg
            className="ml-1.5 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </button>
      </div>

    </div >
  );
}

export default Card;
