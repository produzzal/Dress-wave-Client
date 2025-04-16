"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";

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
          <Link href="/shop">
            <div className="w-full h-[250px] md:h-[400px] relative">
              <Image
                src="/itachi-header.png"
                alt="Slide 1"
                fill
                className="object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>

        {/* Image 2 */}
        <SwiperSlide>
          <Link href="/shop">
            <div className="w-full h-[250px] md:h-[400px] relative">
              <Image
                src="/naruto-hinata-header.png"
                alt="Slide 1"
                fill
                className="object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>

        {/* Image 3 */}
        <SwiperSlide>
          <Link href="/shop">
            <div className="w-full h-[250px] md:h-[400px] relative">
              <Image
                src="/naruto-family-header.png"
                alt="Slide 1"
                fill
                className="object-cover object-center"
              />
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
