import React from "react";

function Card({ product }) {
  const [addToCart, setAddToCart] = React.useState(false);
  const handleAddProduct = () => {
    setAddToCart(true);
    setTimeout(() => {
      setAddToCart(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-4 w-80 relative">
      {addToCart && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
          <span className="bg-green-500 text-white px-4 py-2 rounded-full"> Added to Cart </span>
        </div>
      )}
      <a href="#" className="relative block border border-gray-100">
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </button>

        <img
          alt="Toy"
          src={product.image}
          className="h-56 w-full object-contain"
        />

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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </button>
        </div>
      </a>
    </div>
  );
}

export default Card;
