"use client";
import { useState } from "react";
import { doc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { putDoc } from "../config/firebase-functions";

const AddCustomer = ({ userid }) => {
  const initialFormData = { name: "", email: ""};
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const colRef = collection(doc(db, "Users", userid), "Customers");
    putDoc(colRef, formData, setFormData, initialFormData);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-8 p-4 ">
        <div className="text-4xl font-bold mt-6 mb-4">Add Customer</div>

        <form className="flex justify-between" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />

          <button
            type="submit"
            className=" bg-black text-sm text-white px-10 border rounded-md"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
