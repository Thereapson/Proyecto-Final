import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../utils/reviewFrontController";
import { getReview } from "../../Redux/Actions/Actions";
// import FormReview from "./FormReview";
// import Modal from "react-modal";
// Modal.setAppElement("#root");

// import { Icon } from '@iconify/react';

const Reviews = ({ id }) => {
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [noUser, setNoUser] = React.useState(false);

  const [, setEdescription] = useState("");
  const [eStars, setEstars] = useState(0);
  const [active, setActive] = useState(false);
  const user_id = window.localStorage.getItem("id");
  const reviews = useSelector((state) => state.review);
  console.log('prueba', reviews)
  const userState = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReview(id));
  }, [dispatch, id]);

  const modifyStars = (star, edit) => {
    if (edit) return setEstars(star);
    setStars(star);
  };
  console.log("userstate", description);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      reviews.map((e) => userState.full_name === e.full_name).includes(true)
    ) {
      setNoUser(true);
      setStars(0);
      setDescription("");
    } else if (stars > 0 && description.length > 3) {
      addReview(user_id, id, description, stars);
      setStars(0);
      setDescription("");
    } else {
      console.log("No se Pudo Enviar El Formulario");
    }
    alert('se envio tu formulario')
  };
  // console.log(reviews.map((e) => e.full_name === userState.full_name).includes(true));

  //   const OnSubmit = (e) => {
  //     e.preventDefault();
  //     if (eStars > 0 && eDescription.length > 3) {
  //     //   updateReview(userState.full_name, id, eDescription, eStars);
  //       setEstars(0);
  //       setEdescription("");
  //       setActive(false);
  //     } else {
  //       console.log("No se Pudo Enviar El Formulario");
  //     }
  //   };
  //   const onEdit = (e) => {
  //     e.preventDefault();
  //     setNoUser(false);
  //     setActive(true);
  //   };

  const stars5 = [1, 2, 3, 4, 5];

  return (
    <div className="antialiased mx-auto max-w-screen-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Opiniones del producto
      </h3>
      <div className="space-y-4">
        {/* vision de el comentario del producto */}
        {reviews
          ? reviews.map((e, i) => (
              <div key={i} className="px-0">
                <div className="bg-white border-2 w-full rounded-2xl px-10 pb-5 shadow-lg transition duration-500">
                  <div className="mt-4">
                    <div className="flex flex-row justify-between">
                      <h1 className="text-lg text-gray-700 font-semibold ">
                        {e.full_name}
                      </h1>
                      {userState.full_name === e.full_name ? (
                        // <div className="dropdown relative mr-5 flex justify-end">
                        //   <a
                        //     className="dropdown-toggle flex items-center hidden-arrow"
                        //     href="#"
                        //     id="dropdownMenuButton2"
                        //     role="button"
                        //     data-bs-toggle="dropdown"
                        //     aria-expanded="false"
                        //   >
                        //     <svg
                        //       xmlns="http://www.w3.org/2000/svg"
                        //       className="w-5 h-5"
                        //       viewBox="0 0 20 20"
                        //       fill="currentColor"
                        //     >
                        //       <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        //     </svg>
                        //   </a>
                        //   {/* <ul
                        //     className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none left-auto right-0"
                        //     aria-labelledby="dropdownMenuButton2"
                        //   >
                        //     <li>
                        //       <a
                        //         onClick={() => setActive(true)}
                        //         className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                        //       >
                        //         Editar
                        //       </a>
                        //     </li>
                        //     <li>
                        //       <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                        //         Borrar
                        //       </a>
                        //     </li>
                        //   </ul> */}
                        // </div>
                        <></>
                      ) : user_id ? (
                        // <button
                        //   class="inline-flex items-center px-2 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                        //   onClick={async () => {
                        //     try {
                        //       await axios.put(`backurl/review/flagReview`, {
                        //         userName: e.full_name,
                        //         productId: e.productId,
                        //       });
                        //     } catch (err) {
                        //       console.log({ error: err.message });
                        //     }
                        //   }}
                        // >
                        //   {/* <Icon icon="ic:round-report" class="mr-1" color="#f3f4f7" width="20" height="20"/> */}
                        //   Denunciar
                        // </button>
                        <></>
                      ) : null}
                    </div>
                    <div className="flex ml-0 mt-2">
                      <div className="flex items-center">
                        {stars5.map((star) => {
                          return e.score >= star ? (
                            <svg
                              key={`reviewStar ${e.full_name} ${star}`}
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>First star</title>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ) : (
                            <svg
                              key={`reviewStar ${e.full_name} ${star}`}
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-300 dark:text-gray-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Fifth star</title>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          );
                        })}
                      </div>
                    </div>

                    <p className="mt-4 text-md text-gray-600">
                      {e.review}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}

        <script src="https://cdn.tailwindcss.com/"></script>

        {/* Editcion de el comentario del producto */}

        {active === true ? (
          <form>
            {/* <form onSubmit={OnSubmit}> */}
            <label className="flex flex-col-reverse relative focus group mb-4">
              <input
                onChange={(e) => setEdescription(e.target.value)}
                type="text"
                required
                className="border-b-2 border-t-0 border-l-0 border-r-0 z-10  focus:outline-none  focus:outline-none resize-none  w-full"
              />

              <span className="absolute text-xl transform -translate-y-3 left-4 transition leading-10 group-focus-within:-translate-y-16"></span>
              <div
                onClick={() => setActive(false)}
                className="flex justify-end cursor-pointer z-50"
              >
                <svg
                  className="fill-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </label>

            <div className="flex justify-between">
              <ul className="flex justify-center cursor-pointer">
                {stars5.map((star) => {
                  return (
                    <li
                      key={`eStars ${star}`}
                      onClick={() => modifyStars(star, true)}
                    >
                      {eStars >= star ? (
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                          ></path>
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
              <button
                type="submit"
                className="text-sm font-semibold  bg-[#4F46E5] w-fit text-white py-2 rounded px-3"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : null}

        {/* creacion de el comentario del producto */}

        {user_id ? (
          // <FormReview/>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Añade tu opinion..."
              className="p-2 focus:outline-1 focus:outline-gray-500 border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
            ></textarea>

            <div className="flex justify-between">
              <ul className="flex justify-center cursor-pointer">
                {stars5.map((star) => {
                  return (
                    <li key={`stars ${star}`} onClick={() => modifyStars(star)}>
                      {stars >= star ? (
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                          ></path>
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
              <button
                type="submit"
                className="text-sm font-semibold  bg-[#4F46E5] w-fit text-white py-2 rounded px-3"
              >
                Publicar
              </button>
            </div>
          </form>
        ) : null}
      </div>
      {/* <Modal
        isOpen={noUser}
        onRequestClose={() => setNoUser(false)}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "content-base",
          afterOpen: "content-box",
          beforeClose: "content-before",
        }}
        closeTimeoutMS={500}
      >
        <div
          v-if="showModal"
          className="w-11/12 lg:w-full max-w-xl z-20 mx-auto bg-white flex flex-col relative self-center shadow-2xl rounded-md "
        >
          <div className="p-6 border-b-4 border-gray-200 text-lg font-bold text-indigo-400">
            Tu opinion ya esta publicada
          </div>
          <div className="p-6">
            Si quieres editar tu opinion presione en el boton de editar
          </div>
          <div className="border-t-4 border-gray-200 p-6 flex justify-between">
            <button
              onClick={() => setNoUser(false)}
              className="bg-[#4F46E5] focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out"
            >
              Cerrar
            </button>
            <button
              // onClick={onEdit}
              className="bg-[#4F46E5]  focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out"
            >
              Editar
            </button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default Reviews;
