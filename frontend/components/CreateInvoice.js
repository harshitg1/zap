"use client";
import { useEffect, useState } from "react";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const CreateInvoice = ({ userid, customerid }) => {
  const [customer, setCustomer] = useState({name: '', email: ''});
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    duedate: "",
  });

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
    const newInvoice = {
      ...formData,
      name: customer.name,
      email: customer.email
    }
    const customerRef = doc(db, "Users", userid, "Customers", customerid);
    const invoiceRef = collection(customerRef, "Invoices");
    try {
      const docRef = await addDoc(invoiceRef, newInvoice);
      console.log("Document added to Firebase with ID:", docRef.id);
      setFormData({
        title: "",
        amount: "",
        duedate: "",
      });
    } catch (error) {
      console.error("Error adding document to Firebase:", error);
    }
  };

  return (
    <div className=" max-w-2xl   mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Create Invoice</h1>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="number"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="duedate"
          >
            Due Date
          </label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            value={formData.duedate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
