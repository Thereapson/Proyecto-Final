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
    GET_ALL_PRODUCTS_BY_ID
} from '../Actions/Actions';

const initialState = {
    products: [],
    productsRender: [],
    DetailProduct: [],
    categories: [],
    lastAdd: {},
    cart: [],
    userData: {},
    buyproducts: [],
    filteredBy: ""

};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsRender: action.payload
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

        case GET_PRODUCTS_BY_CATEGORY:
            let category = action.payload;
            let filterByCategory = state.products.filter((product) => product.category.toLowerCase().includes(category.toLowerCase()));
            return {
                ...state,
                productsRender: filterByCategory,
                filteredBy: category
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
            let productToAdd = action.payload;
            let productInCart = state.cart.find((product) => product.id == productToAdd.id);
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
            let filteredby = state.filteredBy;
            if (filteredby === "") {
                let filteredByPrice = state.products.filter((product) => product.price >= min && product.price <= max);
                if (filteredByPrice.length > 0) {
                    return {
                        ...state,
                        productsRender: filteredByPrice
                    };
                } else {
                    return {
                        ...state,
                        productsRender: ["No Products Found"],
                    };
                }
            } else {
                let filteredByPrice = state.products.filter((product) => product.price >= min && product.price <= max && product.category.toLowerCase().includes(filteredby.toLowerCase()));
                if (filteredByPrice.length > 0) {
                    return {
                        ...state,
                        productsRender: filteredByPrice
                    };
                }
                else {
                    return {
                        ...state,
                        productsRender: ["No Products Found"],
                    };
                }
            }

        case 'GET_PRODUCT_BY_ORDER':
            let order = action.payload;

            console.log('order', order)

            if (order === "asc") {
                return {
                    ...state,
                    productsRender: state.productsRender.sort((a, b) => a.price - b.price)
                };
            } else {
                return {
                    ...state,
                    productsRender: state.productsRender.sort((a, b) => b.price - a.price)
                };
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

        case GET_ALL_PRODUCTS_BY_ID:
            return {
                ...state, buyproducts: [...action.payload]
            }


        default:
            return { ...state };
    }
};

export default rootReducer;