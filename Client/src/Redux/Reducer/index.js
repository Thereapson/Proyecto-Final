import { GET_PRODUCTS, GET_PRODUCTS_BY_SEARCH } from '../Actions/Actions';
const initialState = {
    products: [],
    filteredProducts: [],
};

// {
//     id: 8,
//     name: "Intel Core i9 10900",
//     price: 500,
//     image: "https://www.enfasys.net/wp-content/uploads/2021/10/Intel-Overcluster.jpg",
//     category: "cpu",
//     brand: "intel",
// }

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_PRODUCTS_BY_SEARCH:
            const search = action.payload.toLowerCase();
            console.log(' search: ', search);
            return {
                ...state,
                filteredProducts: state.products.filter((product) => {
                    return product.name.toLowerCase().includes(search);
                }) ? state.products.filter((product) => {
                    return product.name.toLowerCase().includes(search);
                }) : state.products.filter((product) => {
                    return product.brand.toLowerCase().includes(search);
                }),
            };
        default:
            return { ...state };
    }
};

export default rootReducer;