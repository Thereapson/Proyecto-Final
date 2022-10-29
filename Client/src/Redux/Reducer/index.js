import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY,GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_SEARCH, SHORT_BY_PRICE } from '../Actions/Actions';
const initialState = {
    products: [],
    filteredProducts: [],
    productsRender: [],
    DetailProduct:[]
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
            let filteredByName = state.products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
            let filteredByBrand = state.products.filter((product) => product.brand.toLowerCase().includes(search.toLowerCase()));
            let filteredByCategory = state.products.filter((product) => product.category.toLowerCase().includes(search.toLowerCase()));

            let filteredProducts = [...filteredByName, ...filteredByBrand, ...filteredByCategory];
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

        case SHORT_BY_PRICE:
            let short = action.payload;
            console.log("short: ", short);
            let shortByPrice = state.products.sort((a, b) => {
                if (short === "lowest") {
                    return a.price - b.price;
                } else if (short === "highest") {
                    return b.price - a.price;
                }
            });
            return {
                ...state,
                productsRender: shortByPrice,
            };

        case GET_PRODUCT_BY_ID:
            return{...state, DetailProduct:{...action.payload}}

        default:
            return { ...state };
    }
};

export default rootReducer;