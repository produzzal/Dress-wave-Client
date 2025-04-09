import NewArrival from "@/components/NewArrival/NewArrival";
import PeopleCategory from "@/components/PeopleCategory/PeopleCategory";
import Slider from "@/components/Slider/Slider";

const page = () => {
  return (
    <div className="">
      <Slider />
      <PeopleCategory />
      <div className="mx-4 md:mx-10">
        <NewArrival />
      </div>
      <h1 className="text-center text-2xl">This is Home Page</h1>
    </div>
  );
};

export default page;
