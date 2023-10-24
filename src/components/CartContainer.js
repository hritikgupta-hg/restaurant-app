import React, { useContext, useState } from "react";

import { motion } from "framer-motion";
import { BsFillCartFill } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FcLeave, FcRefresh } from "react-icons/fc";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";
import emptyCart from "../img/emptyCart.svg";
import Modal from "./Modal";

const CartContainer = ({ hideCart }) => {
  const [checkedOut, setCheckedOut] = useState(false);
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx.cart.subTotal + cartCtx.cart.delivery);
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-375 h-screen z-[101] bg-white drop-shadow-md flex flex-col fixed top-0 right-0"
    >
      <div className="w-full flex items-center justify-between p-4 ">
        <MdOutlineKeyboardBackspace
          onClick={() => hideCart(false)}
          className=" text-textColor text-3xl cursor-pointer"
        />
        <p className=" font-semibold flex items-center justify-center gap-1 px-2">
          Cart <BsFillCartFill />
        </p>
        <p
          onClick={() => cartCtx.clearCart()}
          className=" flex items-center justify-center gap-1 px-2 rounded-md bg-gray-100 hover:shadow-md cursor-pointer text-textColor text-[14px]"
        >
          Clear
          <FcRefresh />
        </p>
      </div>

      {cartCtx?.cart?.items?.length > 0 ? (
        <div className="w-full h-full bg-cartBg flex flex-col">
          {/* cart items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartCtx.cart.items.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          {/* cart total amount section */}
          <div className="w-full flex-1 bg-cartTotal flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className=" text-gray-400 text-lg">Sub Total</p>
              <p className=" text-gray-400 text-lg">
                ₹ {cartCtx.cart.subTotal}
              </p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className=" text-gray-400 text-lg">Delivery</p>
              <p className=" text-gray-400 text-lg">
                ₹ {cartCtx.cart.delivery}
              </p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ₹ {cartCtx.cart.subTotal + cartCtx.cart.delivery}
              </p>
            </div>

            <button
              onClick={() => setCheckedOut(true)}
              type="button"
              className="w-full rounded-xl bg-gradient-to-tr  from-orange-400 to-orange-600  text-gray-50 text-lg p-2 hover:shadow-xl "
            >
              Check Out
            </button>

            {checkedOut && (
              <Modal close={setCheckedOut}>
                <div className="p-5 flex flex-col gap-4 w-[320px] md:w-[500px]">
                  <p className=" text-[12px] text-red-500 text-center">
                    *Right now only cash on delivery is available
                  </p>

                  <input
                    required
                    maxLength={200}
                    id="address"
                    type="text"
                    placeholder="Enter your Address here"
                    className=" p-2 placeholder:text-xs text-xs placeholder:text-gray-400 border-none outline-none"
                  ></input>
                  <input
                    required
                    maxLength={10}
                    id="address"
                    type="text"
                    placeholder="Enter your contact number here"
                    className=" p-2 placeholder:text-xs text-xs placeholder:text-gray-400 border-none outline-none"
                  ></input>

                  <div className="w-full flex justify-between">
                    <p className=" text-xl font-semibold">Total</p>
                    <p className=" text-gray-600 text-xl font-semibold">
                      ₹ {cartCtx.cart.subTotal + cartCtx.cart.delivery}
                    </p>
                  </div>
                  <div className="flex justify-end gap-5 md:gap-10 ">
                    <button
                      onClick={() => setCheckedOut(true)}
                      type="button"
                      className=" px-3 md:py-1 text-sm md:text-base rounded-md md:rounded-lg bg-gradient-to-tr  from-orange-400 to-orange-600  text-gray-50 hover:shadow-xl "
                    >
                      confirm
                    </button>
                    <button
                      onClick={() => setCheckedOut(false)}
                      type="button"
                      className="px-3 md:py-1 rounded-lg border-2  hover:shadow-xl "
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      ) : (
        <div className=" h-full w-full flex flex-col items-center justify-center gap-3">
          <img src={emptyCart} />
          <p>Cart is Empty! Add something to cart</p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
