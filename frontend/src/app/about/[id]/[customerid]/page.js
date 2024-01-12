"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { db } from "../../../../../config/firebase";

const page = () => {
  const { customerid, id } = useParams();

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const userDocRef = doc(db, "Users", id, "Customers", customerid);
      const invoices = collection(userDocRef, "Invoices");

      const q = query(invoices);

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Loop through the results
      querySnapshot.forEach((d) => {
        setInvoices((prev) => [...prev, { ...d.data() }]);
      });
    };
    getCustomers();
  }, []);

  const handleButtonClick = async (invoice) => {
    const colRef = collection(db, "Notification");
    const res = await addDoc(colRef, invoice);
    console.log(res);
  };

  return (
    <>
      {/* <div>
            hi
            {invoices.map((item, ind) => console.log(item))}
        </div> */}
      <div className="max-w-4xl mx-auto ">
        <div>{invoices.map((invoice) => console.log(invoice))}</div>
        <ul>
          {invoices.map((invoice, ind) => (
            <li
              key={ind}
              className="border p-4 mb-4 rounded-lg hover:shadow-md"
            >
              <p className="text-xl font-semibold mb-2">{invoice.title}</p>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">{invoice.amount}</p>
                <p className="text-gray-500">Due Date: {invoice.dueDate}</p>
              </div>
              <div className="text-gray-500">Email: {invoice.Email}</div>
              <a href="http://localhost:3000/logout">
            <button
              className="bg-black  text-white px-4 py-2  border rounded-md"
              onClick={() => handleButtonClick(invoice)}
            >
              Automate
            </button>
          </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
