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




export const getProducts = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/products");
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
        await axios.get(`http://localhost:3001/products/detail/${id}`)
            .then((response) => {
                let respuesta = response.data
                dispatch({ type: GET_PRODUCT_BY_ID, payload: respuesta })
            })
    }

};

export const getCategories = () => {
    console.log("pasé actions")
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/categorys");
        console.log("response: ", response);
        return dispatch({
            type: GET_CATEGORIES,
            payload: response.data,
        });
    };
};

export const addProduct = (products) => {
    // return async (dispatch) => {
    //     await axios.post("http://localhost:3001/products", products)
    //         .then((response) => {
    //             let respuesta = response.data
    //             dispatch({ type: ADD_PRODUCT, payload: respuesta })
    //         })
    // };
    // test:
    return {
        type: ADD_PRODUCT,
        payload: products,
    };
}

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

let fakeCart = [

];



export const getCart = () => {
    return async function (dispatch) {
        try {
            // test with fakeCart
            let json = fakeCart //await axios.get("http://localhost:3001/shoppingCarts");
            return dispatch({
                type: GET_CART,
                payload: json,
            })
        } catch (error) {
            return dispatch({
                type: GET_CART,
                payload: error
            })
        }
    }
}

export const deleteProductToCart = (id) => {
    // return async function (dispatch) {
    //     try {
    //         let json = fakeCart //await axios.delete(`http://localhost:3001/cart/${id}`)
    //         return dispatch({
    //             type: REMOVE_FROM_CART,
    //             payload: json
    //         })
    //     } catch (error) {
    //         return dispatch({
    //             type: REMOVE_FROM_CART,
    //             payload: error
    //         })
    //     }
    // }

    // test:
    return {
        type: REMOVE_FROM_CART,
        payload: id
    };
};
export const buyAllProducts = (array) => {
    return async (dispatch) => {
        let arreglo = [];
        for (let i = 0; i < array.length; i++) {
            await axios.get(`http://localhost:3001/products/detail/${array[i]}`)
                .then((response) => {
                    let respuesta = response.data
                    arreglo.push(respuesta)
                })

        }

        dispatch({ type: GET_ALL_PRODUCTS_BY_ID, payload: arreglo })
    }
}

