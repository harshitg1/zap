"use client"
import { useState } from 'react';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

const AddCustomer = ({userid}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    console.log('Form submitted:', formData);
    const userDocRef = doc(db, "Users", userid);
    const customerRef = collection(userDocRef, "Customers");
    try {
      const docRef = await addDoc(customerRef, formData);
      console.log('Document added to Firebase with ID:', docRef.id);
      setFormData({
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding document to Firebase:', error);
    }
  };

  return (
    <div className="max-w-2xl  mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Add Customer</h1>
      <form  className="flex" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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

export default AddCustomer;
