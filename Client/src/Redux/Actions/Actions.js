import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const GET_PRODUCTS_BY_SEARCH = "GET_PRODUCTS_BY_SEARCH";
export const SHORT_BY_PRICE = "SHORT_BY_PRICE";
export const GET_PRODUCT_BY_ID = "GER_PRODUCT_BY_ID";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_CATEGORIES = "GET_CATEGORIES";


const apiFake = [
    {
        id: "635ad2a356d5ff1c0esadsad93e083",
        sku: "sku-test12345",
        name: "i7 10700k",
        brand: "Intel",
        price: 200,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/CPU019.jpg",
        category: "CPU",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    },
    {
        id: "635a93e083",
        sku: "sku-test1234DS5",
        name: "i3 10100",
        brand: "Intel",
        price: 100,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/CPU014.jpg",
        category: "CPU",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    },
    {
        id: "635a9sdds3e083",
        sku: "sku-test123sd4DS5",
        name: "ryzen 5 3600",
        brand: "AMD",
        price: 150,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/CPU061.jpg",
        category: "CPU",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    },
    {
        id: "635a9sdds3e083ddsad34",
        sku: "sku-test123sd4DsdS5",
        name: "rtx 2060",
        brand: "Nvidia",
        price: 300,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/RTX183.jpg",
        category: "GPU",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    },
    {
        // hdd
        id: "635a9sdds3e083ddsad34",
        sku: "sku-test123sd4DsdS5",
        name: "hard disk 1tb",
        brand: "Seagate",
        price: 100,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/DIS017.jpg",
        category: "HDD",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    },
    {
        // ssd
        id: "635a9sdds3e083ddsad34",
        sku: "sku-test123sd4DsdS5",
        name: "ssd 1tb",
        brand: "Samsung",
        price: 200,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/DIS465.jpg",
        category: "SSD",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    },
    {
        // ram
        id: "635a9sdds3e083ddsad34",
        sku: "sku-test123sd4DsdS5",
        name: "ram 16gb",
        brand: "Kingston",
        price: 100,
        weight: 1,
        description: "Producto de prueba",
        image: "https://katech.com.ar/wp-content/uploads/MEM424.jpg",
        category: "RAM",
        createDate: "2021-03-01T00:00:00.000Z",
        stock: 10,
    }

];


export const getProducts = () => {
    return async (dispatch) => {
        const response = apiFake;
        console.log("response: ", response);
        return dispatch({
            type: GET_PRODUCTS,
            payload: response,
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

export const getProductById =(id)=>{
    return async (dispatch)=>{
        await axios.get(`http://localhost:3001/products/detail/${id}`)
        .then((response)=>{
            let respuesta = response.data.product
            dispatch({type:GET_PRODUCT_BY_ID, payload:respuesta})
        })
    }

};

export const addProduct = (part) => {
    return async function (dispatch) {
        try {
            let json = await axios.post(`http://localhost:3001/products/add`, part)
            return dispatch({
                type: ADD_PRODUCT,
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: ADD_PRODUCT,
                payload: error
            })
        } 
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
