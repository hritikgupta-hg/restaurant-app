import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import CartContext from "../../store/cart-context";

const Carouseldata = ({ data }) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  // console.log(data);
  return (
    <div className=" z-10 shrink-0 flex flex-col gap-2 justify-around w-[125px] md:w-[calc(25%-16px)] lg:w-[calc(20%-24px)] p-2 bg-cardOverlay rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
      <img
        src={data.imageURL}
        className="h-[75%]  aspect-square object-contain"
      />
      <div className=" font-semibold text-base text-center">{data.title}</div>

      <div className="text-center text-blue-500 text-[13px]">
        {data.calories} Calories per serving
      </div>
      <div className="text-center text-gray-600 font-semibold text-[13px]">
        ₹{data.price}
      </div>
      {authCtx?.user?.userInfo && (
        <button
          onClick={() => cartCtx.addItem(data)}
          type="button"
          className=" text-[12px] text-white bg-red-400 hover:bg-red-700 transition-all duration-100 ease-in-out py-1 rounded-lg"
        >
          Add to Cart +
        </button>
      )}
    </div>
  );
};

export default Carouseldata;
