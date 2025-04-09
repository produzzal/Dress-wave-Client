"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

const Slider = () => {
  return (
    <div className="w-full border-b border-gray-500">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {/* Image 1 */}
        <SwiperSlide>
          <Link href={"/shop"}>
            <div className="w-full h-[200px] md:h-[400px] relative">
              <img
                src="https://i.ibb.co/4zj38h1/shopping-online-in-smartphone-application-vector-33184025.jpg"
                alt="Slide 1"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>

        {/* Image 2 */}
        <SwiperSlide>
          <Link href={"/shop"}>
            <div className="w-full h-[200px] md:h-[400px] relative">
              <img
                src="https://i.ibb.co.com/pvTHY3h5/Online-Shopping-Banner-Mobile-App-Vector.jpg"
                alt="Slide 2"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>

        {/* Image 3 */}
        <SwiperSlide>
          <Link href={"/shop"}>
            <div className="w-full h-[200px] md:h-[400px] relative">
              <img
                src="https://i.ibb.co.com/yFBxKLVX/online-shopping-banner-82574-3393.jpg"
                alt="Slide 3"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
