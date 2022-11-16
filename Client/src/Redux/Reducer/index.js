/* eslint-disable no-unused-vars */
import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_SEARCH,
  GET_CATEGORIES,
  ADD_PRODUCT,
  CLEAN_DETAILS,
  GET_PRODUCTS_BY_MIN_MAX,
  GET_USER,
  GET_CART,
  REMOVE_FROM_CART,
  CLEAN_PRODUCTS,
  CLEAN_PRODUCTS_RENDER,
  GET_ALL_PRODUCTS_BY_ID,
  IS_ADMIN,
  SHOW_PRODUCTS,
} from "../Actions/Actions";

const initialState = {

    products: [],
    filteredProducts: [],
    productsRender: [],
    DetailProduct: [],
    categories: [],
    lastAdd: {},
    cart: [],
    userData: {},
    isAdmin: {},
    buyproducts: [],
    filteredBy: "",
    userFavorites: [],
    quantityFromCart: 0,
    abouttobuyproducts: [],
    brands: [],

};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            let brands = action.payload.map((product) => {
                return product.brand
            });
            let brandsSet = new Set(brands);
            let brandsArray = [...brandsSet];

            return {
                ...state,
                products: action.payload,
                productsRender: action.payload,
                brands: brandsArray
            };

        case GET_PRODUCTS_BY_SEARCH:
            let search = action.payload;
            let filteredByName = state.products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()));
            let filteredByBrand = state.products.filter((product) => product.brand?.toLowerCase().includes(search.toLowerCase()));
            let filteredByCategory = state.products.filter((product) => product.category?.toLowerCase().includes(search.toLowerCase()));

            let filteredProducts = [...filteredByName, ...filteredByCategory, ...filteredByBrand];
            let filteredProductsUnique = filteredProducts.filter((product, index) => filteredProducts.indexOf(product) === index);

            if (filteredProducts.length > 0) {
                return {
                    ...state,
                    productsRender: filteredProductsUnique,
                    filteredBy: search
                };
            } else {
                return {
                    ...state,
                    productsRender: ["No Products Found"],
                };
            }


      // let filteredProducts = [
      //   ...filteredByName,
      //   ...filteredByCategory,
      //   ...filteredByBrand,
      // ];
      // let filteredProductsUnique = filteredProducts.filter(
      //   (product, index) => filteredProducts.indexOf(product) === index
      // );

      // if (filteredProducts.length > 0) {
      //   return {
      //     ...state,
      //     productsRender: filteredProductsUnique,
      //     filteredBy: search,
      //   };
      // } else {
      //   return {
      //     ...state,
      //     productsRender: ["No Products Found"],
      //   };
      // }

    case GET_PRODUCTS_BY_CATEGORY:
      let category = action.payload;
      let filterByCategory = state.products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      return {
        ...state,
        productsRender: filterByCategory,
        filteredBy: category,
      };

    case GET_PRODUCT_BY_ID:
      return { ...state, DetailProduct: { ...action.payload } };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case CLEAN_DETAILS:
      return {
        ...state,
        DetailProduct: [],
      };

    case GET_PRODUCTS_BY_MIN_MAX:
      let min = action.payload.min;
      let max = action.payload.max;
      let filteredby = state.filteredBy;
      if (filteredby === "") {
        let filteredByPrice = state.products.filter(
          (product) => product.price >= min && product.price <= max
        );
        if (filteredByPrice.length > 0) {
          return {
            ...state,
            productsRender: filteredByPrice,
          };
        } else {
          return {
            ...state,
            productsRender: ["No Products Found"],
          };
        }
      } else {
        let filteredByPrice = state.products.filter(
          (product) =>
            product.price >= min &&
            product.price <= max &&
            product.category.toLowerCase().includes(filteredby?.toLowerCase())
        );
        if (filteredByPrice.length > 0) {
          return {
            ...state,
            productsRender: filteredByPrice,
          };
        } else {
          return {
            ...state,
            productsRender: ["No Products Found"],
          };
        }
      }

    case "GET_PRODUCT_BY_ORDER":
      let order = action.payload;
      if (order === "asc") {
        return {
          ...state,
          productsRender: state.productsRender.sort(
            (a, b) => a.price - b.price
          ),
        };
      } else {
        return {
          ...state,
          productsRender: state.productsRender.sort(
            (a, b) => b.price - a.price
          ),
        };
      }
      
      case GET_USER:
      return {
        ...state,
        userData: action.payload,
      };

      case "GET_QUANTITY":
            const data = action.payload
            const productsQuant = state.cart.products_id
            let quantity = 0
            !data?
                quantity = productsQuant?.length || 0
            :   quantity = data.quantity
            return {
                ...state,
                quantityFromCart: quantity
            }

      case "GET_CART":
        let LocalCart0 = action.payload
        if(LocalCart0) {
            return {
                ...state,
                cart: action.payload
            }
        } else {
            return {
                ...state,
            }
        }

    case "ADD_PRODUCT":
      return {
        ...state,
        cart: action.payload,
      };

    case "ADDPRODUCT_LOCALCART":
      let localCart = state.cart;
      const productsLocal = localCart.products_id
      const products = action.payload.products_id
      productsLocal
          ? products.forEach(product => {
              let found = productsLocal.find(p => p.product_id._id === product.product_id._id)
              console.log("coincidencias: ", found)
              if (!found) {
                  localCart.products_id.push(product)
              }
          })
          : localCart = action.payload
      return {
          ...state,
          cart: localCart,
          quantityFromCart: localCart.products_id.length
      }

    case "REMOVEQUANTITY_LOCALCART":
      let localCartb = state.cart;
      const productsLocalb = localCartb.products_id;
      const product = action.payload.product_id;
      let index = productsLocalb.indexof(product);
      const found = productsLocal.find((p) => p.product_id === product);
      found.quantity > 1
        ? (localCartb.products_id[index].quantity = found.quantity - 1)
        : (localCartb.products_id = productsLocalb.filter(
            (p) => p.product_id !== product
          ));
      return {
        ...state,
        cart: localCartb,
      };

    case "REMOVEPRODUCT_LOCALCART":
      let localCartc = state.cart;
      const productsLocalc = localCartc.products_id
      const productc = action.payload.product_id
      localCartc.products_id = productsLocalc.filter(p => p.product_id._id !== productc)
      return {
          ...state,
          cart: localCartc,
          quantityFromCart: localCartc.products_id?.length
      }

    case "REMOVE_CART":
      return {
          ...state,
          cart: action.payload,
          quantityFromCart: 0
      }


    case GET_ALL_PRODUCTS_BY_ID:
      return {
        ...state,
        buyproducts: [...action.payload],
      };

    case IS_ADMIN:
      if (action.payload.isAdmin === true) {
        return {
          ...state,
          isAdmin: [true],
        };
      } else {
        return {
          ...state,
          isAdmin: [false],
        };
      }

    case "ADD_FAVORITE":
      return {
        ...state,
        userFavorites: action.payload,
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        userFavorites: action.payload,
      };
    case "GET_FAVORITES":
      const favorites = action.payload;
      return {
        ...state,
        userFavorites: favorites,
      };

    case SHOW_PRODUCTS:
      return {
        ...state,
        abouttobuyproducts: action.payload,
      };

    case "POST_USER":
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
