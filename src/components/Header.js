import React, { useContext, useState } from "react";
import { BsFillCartFill as CartIcon } from "react-icons/bs";
import { MdAdd, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { motion } from "framer-motion";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { firestore } from "../firebase.config";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { auth } from "../firebase.config";
import { AuthContext } from "../store/auth-context";
import CartContainer from "./CartContainer";
import CartContext from "../store/cart-context";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const provider = new GoogleAuthProvider();

  const menuToggleHandler = () => {
    setShowMenu((currState) => !currState);
  };

  const login = async () => {
    if (!authCtx.user.userInfo) {
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
      const { providerData } = user;
      authCtx.setUser({
        userInfo: {
          userGoogleInfo: providerData[0],
          userFireBaseId: user.uid,
        },
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          userInfo: {
            userGoogleInfo: providerData[0],
            userFirebaseId: user.uid,
          },
        })
      );

      const res = await getDoc(doc(firestore, "carts", user.uid));
      console.log(res.exists());

      if (!res.exists()) {
        await setDoc(doc(firestore, "carts", user.uid), {
          cartId: user.uid,
          subTotal: 0,
          delivery: 0,
          items: [],
          quantity: 0,
        });

        cartCtx.updateCart({
          cartId: user.uid,
          subTotal: 0,
          delivery: 0,
          items: [],
          quantity: 0,
        });
      } else {
        console.log(res.data());
        cartCtx.updateCart(res.data());
      }
    } else menuToggleHandler();
  };

  const logout = () => {
    setShowMenu(false);
    localStorage.clear();
    authCtx.setUser({ user: null });
  };

  return (
    <>
      {showCart && <CartContainer hideCart={setShowCart} />}
      <div className="fixed z-50 w-screen bg-slate-100 py-3 px-6 md:py-6 md:px-16 ">
        {/* desktop & tablet*/}
        <div className="hidden md:flex h-full w-full justify-between ">
          <Link to="/">
            <img src={Logo} className="w-10 object-cover " alt="logo" />
          </Link>

          <div className="flex gap-8 items-center ">
            <ul className="flex gap-8  ">
              <li
                onClick={() => setShowMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              >
                Home
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              >
                Menu
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              >
                About Us
              </li>
              <li
                onClick={() => setShowMenu(false)}
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
              >
                Service
              </li>
            </ul>

            {authCtx?.user?.userInfo && (
              <div onClick={() => setShowCart(true)} className="relative ">
                <CartIcon className="text-textColor text-2xl cursor-pointer " />
                <div className="bg-red-600 h-5 w-5 rounded-full absolute -top-4 -right-4 flex items-center justify-center text-white text-[12px] ">
                  {cartCtx?.cart?.quantity}
                </div>
              </div>
            )}

            <div className="relative">
              <img
                src={
                  authCtx?.user?.userInfo
                    ? authCtx?.user["userInfo"].userGoogleInfo?.photoURL
                    : Avatar
                }
                alt="userProfile"
                className={`w-10 min-w-[40px] shadow-2xl cursor-pointer rounded-full `}
                onClick={login}
              />
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
                >
                  {/* adding new item feature only for admin hritikgupta.ktm@gmail.com */}
                  {authCtx.user.userInfo &&
                    authCtx.user["userInfo"].userGoogleInfo.email ===
                      "hritikgupta.ktm@gmail.com" && (
                      <Link to="/createItem" onClick={() => setShowMenu(false)}>
                        <p className="flex items-center justify-between px-4 py-2 hover:bg-slate-100 text-base text-textColor transition-all duration-100 ease-in-out cursor-pointer">
                          New Item <MdAdd />{" "}
                        </p>
                      </Link>
                    )}
                  <p
                    className="flex items-center justify-between px-4 py-2 hover:bg-slate-100 text-base text-textColor transition-all duration-100 ease-in-out cursor-pointer"
                    onClick={logout}
                  >
                    Logout <MdLogout />
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden h-full w-full ">
          {authCtx?.user?.userInfo && (
            <div onClick={() => setShowCart(true)} className="relative ">
              <CartIcon className="text-textColor text-2xl cursor-pointer " />
              <div className="bg-red-600 h-5 w-5 rounded-full absolute -top-4 -right-4 flex items-center justify-center text-white text-[12px] ">
                {cartCtx?.cart?.quantity}
              </div>
            </div>
          )}
          <Link to="/">
            <img src={Logo} className="w-10 object-cover " alt="logo" />
          </Link>
          <div className="relative">
            <img
              src={
                authCtx?.user?.userInfo
                  ? authCtx?.user?.userInfo?.userGoogleInfo?.photoURL
                  : Avatar
              }
              alt="userProfile"
              className={`w-10 min-w-[40px] shadow-2xl cursor-pointer rounded-full `}
              onClick={login}
            />
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
              >
                {/* adding new item feature only for admin hritikgupta.ktm@gmail.com */}
                {authCtx.user &&
                  authCtx.user.email === "hritikgupta.ktm@gmail.com" && (
                    <Link onClick={() => setShowMenu(false)} to="/createItem">
                      <p className="flex items-center justify-between px-4 py-2 hover:bg-slate-100 text-base text-textColor transition-all duration-100 ease-in-out cursor-pointer">
                        New Item <MdAdd />{" "}
                      </p>
                    </Link>
                  )}
                <ul className="flex flex-col ">
                  <li className="px-4 py-2 hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                    Home
                  </li>
                  <li className="px-4 py-2 hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                    Menu
                  </li>
                  <li className="px-4 py-2 hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                    About Us
                  </li>
                  <li className="px-4 py-2 hover:bg-slate-100 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                    Service
                  </li>
                </ul>
                <p
                  className="flex items-center justify-between px-4 py-2 hover:bg-slate-100 text-base text-textColor transition-all duration-100 ease-in-out cursor-pointer"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
