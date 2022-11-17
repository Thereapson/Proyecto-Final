import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/compuDevs.png";
import Navbar from "../navbar/navbar";
// styles with tailwind

export default function Landing() {
  return (
    <div className="">
      <section class="relative bg-[url(https://clonesyperifericos.com/wp-content/uploads/2020/09/5d3e217079b75ec37e54261c6ddb4fa0-scaled.jpg)] bg-cover bg-center bg-no-repeat mb-10">
        <div class="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>

        <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div class="max-w-xl text-center sm:text-left">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              Bienvenidos
              <strong class="block font-extrabold text-blue-700">
                a CompuDevs.
              </strong>
            </h1>

            <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
              Los mejores componentes de computadores los puedes encontrar aqui
            </p>

            <div class="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="/products"
                class="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              >
                Empieza aqui
              </a>

             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
