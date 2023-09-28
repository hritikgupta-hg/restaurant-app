import React, { useContext, useRef } from "react";
import { AvailableFoodItemsContext } from "../../store/available-food-items";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Carousel from "./Carousel";

const CarouselSection = () => {
  const availableFoodItemsCtx = useContext(AvailableFoodItemsContext);

  const availableFruits = availableFoodItemsCtx?.availableFoodItems?.filter(
    (item) => item.category === "fruit"
  );
  // console.log(availableFruits);

  const carouselContainer = useRef(null);

  // console.log(carouselContainer);
  const navigation = (direction) => {
    const container = carouselContainer.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="w-full mb-20">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:-bottom-2 before:rounded-lg before:w-32 before:h-1 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100">
          Fresh & Healthy Fruits
        </p>
        <div className="hidden lg:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => navigation("left")}
            className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-75 ease-in-out flex items-center justify-center"
          >
            <MdChevronLeft className=" text-base text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => navigation("right")}
            className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-75 ease-in-out flex items-center justify-center"
          >
            <MdChevronRight className=" text-base text-white" />
          </motion.div>
        </div>
      </div>

      {availableFruits && (
        <Carousel data={availableFruits} ref={carouselContainer} />
      )}
    </section>
  );
};

export default CarouselSection;
