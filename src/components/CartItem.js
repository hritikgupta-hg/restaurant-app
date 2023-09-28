import React, { useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import CartContext from "../store/cart-context";

const CartItem = ({ item }) => {
  const cartCtx = useContext(CartContext);
  return (
    <div
      key={item.id}
      className="w-full p-1 rounded-lg bg-cartItem flex items-center gap-2"
    >
      <img
        src={item.imageURL}
        className="h-20 max-w-[60px] rounded-full object-contain"
        alt="item's image"
      />

      <div className="flex flex-col gap-2">
        <p className=" text-base text-gray-50">{item.title}</p>
        <p className=" text-sm text-gray-300 font-semibold">{item.price}</p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <BiMinus
          onClick={() => {
            cartCtx.removeItem(item);
          }}
          className=" text-gray-50"
        />

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.qty}
        </p>

        <BiPlus
          className=" text-gray-50"
          onClick={() => {
            cartCtx.addItem(item);
          }}
        />
      </div>
    </div>
  );
};

export default CartItem;
