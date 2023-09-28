import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  orderBy,
  query,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

import { auth, firestore } from "./firebase.config";

import Home from "./components/Home";
import CreateContainer from "./components/CreateContainer";
import { AvailableFoodItemsContext } from "./store/available-food-items";
import { AuthContext } from "./store/auth-context";
import CartContext from "./store/cart-context";

const App = () => {
  const availableFoodItemsCtx = useContext(AvailableFoodItemsContext);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  //asnchronous function for fetching availble food items from FIREBASE and setting it to app's context
  const fetchAvailableFoodItems = async () => {
    //fetching availble food items from FIREBASE
    const response = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    //fetched available food items
    const availableFoodItems = response.docs.map((doc) => doc.data());

    //setting fetched availabel food items to context
    availableFoodItemsCtx.setAvailableFoodItems(availableFoodItems);
  };

  console.log(authCtx.user.userInfo);
  const getCart = async () => {
    if (authCtx.user.userInfo) {
      const res = await getDoc(
        doc(firestore, "carts", authCtx.user.userInfo.userFirebaseId)
      );

      console.log(res.data());
      cartCtx.updateCart(res.data());
    }
  };

  //fetching available food items only when the app is loaded first, not every time
  useEffect(() => {
    fetchAvailableFoodItems();
    getCart();
  }, []);

  // const getCartData = async (cartId) => {
  //   const res = await getDoc(doc(firestore, "carts", cartId));
  //   console.log(res.exists());

  //   if (!res.exists()) {
  //     await setDoc(doc(firestore, "carts", cartId), {
  //       cartId: cartId,
  //       subTotal: 0,
  //       delivery: 0,
  //       items: [],
  //     });

  //     cartCtx.updateCart({
  //       cartId: cartId,
  //       subTotal: 0,
  //       delivery: 0,
  //       items: [],
  //     });
  //   } else {
  //     console.log(res.data());
  //     cartCtx.updateCart(res.data());
  //   }
  // };

  // useEffect(() => {
  //   if (authCtx.user.userInfo) {
  //     getCartData(authCtx.user.userInfo.fireBaseId);
  //   } else {
  //     cartCtx.updateCart({
  //       cartId: null,
  //       subTotal: 0,
  //       delivery: 0,
  //       items: [],
  //     });
  //   }
  // }, [authCtx.user.userInfo]);

  return (
    <AnimatePresence>
      <div className="w-full h-auto flex flex-col bg-slate-100">
        <Header />

        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/createItem" element={<CreateContainer />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
