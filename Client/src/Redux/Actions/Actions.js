import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
export const GET_PRODUCTS_BY_SEARCH = "GET_PRODUCTS_BY_SEARCH";
export const SHORT_BY_PRICE = "SHORT_BY_PRICE";
export const GET_PRODUCT_BY_ID = "GER_PRODUCT_BY_ID";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const CLEAN_DETAILS = "CLEAN _DETAILS";
export const GET_PRODUCTS_BY_MIN_MAX = "GET_PRODUCTS_BY_MIN_MAX";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const GET_CART = "GET_CART";
export const GET_ALL_PRODUCTS_BY_ID = "GET_ALL_PRODUCTS_BY_ID";
export const IS_ADMIN = "IS_ADMIN";
export const GET_USER = "GET_USER";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const SHOW_PRODUCTS = "SHOW_PRODUCTS";
export const GET_REVIEW = 'GET_REVIEW';

export const getProducts = () => {
    return async (dispatch) => {
        const response = await axios.get("/products");
        const products = response.data?.filter(p => p.status !== false)
        return dispatch({
            type: GET_PRODUCTS,
            payload: products,
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
    await axios.get(`/products/detail/${id}`).then((response) => {
      let respuesta = response.data;
      dispatch({ type: GET_PRODUCT_BY_ID, payload: respuesta });
    });
  };
};

export const getCategories = () => {
    return async (dispatch) => {
        const response = await axios.get("/categorys");
        return dispatch({
            type: GET_CATEGORIES,
            payload: response.data,
        });
    };
};

export const cleanDetails = () => {
  return {
    type: CLEAN_DETAILS,
  };
};

export const getProductsByMinMax = (min, max) => {
  return {
    type: GET_PRODUCTS_BY_MIN_MAX,
    payload: { min, max },
  };
};

// add product to cart, if the product is already in the cart, increase the quantity by +1
export const addProduct = (data) => {
    return async (dispatch) => {
        if(data.user_id) {
          console.log("Estoy agregando productos: ", data)
          await axios.post("/shoppingCarts/addProductToShoppingCart", data)
              .then((response) => {
                  console.log(response.data)
                  dispatch({ type: "ADD_PRODUCT", payload: response.data })
              })
          let id = window.localStorage.getItem("id")
          await axios.get(`/shoppingCarts/quantity/${id}`)
              .then((response) => {
                  console.log("response.data: ", response.data)
                  dispatch({ type: "GET_QUANTITY", payload: response.data })
              })
        }else {
          const product_id = data.products_id[0].product_id
          const product = await axios.get(`/products//detail/${product_id}`)
          const localCart = {
              user_id: "LocalCart",
              products_id: [{
                  product_id: product.data,
                  quantity: data.products_id[0].quantity
              }]
          }
          dispatch({
              type: "ADDPRODUCT_LOCALCART",
              payload: localCart
          })
      }
    }
  };

// get cart by user
export const getCart = (id) => {
    return async (dispatch) => {
        if(id) {
            await axios.get(`/shoppingCarts/detail/${id}`)
                .then((response) => {
                    console.log("response.data: ", response.data)
                    dispatch({ type: "GET_CART", payload: response.data })
                })
        } else {
            dispatch({
                type: "GET_CART"
            })
        }
    };
}

// delete 1 quantity of product from cart
export const removeQuantity = (data) => {
    return async (dispatch) => {
        if(data.user_id) {
            console.log(data)
            await axios.post("/shoppingCarts/addProductToShoppingCart", data)
            .then((response) => {
                    console.log(response.data)
                    dispatch({ type: "REMOVE_QUANTITY", payload: response.data })
                })
        } else {
            const localCart = {
                user_id: "LocalCart",
                product_id: data.product_id,
            }
            dispatch({
                type: "REMOVEQUANTITY_LOCALCART",
                payload: localCart
            })
        }
    };
}


// delete product from cart
export const removeProduct = (data) => {
    return async (dispatch) => {
        if(data.user_id) {
            await axios.post("/shoppingCarts/deleteProductFromShoppingCartAndDeleteShoppingCart", data)
                .then((response) => {
                    console.log(response.data)
                    dispatch({ type: "REMOVE_PRODUCT", payload: response.data })
                })
            let id = window.localStorage.getItem("id")
            await axios.get(`/shoppingCarts/quantity/${id}`)
                .then((response) => {
                    console.log("response.data: ", response.data)
                    dispatch({ type: "GET_QUANTITY", payload: response.data })
                })
        } else {
            const localCart = {
                user_id: "LocalCart",
                product_id: data.product_id,
            }
            dispatch({
                type: "REMOVEPRODUCT_LOCALCART",
                payload: localCart
            })
        }
    };
}

// delete cart
export const removeCart = (id) => {
    return async (dispatch) => {
        if(id) {
            await axios.delete(`/shoppingCarts/deleteShoppingCart/${id}`)
                .then((response) => {
                    dispatch({ type: "REMOVE_CART", payload: [] })
                })
            let quantity = { quantity: 0 }
            dispatch({ type: "GET_QUANTITY", payload: quantity })
            await axios.get(`/shoppingCarts/quantity/${id}`)
                .then((response) => {
                    console.log("response.data: ", response.data)
                    dispatch({ type: "GET_QUANTITY", payload: response.data })
                })
        }
        dispatch({ type: "REMOVE_CART", payload: [] })
    };
}

// get quantity of products in cart
export const getQuantity = (id) => {
    return async (dispatch) => {
        if(id) {
            await axios.get(`/shoppingCarts/quantity/${id}`)
            .then((response) => {
                dispatch({ type: "GET_QUANTITY", payload: response.data })
                })
        } else {
            dispatch({ type: "GET_QUANTITY" })
        }
    };
}

// get favorites
export const getFavorites = (id) => {
    return async (dispatch) => {
        if(id) {
            await axios.get(`/users/favorites/${id}`)
                .then((response) => {
                    dispatch({ type: "GET_FAVORITES", payload: response.data })
                })
        }
    };
}


// add favorite
export const addFavorite = (data) => {
    return async (dispatch) => {
        if(data) {
            await axios.post("/users/favorites", data)
                .then((response) => {
                    dispatch({ type: "ADD_FAVORITE", payload: response.data })
                })
        }
    };
}

// remove favorite
export const removeFavorite = (body) => {
  return async (dispatch) => {
    await axios.post("/users/favorites/delete", body).then((response) => {
      dispatch({ type: "REMOVE_FAVORITE", payload: response.data });
    });
  };
};

// get user
export const getUser = (email) => {
  return async (dispatch) => {
    await axios.get(`/users/email/${email}`).then((response) => {
      dispatch({ type: GET_USER, payload: response.data });
    });
  };
};

export const buyAllProducts = (array) => {
  return async (dispatch) => {
    let arreglofixed = [];
    let arreglo = [];
    array.forEach((element) => {
      if (element != "") {
        arreglofixed.push(element);
      }
    });

    for (let i = 0; i < arreglofixed.length; i++) {
      await axios
        .get(`/products/detail/${arreglofixed[i]}`)
        .then((response) => {
          let respuesta = response.data;
          arreglo.push(respuesta);
        });
    }

    dispatch({ type: GET_ALL_PRODUCTS_BY_ID, payload: arreglo });
  };
};

export const isAdmin = (email) => {
    return async (dispatch) => {
        if(email) {
            let admin = await axios.get(`/users/isadmin/${email}`)
            dispatch({ type: IS_ADMIN, payload: admin.data })
        }
    }
}

export const verifyPurchase = (verifyData) => {
  return async (dispatch) => {
    if(verifyData) {
      let isVerify = await axios.post(`/purchases/verify`, verifyData)
      dispatch({
        type: "PURCHASE_VERIFIED",
        payload: isVerify.data
      })
      return isVerify.data
    }
  }
}

export const showBuyProduct = (array) => {
  return async (dispatch) => {
    let arreglofixed = [];
    let arreglofinal = [];
    array.forEach((element) => {
      if (element != "") {
        arreglofixed.push(element);
      }
    });
    let dataArr = [...new Set(arreglofixed)];

    for (let i = 0; i < dataArr.length; i++) {
      await axios.get(`/products/detail/${dataArr[i]}`).then((response) => {
        console.log("resultado de la busqueda filtrada: ", response);
        let respuesta = response.data;
        arreglofinal.push(respuesta);
      });
    }

    dispatch({ type: SHOW_PRODUCTS, payload: arreglofinal });
  };
};

export const postUser = (payload) => {
  return async () => {
    try {
      let json = await axios.post("/users/register", payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

//get review id
export const getReview = (id_producto) => {
  return async (dispatch) => {
    try {
      const review = await axios.get(`/reviews?product=${id_producto}`);
      dispatch({
        type: GET_REVIEW,
        payload: review.data,
      });
    } catch (err) {
      console.log({ error: err.message });
    }
  };
};
