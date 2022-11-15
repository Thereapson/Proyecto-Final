import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../../Redux/Actions/Actions";
import style from "./landing.module.scss";

import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card2 from "../Card/Card2";
import Navbar from "../navbar/navbar";

export function LandingPage() {
  const productsSlider = useSelector((state) => state.productsRender);
  console.log(productsSlider);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={style.app}>
      <div>
        <Navbar />
        <h1>Bienvenido a CompuDevs</h1>
        <div className={style.container}>
          <div className={style.swiperContainer}>
            <Swiper
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".pagination",
                clickable: true,
              }}
              slidesPerView={4}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 1,
                  spaceBetween: 25,
                },
                "@0.50": {
                  slidesPerView: 1.25,
                  spaceBetween: 25,
                },
                "@1.00": {
                  slidesPerView: 2,
                  spaceBetween: 25,
                },
                "@1.25": {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                "@1.50": {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                "@1.75": {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {productsSlider?.map((product, index) => (
                <SwiperSlide key={index}>
                  <Card2 product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="pagination" />
      </div>
    </div>
  );
}
