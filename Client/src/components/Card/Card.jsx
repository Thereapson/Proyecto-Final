import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { addProduct, addFavorite, removeFavorite, getFavorites } from "../../Redux/Actions/Actions";
import { useSelector } from "react-redux";

function Card({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);
  const favorites = useSelector(state => state.userFavorites);
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
    // dispatch(getQuantity(userId));
    // dispatch(getCart(user.id || localStorage.getItem("id")));
  }

  const [inFavorites, setInFavorites] = React.useState(false);

  const handleIsInFav = () => {
    if (favorites.length) {
      favorites.forEach(favorite => {
        if (favorite._id === product.id) {
          setInFavorites(true);
        }
      })
    }
  }
  useEffect(() => {
    handleIsInFav();
  }, [favorites])

  const handleRemoveFavorite = (id) => {
    console.log('id', id)
    let body = {
      "userId": localStorage.getItem('id'),
      "productId": id
    }
    dispatch(removeFavorite(body))
    dispatch(getFavorites(localStorage.getItem('id')))
  }

  const handleAddFavorite = () => {
    handleIsInFav();
    if (inFavorites) {
      swal({
        title: "Product already in favorites",
        icon: "warning",
        // do you want to remove it from your favourites?
        text: "Do you want to remove it from your favorites?",
        buttons: ["No", "Yes"],
      })
        .then((willDelete) => {
          if (willDelete) {
            handleRemoveFavorite(product.id);
            setInFavorites(false);
            swal("Product removed from favorites", {
              icon: "success",
            });
          }
        });
    } else {
      swal({
        title: "Product added to favorites",
        icon: "success",
        button: "Ok",
      });
      let userId = localStorage.getItem("id");
      let productId = product.id;
      let productsToadd = {
        "userId": userId,
        "productId": productId
      }
      dispatch(addFavorite(productsToadd));
      dispatch(getFavorites(localStorage.getItem("id")));
    }
  }



  return (
    // card  responsive from tailwind css
    <div className="flex flex-col justify-center items-center gap-3">
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full text-white p-1 bg-red-600 hover:bg-red-700 z-10"
        onClick={handleAddFavorite}
      >
        <span className="sr-only">Wishlist</span>
        <svg
          className="h-5 w-5 fill-current text-white hover:text-white hover:scale-110 transition duration-300 ease-in-out"
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

      </button >
      {/* img container with hover scale 1.1 but not overflow from container */}
      < div className="relative w-full overflow-hidden rounded-t-lg sm:h-48 md:h-56 lg:h-64 xl:h-72" >
        <Link to={`/product/${product.id}`}>
          <img
            alt="Toy"
            src={product.image}
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition duration-300 ease-in-out"
          />
        </Link>
      </div >
      <div className="p-6">
        <p className="text-sm font-medium text-gray-600">${product.price}</p>

        <h3 className="mt-1 text-lg font-bold">{product.name}</h3>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center rounded-sm bg-primary px-8 py-4"
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
