import React from "react";
import bikeDeliveryIcon from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import I1 from "../img/i1.png";
import F1 from "../img/f1.png";
import C3 from "../img/c3.png";
import FI1 from "../img/fi1.png";

const heroData = [
  {
    id: 1,
    name: "Icecream",
    decsription: "Chocolate & vanilla",
    price: "50",
    ImageScr: I1,
  },
  {
    id: 2,
    name: "Strawberries",
    decsription: "Fresh Strawberries",
    price: "60",
    ImageScr: F1,
  },
  {
    id: 3,
    name: "Chicken Kebab",
    decsription: "Mixed Kebab Plate",
    price: "120",
    ImageScr: C3,
  },
  {
    id: 4,
    name: "Grilled Fish",
    decsription: "Grilled Fish with Vegies",
    price: "130",
    ImageScr: FI1,
  },
];

const HeroContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-[130px] mb-24 ">
      <div className="flex flex-col gap-5 md:w-[80%]">
        <div className=" text-base text-orange-500 font-semibold flex items-center gap-2 bg-orange-100 w-fit py-1 px-2 rounded-2xl">
          Bike Delivery{" "}
          <img
            src={bikeDeliveryIcon}
            className="w-7 h-7 bg-white rounded-full shadow-xl "
          ></img>
        </div>

        <div className="text-[2.5rem] lg:text-[4rem] font-bold tracking-wide text-center lg:text-left">
          The Fastest Delivery in{" "}
          <div className=" text-red-600 text-[3rem] lg:text-[4.5rem]">
            Your City
          </div>
        </div>
        <p className=" text-justify text-[14px] bg-white p-4 rounded-xl shadow-md">
          Welcome! Here, you can easily order delicious meals from the comfort
          of your home. We've put a lot of thought into our menu to make sure
          every dish is tasty and well-prepared. Ordering is super easy, just a
          few clicks away! We're here to make sure you have a great dining
          experience, right in your own space. So, go ahead and explore the
          yummy options and enjoy a great meal!
        </p>

        <button
          type="button"
          className=" bg-gradient-to-br from-orange-400 bg-orange-500 w-full md:w-fit px-4 p-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="relative">
        <div className=" w-full md:h-[100%] lg:h-[100%] flex flex-wrap justify-around px-2 lg:px-16 py-4 gap-4 ">
          {heroData &&
            heroData.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" z-10 flex flex-col justify-around w-[45%] md:h-[45%] p-2 bg-cardOverlay rounded-2xl "
                >
                  <img
                    src={item.ImageScr}
                    className="h-[75%]  aspect-square object-contain"
                  />
                  <div className=" font-semibold text-center">{item.name}</div>
                  <div className="text-center text-[13px] text-blue-500">
                    {item.decsription}
                  </div>
                  <div className="text-center  text-[13px]">₹ {item.price}</div>
                </div>
              );
            })}
        </div>
        <img
          src={heroBg}
          className=" w-full h-[100%] lg:h-[100%] lg:w-[60%] absolute  top-0 md:right-0 "
        />
      </div>
    </div>
  );
};

export default HeroContainer;
