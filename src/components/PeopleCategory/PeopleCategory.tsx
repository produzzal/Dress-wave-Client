import Link from "next/link";
import React from "react";

const PeopleCategory = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between mt-3">
      {/* Left Menu */}
      <div className="w-full md:w-1/2 bg-gray-100 flex justify-between items-center px-5 md:px-10 py-4 md:py-5 mt-3 md:mt-0 uppercase text-gray-700 font-semibold text-sm md:text-md mb-2 md:mb-0">
        <Link href={""}>Shop Now</Link>
        <Link href={""}>Man</Link>
        <Link href={""}>Women</Link>
        <Link href={""}>Kid</Link>
      </div>

      {/* Right Banner */}
      <div className="w-full md:w-1/2 bg-gray-100  text-white text-center py-3 px-4 md:px-10">
        <p className="text-sm md:text-base font-medium bg-gradient-to-r py-2 from-pink-500 to-purple-600">
          🎉 Get <span className="font-bold">5% OFF</span> on our upcoming app!
          <span className="ml-2 italic">Coming soon on Play Store 📱</span>
        </p>
      </div>
    </div>
  );
};

export default PeopleCategory;
