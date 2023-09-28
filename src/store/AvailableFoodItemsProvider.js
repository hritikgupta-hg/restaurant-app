import React, { useReducer } from "react";
import { AvailableFoodItemsContext } from "./available-food-items";

const intialstate = { availableFoodItems: null };

const availableFoodItemsReducer = (state, action) => {
  if (action.type === "SET_AVAILABLE_FOOD_ITEMS") {
    // console.log(action.type);
    const newAvailableFoodItems = {
      availableFoodItems: action.availableFoodItems,
    };
    // console.log(newAvailableFoodItems);
    return newAvailableFoodItems;
  } else return state;
};

const AvailableFoodItemsProvider = (props) => {
  const [availableFoodItemsState, availableFoodItemsAction] = useReducer(
    availableFoodItemsReducer,
    intialstate
  );

  const setAvailableFoodItemsHandler = (availableFoodItems) => {
    availableFoodItemsAction({
      type: "SET_AVAILABLE_FOOD_ITEMS",
      availableFoodItems,
    });
  };

  const availableFoodItemsContext = {
    availableFoodItems: availableFoodItemsState.availableFoodItems,
    setAvailableFoodItems: setAvailableFoodItemsHandler,
  };
  return (
    <AvailableFoodItemsContext.Provider value={availableFoodItemsContext}>
      {props.children}
    </AvailableFoodItemsContext.Provider>
  );
};

export default AvailableFoodItemsProvider;
