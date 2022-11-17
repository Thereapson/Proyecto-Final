import axios from "axios";
import { getReview } from "../Redux/Actions/Actions";
import store from "../Redux/Store";

// const BACK_URL = 'http://localhost:3001'
const BACK_URL = 'https://compudevs.herokuapp.com/'
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
      const newReview = await axios.post(`${BACK_URL}/reviews/add`, {
        user: user,
        product: id,
        review: description,
        score: score,
      });
      let review = store.dispatch(getReview(id));
      review.push(newReview)
      window.location.reload()
      return review 

    } catch (err) {
      console.log(err);
    }
  };
  