import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const GET_PRODUCTS_BY_SEARCH = "GET_PRODUCTS_BY_SEARCH";
export const SHORT_BY_PRICE = "SHORT_BY_PRICE";
export const GET_PRODUCT_BY_ID = "GER_PRODUCT_BY_ID";
export const GET_CATEGORIES = "GET_CATEGORIES";



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

export const shortByPrice = (short) => {
    return {
        type: SHORT_BY_PRICE,
        payload: short,
    };
};

export const getProductById = (id) => {
    return async (dispatch) => {
        await axios.get(`http://localhost:3001/products/detail/${id}`)
            .then((response) => {
                let respuesta = response.data.product
                dispatch({ type: GET_PRODUCT_BY_ID, payload: respuesta })
            })
    }

}

export const getCategories = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/categorys");
        console.log("response: ", response);
        return dispatch({
            type: GET_CATEGORIES,
            payload: response.data,
        });
    };
};