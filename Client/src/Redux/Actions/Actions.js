import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const GET_PRODUCTS_BY_SEARCH = "GET_PRODUCTS_BY_SEARCH";
export const SHORT_BY_PRICE = "SHORT_BY_PRICE";
export const GET_PRODUCT_BY_ID = "GER_PRODUCT_BY_ID";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const CLEAN_DETAILS = "CLEAN _DETAILS"
export const GET_PRODUCTS_BY_MIN_MAX = "GET_PRODUCTS_BY_MIN_MAX";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_CART = "GET_CART";
export const GET_ALL_PRODUCTS_BY_ID = "GET_ALL_PRODUCTS_BY_ID";
export const IS_ADMIN = "IS_ADMIN";

export const GET_USER = "GET_USER";


export const getProducts = () => {
    return async (dispatch) => {
        const response = await axios.get("/products");
        console.log("response: ", response);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data,
        });
    };
};

export const getProductsByCategory = (category) => {
    return {
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: category,
    };
};

export const getProductsBySearch = (search) => {
    return {
        type: GET_PRODUCTS_BY_SEARCH,
        payload: search,
    };
};

export const shortOrderFilter = (order) => {
    return {
        type: SHORT_BY_PRICE,
        payload: order,
    };
};

export const getProductById = (id) => {
    return async (dispatch) => {
        await axios.get(`/products/detail/${id}`)
            .then((response) => {
                let respuesta = response.data
                dispatch({ type: GET_PRODUCT_BY_ID, payload: respuesta })
            })
    }

};

export const getCategories = () => {
    console.log("pasé actions")
    return async (dispatch) => {
        const response = await axios.get("/categorys");
        console.log("response: ", response);
        return dispatch({
            type: GET_CATEGORIES,
            payload: response.data,
        });
    };
};



export const cleanDetails = () => {
    return {
        type: CLEAN_DETAILS
    };
};

export const getProductsByMinMax = (min, max) => {
    return {
        type: GET_PRODUCTS_BY_MIN_MAX,
        payload: { min, max }
    };
};

// add product to cart, if the product is already in the cart, increase the quantity by +1
export const addProduct = (data) => {
    console.log("Desde la action: ", data)
    return async (dispatch) => {
        await axios.post("/shoppingCarts/addProductToShoppingCart", data)
            .then((response) => {
                console.log(response.data)
                dispatch({ type: "ADD_PRODUCT", payload: response.data })
            })
    };
}

// get cart by user
export const getCart = (id) => {
    return async (dispatch) => {
        await axios.get(`/shoppingCarts/detail/${id}`)
            .then((response) => {
                console.log("response.data: ", response.data)
                dispatch({ type: "GET_CART", payload: response.data })
                window.localStorage.setItem("userID", response.data.user)
            })
    };
}

// delete 1 quantity of product from cart
export const removeQuantity = (data) => {
    console.log("Desde la action: ", data)
    return async (dispatch) => {
        await axios.post("/shoppingCarts/deleteProductFromShoppingCart", data)
            .then((response) => {
                console.log(response.data)
                dispatch({ type: "REMOVE_QUANTITY", payload: response.data })
            })
    };
}

// delete product from cart
export const removeProduct = (data) => {
    console.log("desde la action: ", data)
    return async (dispatch) => {
        await axios.post("/shoppingCarts/deleteProductFromShoppingCartAndDeleteShoppingCart", data)
            .then((response) => {
                console.log(response.data)
                dispatch({ type: "REMOVE_PRODUCT", payload: response.data })
            })
    };
}

// delete cart
export const removeCart = (id) => {
    return async (dispatch) => {
        await axios.delete(`/shoppingCarts/deleteShoppingCart/${id}`)
            .then((response) => {
                console.log(response.data)
                dispatch({ type: "REMOVE_CART", payload: [] })
            })
    };
}

// get user
export const getUser = (email) => {
    return async (dispatch) => {
        await axios.get(`/users/email/${email}`)
            .then((response) => {
                console.log("user: ", response.data)
                dispatch({ type: GET_USER, payload: response.data })
            })
    };
};
export const buyAllProducts = (array) => {
    return async (dispatch) => {
        let arreglo = [];
        for (let i = 0; i < array.length; i++) {
            await axios.get(`/products/detail/${array[i]}`)
                .then((response) => {
                    let respuesta = response.data
                    arreglo.push(respuesta)
                })

        }

        dispatch({ type: GET_ALL_PRODUCTS_BY_ID, payload: arreglo })
    }
}

export const isAdmin = (email) => {
    console.log("valida si es admin")
    return async (dispatch) => { 
                let admin = await axios.get(`/users/isadmin/${email}`)
        dispatch({ type: IS_ADMIN, payload: admin.data })
    }
}

