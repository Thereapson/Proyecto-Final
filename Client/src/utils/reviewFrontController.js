import axios from "axios";
import { getReview } from "../Redux/Actions/Actions";
import store from "../Redux/Store";


export const addReview = async (product, review, score, user) => {
  console.log('controllerrr', product, review, score, user)
    try {
      await axios.post(`/reviews/add`, {
        product: product,
        review: review,
        score: score,
        user: user
      });
      store.dispatch(getReview(product));
    } catch (err) {
      console.log(err);
    }
  };