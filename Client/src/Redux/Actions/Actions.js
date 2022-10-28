import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_SEARCH = "GET_PRODUCTS_BY_SEARCH";

const apiFake = [
    {
        id: 1,
        name: "AMD Ryzen 5 3600",
        price: 200,
        image: "https://www.amd.com/system/files/2018-11/10788-ryzen-chip-left-angle-960x548.png",
        category: "cpu",
        brand: "amd",
    },
    {
        id: 2,
        name: "AMD Ryzen 5 5600X",
        price: 300,
        image: "https://www.amd.com/system/files/2018-11/10788-ryzen-chip-left-angle-960x548.png",
        category: "cpu",
        brand: "amd",
    },
    {
        id: 3,
        name: "AMD Ryzen 7 5800X",
        price: 400,
        image: "https://www.amd.com/system/files/2018-11/10788-ryzen-chip-left-angle-960x548.png",
        category: "cpu",
        brand: "amd",
    },
    {
        id: 4,
        name: "AMD Ryzen 9 5900X",
        price: 500,
        image: "https://www.amd.com/system/files/2018-11/10788-ryzen-chip-left-angle-960x548.png",
        category: "cpu",
        brand: "amd",
    },
    {
        id: 5,
        name: "Intel Core i3 10100",
        price: 200,
        image: "https://www.enfasys.net/wp-content/uploads/2021/10/Intel-Overcluster.jpg",
        category: "cpu",
        brand: "intel",
    },
    {
        id: 6,
        name: "Intel Core i5 10400",
        price: 300,
        image: "https://www.enfasys.net/wp-content/uploads/2021/10/Intel-Overcluster.jpg",
        category: "cpu",
        brand: "intel",
    },
    {
        id: 7,
        name: "Intel Core i7 10700",
        price: 400,
        image: "https://www.enfasys.net/wp-content/uploads/2021/10/Intel-Overcluster.jpg",
        category: "cpu",
        brand: "intel",
    },
    {
        id: 8,
        name: "Intel Core i9 10900",
        price: 500,
        image: "https://www.enfasys.net/wp-content/uploads/2021/10/Intel-Overcluster.jpg",
        category: "cpu",
        brand: "intel",
    },
    {
        id: 9,
        name: "AMD Radeon RX 5500 XT",
        price: 200,
        image: "https://http2.mlstatic.com/D_NQ_NP_614255-MLA42737554766_072020-O.webp",
        category: "gpu",
    }
];

export const getProducts = () => {
    return async (dispatch) => {
        const response = apiFake;
        return dispatch({
            type: GET_PRODUCTS,
            payload: response,
        });
    };
};

export const getProductsBySearch = (search) => {
    return {
        type: GET_PRODUCTS_BY_SEARCH,
        payload: search,
    };
};