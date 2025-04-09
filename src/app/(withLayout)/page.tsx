import DressEdition from "@/components/DressEdition/DressEdition";
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
        <DressEdition />
      </div>
    </div>
  );
};

export default page;
