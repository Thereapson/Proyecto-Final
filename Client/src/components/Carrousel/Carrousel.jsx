import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slide,
    Slider,
  } from "pure-react-carousel";
  import "pure-react-carousel/dist/react-carousel.es.css";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import s from "./carrouselHome.module.css";
  
  export default function CarrouselHome() {
    //                               state.recomendados???
    var array = useSelector((state) => state.suggested);
    if (array.length) {
      return (
        <>
          <h1 style={{ fontSize: "25px" }}>Recomendados</h1>
          <div className={s.chico}>
            <CarouselProvider
              naturalSlideWidth={500}
              naturalSlideHeight={200}
              totalSlides={array.length}
              infinite
              isIntrinsicHeight
              visibleSlides={1.25}
              interval={3000}
              isPlaying
              className={s.carrusel}
            >
              <div className={s.slider}>
                <Slider>
                  {array.map((p, i) => {
                    return (
                      <Slide index={i} key={i}>
                        <div className={s.card}>
                          <Link to={`/home/detail/${p.id}`} className={s.link}>
                            <h1
                              style={{
                                color: "gray",
                                fontSize: "20px",
                                padding: "4px",
                                maxHeight: "100px",
                                overflow: "hidden",
                              }}
                            >
                              {p.name}
                            </h1>
                            <img
                              style={{
                                height: "200px",
                                width: "200px",
                                objectFit: "scale-down",
                              }}
                              src={p.thumbnail}
                              alt={p.name}
                            />
                          </Link>
                        </div>
                      </Slide>
                    );
                  })}
                </Slider>
              </div>
              <ButtonBack className={`${s.but} ${s.back}`}>{"<"}</ButtonBack>
              <ButtonNext className={`${s.but} ${s.next}`}>{">"}</ButtonNext>
            </CarouselProvider>
          </div>
  
          <div className={s.mediano}>
            <CarouselProvider
              naturalSlideWidth={500}
              naturalSlideHeight={100}
              totalSlides={array.length}
              infinite
              isIntrinsicHeight
              step={2}
              visibleSlides={2.25}
              interval={3000}
              isPlaying
              className={s.carrusel}
            >
              <div className={s.slider}>
                <Slider>
                  {array.map((p, i) => {
                    return (
                      <Slide index={i} key={i}>
                        <div className={s.card}>
                          <Link to={`/home/detail/${p.id}`} className={s.link}>
                            <h1
                              style={{
                                color: "gray",
                                fontSize: "20px",
                                padding: "4px",
                                maxHeight: "100px",
                                overflow: "hidden",
                              }}
                            >
                              {p.name}
                            </h1>
                            <img
                              style={{
                                height: "200px",
                                width: "200px",
                                objectFit: "scale-down",
                              }}
                              src={p.thumbnail}
                              alt={p.name}
                            />
                          </Link>
                        </div>
                      </Slide>
                    );
                  })}
                </Slider>
              </div>
              <ButtonBack className={`${s.but} ${s.back}`}>{"<"}</ButtonBack>
              <ButtonNext className={`${s.but} ${s.next}`}>{">"}</ButtonNext>
            </CarouselProvider>
          </div>
  
          <div className={s.grande}>
            <CarouselProvider
              naturalSlideWidth={500}
              naturalSlideHeight={100}
              totalSlides={array.length}
              infinite
              isIntrinsicHeight
              step={3}
              visibleSlides={3.25}
              interval={3000}
              isPlaying
              className={s.carrusel}
            >
              <div className={s.slider}>
                <Slider>
                  {array.map((p, i) => {
                    return (
                      <Slide index={i} key={i}>
                        <div className={s.card}>
                          <Link to={`/home/detail/${p.id}`} className={s.link}>
                            <h1
                              style={{
                                color: "gray",
                                fontSize: "20px",
                                padding: "4px",
                                maxHeight: "100px",
                                overflow: "hidden",
                              }}
                            >
                              {p.name}
                            </h1>
                            <img
                              style={{
                                height: "200px",
                                width: "200px",
                                objectFit: "scale-down",
                              }}
                              src={p.thumbnail}
                              alt={p.name}
                            />
                          </Link>
                        </div>
                      </Slide>
                    );
                  })}
                </Slider>
              </div>
              <ButtonBack className={`${s.but} ${s.back}`}>{"<"}</ButtonBack>
              <ButtonNext className={`${s.but} ${s.next}`}>{">"}</ButtonNext>
            </CarouselProvider>
          </div>
        </>
      );
    }
  }
  