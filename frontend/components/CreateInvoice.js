"use client";
import { useEffect, useState } from "react";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { format } from 'date-fns'; 
import { putDoc } from "../config/firebase-functions";

const CreateInvoice = ({ userid, customerid }) => {
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const initialFormData = {title: "", amount: "", duedate: ""};
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const docRef = doc(db, "Users", userid, "Customers", customerid);
    const getCustomerDetail = async () => {
      try {
        const documentSnapshot = await getDoc(docRef);
        if (documentSnapshot.exists()) {
          setCustomer({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    getCustomerDetail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const colRef = collection(doc(db, "Users", userid, "Customers", customerid), "Invoices");
    const newInvoice = {
      ...formData,
      name: customer.name,
      email: customer.email,
    };
    putDoc(colRef, newInvoice, setFormData, initialFormData);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto mt-10 p-6 rounded border-b-0 ">
        <div className="text-4xl mb-4 font-bold ">Create Invoice</div>
        <form className="flex justify-between" onSubmit={handleSubmit}>
          <input
            type="number"
            id="title"
            name="title"
            placeholder="Invoice no"
            value={formData.title}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md  "
            required
          />

          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="amount"
            value={formData.amount}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md "
            required
          />

          <input
            type="date"
            id="duedate"
            name="duedate"
            value={formData.duedate}
            onChange={handleChange}
            className=" px-3 py-2 border rounded-md "
            required
          />

          <button
            type="submit"
            className="bg-black px-10 py-2  text-white  rounded-lg focus:outline-none  "
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateInvoice;
