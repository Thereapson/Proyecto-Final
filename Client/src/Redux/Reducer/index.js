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
} from '../Actions/Actions';

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
    buyproducts: []

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

        case GET_USER:
            return {
                ...state,
                userData: action.payload
            }

        case "ADD_PRODUCT":
            console.log("action.payload: ", action.payload);

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


        case "REMOVE_CART":
            return {
                ...state,
                cart: action.payload
            }

        case "ADDPRODUCT_LOCALCART":
            console.log(action.payload)
            let localCart = state.cart;
            const productsLocal = localCart.products_id
            const products = action.payload.products_id
            productsLocal
            ? products.forEach(product => {
                let found = productsLocal.find(p => p.product_id === product.product_id)
                if(found) {
                    let updateQuantity = found.quantity + product.quantity
                    let index = productsLocal.indexof(found)
                    localCart.products_id[index].quantity = updateQuantity
                } else {
                    localCart.products_id.push(product)
                }
            }) 
            : localCart = action.payload
            return {
                ...state,
                cart: localCart
            }

        case "REMOVEQUANTITY_LOCALCART":
            let localCartb = state.cart;
            const productsLocalb = localCartb.products_id
            const product = action.payload.product_id
            let index = productsLocalb.indexof(product)
            const found = productsLocal.find(p => p.product_id === product)
            found.quantity > 1
            ? localCartb.products_id[index].quantity = found.quantity - 1
            : localCartb.products_id = productsLocalb.filter(p => p.product_id !== product)
            return {
                ...state,
                cart: localCartb
            }

        case "REMOVEPRODUCT_LOCALCART":
            let localCartc = state.cart;
            const productsLocalc = localCartc.products_id
            const productc = action.payload.product_id
            localCartc.products_id = productsLocalc.filter(p => p.product_id !== productc)
            return {
                ...state,
                cart: localCartc
            }

        case GET_ALL_PRODUCTS_BY_ID:
            return {
                ...state, buyproducts: [...action.payload]
            }

        case IS_ADMIN:
            if (action.payload.isAdmin === true) {
                return {
                    ...state, isAdmin: [true]
            }} else {
                return {
                    ...state, isAdmin: [false]
            }}


        default:
            return { ...state };
    }
};

export default rootReducer;