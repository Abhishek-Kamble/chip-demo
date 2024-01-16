import React from "react";
import ChipComponent from "./ChipComponent";

const Home = () => {
  return (
    <div>
      <div className="text-4xl">Welcome to Zepto</div>

      <div className="text-2xl font-bold text-blue-700">Pick up user...</div>
      <ChipComponent />
    </div>
  );
};

export default Home;
