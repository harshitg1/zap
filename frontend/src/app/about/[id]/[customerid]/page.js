"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, collection, query, onSnapshot } from "firebase/firestore";

import { db } from "../../../../../config/firebase";
import Navbar from "../../../../../components/Navbar";
import CreateInvoice from "../../../../../components/CreateInvoice";

const page = () => {
  const { customerid, id } = useParams();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const subcollectionRef = collection(
      doc(db, "Users", id, "Customers", customerid),
      "Invoices"
    );
    const unsubscribe = onSnapshot(query(subcollectionRef), (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleButtonClick = async (invoice) => {
    try {
      const response = await fetch(
        `https://hooks.zapier.com/hooks/catch/17555516/3gyrqsp/`,
        {
          method: "POST",
          body: JSON.stringify(invoice),
        }
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const convertDate = (date) => {
    const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);
    return formattedDate;
  };

  return (
    <>
      <Navbar />
      <CreateInvoice userid={id} customerid={customerid} />
      <div className="max-w-4xl mx-auto ">
        <ul>
          {invoices.map((invoice, ind) => (
            <li
              key={ind}
              className="border p-4 mb-4 rounded-lg hover:shadow-md"
            >
              <p className="text-xl font-semibold mb-2">{invoice.title}</p>
              <p className="text-xl font-semibold mb-2">{invoice.name}</p>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">{invoice.amount}</p>
                <p className="text-gray-500">
                  Due Date: {convertDate(invoices.duedate)}
                </p>
              </div>
              <div className="text-gray-500">Email: {invoice.email}</div>

              <button
                className="bg-black  text-white px-4 py-2  border rounded-md"
                onClick={() => handleButtonClick(invoice)}
              >
                Automate
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
