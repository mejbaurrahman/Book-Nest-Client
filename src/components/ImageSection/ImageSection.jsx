/* eslint-disable no-undef */
import image1 from "../../assets/images/p-1 (4).jpg";
import image2 from "../../assets/images/p-1 (5).jpg";
import image3 from "../../assets/images/p-1 (6).jpg";
import image4 from "../../assets/images/p-1 (7).jpg";
// import required modules
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./ImageSection.css";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";

export default function ImageSection() {
  return (
    <div className="my-8">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image1} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image2} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image3} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image4} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image1} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image2} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col">
            <img src={image1} />
            <Link to="/products">
              <button className="btn btn-neutral w-full  relative bottom-20">
                Browse Products
              </button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
