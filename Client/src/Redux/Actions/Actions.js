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
    {
        id: '635d7a041ef1553a2b641e29',
        name: 'Vengeance RGB DDR4 3466 C16 2x8GB',
        href: '/products/635d7a041ef1553a2b641e29',
        color: 'none',
        price: '117',
        quantity: 2,
        imageSrc: "https://s3-sa-east-1.amazonaws.com/saasargentina/f939foKj3jFJzkn9zrjm/imagen",
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: '635d7a761ef1553a2b641e41',
        name: 'Gigabyte RTX 2080 8GB Gaming OC',
        href: '/products/635d7a761ef1553a2b641e41',
        color: 'none',
        price: '907',
        quantity: 1,
        imageSrc: 'https://pcgamercatamarca.com.ar/wp-content/uploads/2022/04/gigabyte-1660-oc-6g-scaled.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
];



export const getCart = () => {
    return async function (dispatch) {
        try {
            // test with fakeCart
            let json = fakeCart //await axios.get(`http://localhost:3001/cart`)
            return dispatch({
                type: GET_CART,
                payload: json
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
