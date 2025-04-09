import Link from "next/link";

const DressEdition = () => {
  return (
    <div>
      <h2 className="uppercase text-center p-4 bg-[#FCF4E9] text-[#f0920e] font-bold text-2xl md:text-4xl mt-15">
        The Dress Editions
      </h2>
      <div className="grid md:grid-cols-3 gap-0  md:gap-4">
        <Link href={"/"} className="relative">
          <img
            src="https://i.ibb.co.com/RGYwqwkT/67cc52c0ea29e-square.jpg"
            alt="T-Shirt"
            className="object-cover pt-6 rounded w-full h-full opacity-75"
          />
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-xl md:text-2xl font-semibold text-white p-2 text-center inline-block ">
            Printed Short Sleeve
          </h2>
        </Link>
        <Link href={"/"} className="relative">
          <img
            src="https://i.ibb.co.com/chHzq9rq/638a77dc9c88d-square.jpg"
            alt="T-Shirt"
            className="object-cover pt-6 rounded w-full h-full opacity-75"
          />
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-white text-xl md:text-2xl font-semibold p-2 text-center  inline-block ">
            Designer Edition
          </h2>
        </Link>
        <Link href={"/"} className="relative">
          <img
            src="https://i.ibb.co.com/VW2KT4Lv/638a77dce126d-square.jpg"
            alt="T-Shirt"
            className="object-cover pt-6 rounded w-full h-full opacity-75"
          />
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-xl md:text-2xl font-semibold text-white p-2 text-center  inline-block ">
            Short Sleeve Blanks
          </h2>
        </Link>
        <Link href={"/"} className="relative">
          <img
            src="https://i.ibb.co.com/G48NR2WV/67c4ecd06e2da-square.jpg"
            alt="T-Shirt"
            className="object-cover pt-6 rounded w-full h-full opacity-75"
          />
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-xl md:text-2xl font-semibold text-white p-2 text-center  inline-block ">
            Full Sleeve
          </h2>
        </Link>
        <Link href={"/"} className="relative">
          <img
            src="https://i.ibb.co.com/pjdQ7WjJ/67c4ecd04653c-square.jpg"
            alt="T-Shirt"
            className="object-cover pt-6 rounded w-full h-full opacity-75"
          />
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-xl md:text-2xl font-semibold text-white p-2 text-center inline-block ">
            Drop Shoulder
          </h2>
        </Link>
        <Link href={"/"} className="relative">
          <img
            src="https://i.ibb.co.com/dJgFwnVq/67c4ecd090deb-square.jpg"
            alt="T-Shirt"
            className="object-cover pt-6 rounded w-full h-full opacity-75"
          />
          <h2 className="absolute bottom-0 left-0 right-0 mx-auto text-white p-2 text-center inline-block text-xl md:text-2xl font-semibold">
            Womens T-Shirt
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default DressEdition;
