import React, { useState, useContext } from "react";
import { IoFastFood } from "react-icons/io5";

import { categories } from "../utils/data";
import { AvailableFoodItemsContext } from "../store/available-food-items";
import CarouselItem from "./carousel/CarouselItem";
import notFound from "../img/NotFound.svg";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");

  const availableFoodItemsCtx = useContext(AvailableFoodItemsContext);
  const availableFilteredFoodItems =
    availableFoodItemsCtx?.availableFoodItems?.filter(
      (item) => item.category === filter
    );

  return (
    <section className="w-full mb-24" id="menu">
      <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:-bottom-2 before:rounded-lg before:w-32 before:h-1 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100">
        Our Hot Dishes
      </p>

      <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-scroll scrollbar-none">
        {categories &&
          categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setFilter(category.urlParamName)}
              className={`group ${
                filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
              } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
            >
              <div
                className={`w-10 h-10 rounded-full  ${
                  filter === category.urlParamName ? "bg-card" : "bg-cartNumBg"
                } group-hover:bg-card flex items-center justify-center`}
              >
                <IoFastFood
                  className={` ${
                    filter === category.urlParamName
                      ? "text-textColor"
                      : "text-card"
                  }  group-hover:text-textColor text-lg`}
                />
              </div>
              <p
                className={` text-sm ${
                  filter === category.urlParamName
                    ? " text-white"
                    : " text-textColor"
                } group-hover:text-white`}
              >
                {category.name}
              </p>
            </div>
          ))}
      </div>

      <div className="w-full flex flex-wrap gap-4 items-center justify-center">
        {availableFilteredFoodItems &&
          (availableFilteredFoodItems.length > 0 ? (
            availableFilteredFoodItems?.map((item) => {
              return <CarouselItem data={item} key={item.id} />;
            })
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img
                src={notFound}
                className=" w-full sm:w-[400px] aspect-square"
              />
              <p>No Item Found 😔</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MenuContainer;
