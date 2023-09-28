import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  MdCloudUpload,
  MdCurrencyRupee,
  MdFastfood,
  MdFoodBank,
  MdDelete,
} from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

import Spinner from "./Spinner";
import { storage } from "../firebase.config";
import { AvailableFoodItemsContext } from "../store/available-food-items";
import { categories } from "../utils/data";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("select Category");
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const availableFoodItemsCtx = useContext(AvailableFoodItemsContext);

  //asnchronous function for fetching availble food items from FIREBASE and setting it to app's context
  const fetchAvailableFoodItems = async () => {
    //fetching availble food items from FIREBASE
    const response = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    //fetched available food items
    const availableFoodItems = response.docs.map((doc) => doc.data());

    //setting fetched available food items to context
    availableFoodItemsCtx.setAvailableFoodItems(availableFoodItems);
  };

  const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
      merge: true,
    });

    await fetchAvailableFoodItems();

    setIsLoading(false);
    setFields(true);
    setMsg("Data uploaded successfully 😊");
    setAlertStatus("success");
    clearFields();
    setTimeout(() => {
      setFields(false);
    }, 4000);
  };

  //upload image function
  const uploadImage = (e) => {
    setIsLoading(true);

    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(uploadProgress);
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try Again 🙇‍♀️");
        setAlertStatus("danger");

        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setIsLoading(false);
          setMsg("Image Uploaded Successfully 😊");
          setFields(true);
          setAlertStatus("success");

          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  //delete image function
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setAlertStatus("success");
      setMsg("Image deleted successfully 😊");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  //function for saving Details in firestore and updating available food items in context
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !categories) {
        setFields(true);
        setMsg("All Fields must be filled");
        setAlertStatus("danger");
        setIsLoading(false);
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL: imageAsset,
          category,
          calories,
          qty: 1,
          price,
        };

        saveItem(data);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while saving details : Try Again 🙇‍♀️");
      setAlertStatus("danger");
      clearFields();
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  function clearFields() {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("select Category");
  }
  return (
    <main className=" min-h-screen pt-[100px] flex items-center justify-center">
      <div className=" w-[90%] md:w-[75%] h-[calc(100%-50px)] mx-auto border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
        {fields && (
          <motion.p
            intial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className=" w-full ">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className=" bg-white">
              select Category
            </option>

            {categories &&
              categories.map((item) => {
                return (
                  <option
                    key={item.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    value={item.urlParamName}
                  >
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className=" flex items-center justify-center border-2 border-dotted border-gray-300 w-full h-225 xl:h-300 cursor-pointer rounded-lg">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className=" w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                    <MdCloudUpload className=" text-gray-500 text-3xl hover:text-gray-700" />
                    <p className=" text-gray-500 hover:text-gray-700">
                      Click here to upload
                    </p>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className=" w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className=" h-full  w-full flex items-center justify-center relative p-4">
                    <img
                      src={imageAsset}
                      alt="Uploaded image"
                      className="h-full aspect-square object-contain"
                    />
                    <button
                      type="button"
                      className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-"
                      onClick={deleteImage}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
          <MdFoodBank className="text-xl text-gray-700" />
          <input
            type="number"
            required
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories"
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
          <MdCurrencyRupee className="text-xl text-gray-700" />
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <button
          type="button"
          className=" w-full py-1 px-12 bg-emerald-500 rounded-lg text-white text-lg font-semibold hover:shadow-lg border-none outline-none"
          onClick={saveDetails}
        >
          Save
        </button>
      </div>
    </main>
  );
};

export default CreateContainer;
