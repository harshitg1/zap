"use client";
import { useState } from "react";
import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const AddCustomer = ({ userid }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const userDocRef = doc(db, "Users", userid);
    const customerRef = collection(userDocRef, "Customers");
    try {
      const docRef = await addDoc(customerRef, formData);
      console.log("Document added to Firebase with ID:", docRef.id);
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding document to Firebase:", error);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8 p-4 ">
        <div className="text-4xl font-bold mb-4">Add Customer</div>
      
        <form className="flex justify-between" onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
              required
            />
          </div>
          <div className="">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
              required
            />
          </div>
          <button
            type="submit"
            className=" bg-black text-sm text-white px-4  border rounded-md"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
