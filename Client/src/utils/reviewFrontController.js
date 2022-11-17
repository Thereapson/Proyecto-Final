import axios from "axios";
import { getReview } from "../Redux/Actions/Actions";
import store from "../Redux/Store";


export const addReview = async (full_name, id, review, score) => {
    try {
      await axios.post(`http://localhost:3000/reviews/add`, {
        user_id: full_name,
        product_id: id,
        review: review,
        score: score,
      });
      store.dispatch(getReview(id));
    } catch (err) {
      console.log(err);
    }
  };