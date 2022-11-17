import axios from "axios";
import { getReview } from "../Redux/Actions/Actions";
import store from "../Redux/Store";

const BACK_URL = 'http://localhost:3001'
// export const addReview = async (product, review, score, user) => {
//   console.log('controllerrr', product, review, score, user)
//     try {
//       await axios.post(`/reviews/add`, {
//         product: product,
//         review: review,
//         score: score,
//         user: user
//       });
//       store.dispatch(getReview(product));
//     } catch (err) {
//       console.log(err);
//     }
//   };


  export const addReview = async (user, id, description, score) => {
    try {
      console.log('pase por aca', description)
      await axios.post(`${BACK_URL}/reviews/add`, {
        user: user,
        product: id,
        review: description,
        score: score,
      });
      store.dispatch(getReview(id));
    } catch (err) {
      console.log(err);
    }
  };
  