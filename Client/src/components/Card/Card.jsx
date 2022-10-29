import React from "react";
const products = [
    {
      _id: "6359aaf69a8e1e0c747524e8",
      Brand: "Intel",
      Model: "545s Series 512GB",
      Price: "USD 43",
      Img: "https://http2.mlstatic.com/D_NQ_NP_946072-MLA31612801132_072019-V.jpg",
    },
    {
      _id: "6359aaf39a8e1e0c74751c65",
      Brand: "Intel",
      Model: "Core i5-4250U",
      Price: "USD 837",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751ae7",
      Brand: "Intel",
      Model: "Core i7-6950X",
      Price: "USD 391",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751bb4",
      Brand: "Intel",
      Model: "Xeon X3460",
      Price: "USD 397",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751ae1",
      Brand: "Intel",
      Model: "Core i7-10870H",
      Price: "USD 412",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751ae4",
      Brand: "Intel",
      Model: "Core2 Duo T9600",
      Price: "USD 843",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751b0e",
      Brand: "Intel",
      Model: "Core i9-9960X",
      Price: "USD 711",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751b16",
      Brand: "Intel",
      Model: "Xeon E3-1240 V2",
      Price: "USD 518",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
    {
      _id: "6359aaf49a8e1e0c74751f7c",
      Brand: "Sapphire",
      Model: "Sapphire RX 590 8GB Nitro+",
      Price: "USD 278",
      Img: "https://signal.avg.com/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/How%20to%20Overclock%20Your%20GPU%20for%20More%20Gaming%20and%20Multimedia%20Performance/How_to_Overclock_Your_GPU-Hero.jpg",
    },
    {
      _id: "6359aaf29a8e1e0c74751b15",
      Brand: "Intel",
      Model: "Core i9-9980HK",
      Price: "USD 860",
      Img: "https://assets2.rockpapershotgun.com/Intel-13th-Gen-Raptor-Lake-key-art.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/Intel-13th-Gen-Raptor-Lake-key-art.jpg",
    },
  ];

function Card() {
  return (
    <div>
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8">
          <div class="relative mx-auto max-w-3xl text-center">
            <span class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/10"></span>

            <h2 class="relative inline-block bg-white px-4 text-center text-2xl font-bold">
              Recently Viewed
            </h2>
          </div>


          <div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {products.map((product) => (
            <a href="#" class="relative block border border-gray-100">
              <button
                type="button"
                class="absolute right-4 top-4 rounded-full bg-black p-2 text-white"
              >
                <span class="sr-only">Wishlist</span>
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </button>

              <img
                alt="Toy"
                src={product.Img}
                class="h-56 w-full object-contain"
              />

              <div class="p-6">
                <p class="text-sm font-medium text-gray-600">{product.Price}</p>

                <h3 class="mt-1 text-lg font-bold">{product.Model}</h3>

                <button
                  type="button"
                  class="mt-4 flex w-full items-center justify-center rounded-sm bg-yellow-500 px-8 py-4"
                >
                  <span class="text-sm font-medium"> Add to Cart </span>

                  <svg
                    class="ml-1.5 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </button>
              </div>
            </a>
          ))}
          </div>
        </div>

      </section>
    </div>
  );
}

export default Card;
