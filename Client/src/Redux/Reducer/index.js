import {
    GET_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS_BY_SEARCH,
    GET_CATEGORIES,
    CLEAN_DETAILS,
    GET_PRODUCTS_BY_MIN_MAX,
    GET_USER
} from '../Actions/Actions';
const initialState = {
    products: [],
    filteredProducts: [],
    productsRender: [],
    DetailProduct: [],
    categories: [],
    lastAdd: {},
    cart: [
    ],
    userData: {},
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

        case GET_USER:
            return {
                ...state,
                userData: action.payload
            }

        case "ADD_PRODUCT":
            console.log("action.payload: ", action.payload);

        case "GET_CART":
            console.log("GET_CART: ", action.payload)
            return {
                ...state,
                cart: action.payload
            }

        case "REMOVE_CART":
            return {
                ...state,
                cart: action.payload
            }

        default:
            return { ...state };
    }
};

export default rootReducer;