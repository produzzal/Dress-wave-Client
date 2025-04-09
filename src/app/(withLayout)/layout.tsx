import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default WithLayout;
