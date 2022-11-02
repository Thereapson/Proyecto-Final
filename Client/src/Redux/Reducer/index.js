import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_SEARCH, GET_CATEGORIES, ADD_PRODUCT, CLEAN_DETAILS, GET_PRODUCTS_BY_MIN_MAX, GET_CART, REMOVE_FROM_CART } from '../Actions/Actions';
const initialState = {
    products: [],
    filteredProducts: [],
    productsRender: [],
    DetailProduct: [],
    categories: [],
    lastAdd: {},
    cart: [
    ],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_PRODUCTS_BY_SEARCH:
            let search = action.payload;
            console.log("search: ", search);
            let filteredByName = state.products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()));
            let filteredByBrand = state.products.filter((product) => product.brand?.toLowerCase().includes(search.toLowerCase()));
            let filteredByCategory = state.products.filter((product) => product.category?.toLowerCase().includes(search.toLowerCase()));

            let filteredProducts = [...filteredByName, ...filteredByCategory, ...filteredByBrand];
            if (filteredProducts.length > 0) {
                return {
                    ...state,
                    productsRender: filteredProducts,
                };
            } else {
                return {
                    ...state,
                    productsRender: ["No Products Found"],
                };
            }

        case GET_PRODUCTS_BY_CATEGORY:
            let category = action.payload;
            console.log("category: ", category);
            let filterByCategory = state.products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()));
            return {
                ...state,
                productsRender: filterByCategory,
            };

        case GET_PRODUCT_BY_ID:
            return { ...state, DetailProduct: { ...action.payload } }

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case REMOVE_FROM_CART:
            let productToRemove = action.payload;
            let productInCartToRemove = state.cart.find((product) => product.id === productToRemove.id);
            if (productInCartToRemove.quantity > 1) {
                return {
                    ...state,
                    cart: state.cart.map((product) => (product.id === productToRemove.id ? { ...product, quantity: product.quantity - 1 } : product)),
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.filter((product) => product.id !== productToRemove.id),
                };
            }
        case ADD_PRODUCT:
            // from action
            // return {
            //     type: ADD_PRODUCT,
            //     payload: products,
            // };
            let productToAdd = action.payload;
            console.log("productToAdd: ", productToAdd);
            let productInCart = state.cart.find((product) => product.id === productToAdd.id);
            if (productInCart) {
                return {
                    ...state,
                    cart: state.cart.map((product) => (product.id === productToAdd.id ? { ...product, quantity: product.quantity + 1 } : product)),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...productToAdd, quantity: 1 }],
                };
            }
        case CLEAN_DETAILS:
            return {
                ...state,
                DetailProduct: []
            }

        case GET_PRODUCTS_BY_MIN_MAX:
            let min = action.payload.min;
            let max = action.payload.max;
            if (state.productsRender.length > 0) {
                return {
                    ...state,
                    productsRender: state.productsRender.filter((product) => product.price >= min && product.price <= max)
                }
            } else {
                return {
                    ...state,
                    products: state.products.filter((product) => product.price >= min && product.price <= max)
                }
            }

        case GET_CART:
            let carted = action.payload;
            return {
                ...state,
                cart: carted
            }

        default:
            return { ...state };
    }
};

export default rootReducer;