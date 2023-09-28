import React, { useReducer } from "react";
import { doc, updateDoc } from "firebase/firestore";
import CartContext from "./cart-context";
import { firestore } from "../firebase.config";

async function updateCartFirestore(cartId, updatedCart) {
  const response = await updateDoc(
    doc(firestore, "carts", cartId),
    updatedCart
  );
}

const initialState = {
  quantity: 0,
  CartId: null,
  subTotal: 0,
  delivery: 0,
  items: [],
};

const cartReducer = (state, action) => {
  if (action.type === "LOAD_CART") {
    const newState = {
      quantity: +action.cart.quantity,
      cartId: action.cart.cartId,
      items: action.cart.items,
      subTotal: action.cart.subTotal,
      delivery: action.cart.delivery,
    };

    return newState;
  } else if (action.type === "ADD_ITEM") {
    console.log(action.item);
    const updateQuantity = Number(state.quantity) + 1;
    const updatedSubTotal = Number(state.subTotal) + Number(action.item.price);

    let updatedItems;
    const itemExist = state.items.find((item) => action.item.id === item.id);

    if (itemExist) {
      updatedItems = [...state.items];
      updatedItems.map((item) => {
        if (itemExist.id === item.id) {
          item.qty++;
        }
      });
    } else {
      updatedItems = [...state.items];
      updatedItems.push(action.item);
    }

    const updatedState = {
      ...state,
      quantity: updateQuantity,
      items: updatedItems,
      subTotal: updatedSubTotal,
    };

    console.log(updatedState);

    updateDoc(doc(firestore, "carts", updatedState.cartId), updatedState);

    return updatedState;
  } else if (action.type === "REMOVE_ITEM") {
    const updateQuantity = Number(state.quantity) - 1;
    const updatedSubTotal = Number(state.subTotal) - Number(action.item.price);

    let updatedItems;
    const itemExist = state.items.find((item) => action.item.id === item.id);
    if (itemExist.qty > 1) {
      updatedItems = [...state.items];
      updatedItems.map((item) => {
        if (itemExist.id === item.id) {
          item.qty--;
        }
      });
    } else {
      updatedItems = [...state.items];
      updatedItems = updatedItems.filter((item) => item.id !== itemExist.id);
    }

    const updatedState = {
      ...state,
      quantity: updateQuantity,
      items: updatedItems,
      subTotal: updatedSubTotal,
    };
    updateDoc(doc(firestore, "carts", updatedState.cartId), updatedState);
    return updatedState;
  } else if (action.type === "CLEAR_CART") {
    const updatedState = { ...state, items: [], subTotal: [], quantity: 0 };
    updateDoc(doc(firestore, "carts", updatedState.cartId), updatedState);
    return updatedState;
  } else return state;
};

const CartProvider = (props) => {
  const [cartState, cartActions] = useReducer(cartReducer, initialState);

  const updateCart = (cart) => {
    cartActions({ type: "LOAD_CART", cart });
  };

  const addItem = (item) => {
    cartActions({ type: "ADD_ITEM", item });
  };

  const removeItem = (item) => {
    cartActions({ type: "REMOVE_ITEM", item });
  };

  const clearCart = () => {
    cartActions({ type: "CLEAR_CART" });
  };
  const cartContext = {
    cart: cartState,
    updateCart,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
