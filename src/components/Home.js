import React, { useEffect } from "react";

import HeroContainer from "./HeroContainer";
import CarouselSection from "./carousel/CarouselSection";
import MenuContainer from "./MenuContainer";

const Home = () => {
  return (
    <main className=" w-[90%] md:w-[80%] mx-auto ">
      <HeroContainer />

      <CarouselSection />
      <MenuContainer />
    </main>
  );
};
export default Home;
