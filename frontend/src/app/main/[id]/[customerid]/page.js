"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, collection } from "firebase/firestore";
import { db } from "../../../../../config/firebase";
import Navbar from "../../../../../components/Navbar";
import CreateInvoice from "../../../../../components/CreateInvoice";
import Button from "../../../../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDocs } from "../../../../../config/firebase-functions";

const page = () => {
  const { customerid, id } = useParams();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const colRef = collection(doc(db, "Users", id, "Customers", customerid), "Invoices");
    const unsubscribe = fetchDocs(colRef, setInvoices);

    return () => {
      unsubscribe();
    };
  }, []);

  function convertDateFormat(inputDate) {
    var parts = inputDate.split("-");
    var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
    
    return formattedDate;
  }

  function getCurrentDateString() {
    var currentDate = new Date();
    
    var year = currentDate.getFullYear();
    var month = padZero(currentDate.getMonth() + 1);
    var day = padZero(currentDate.getDate());
  
    var dateString = year + "-" + month + "-" + day;
  
    return dateString;
  }
  
  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }

  const handleButtonClick = async (invoice) => {
    try {
      const response = await fetch(
        `https://hooks.zapier.com/hooks/catch/17555516/3gyrqsp/`,
        {
          method: "POST",
          body: JSON.stringify(invoice),
        }
      );
      toast.success("Reminder Sent!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <CreateInvoice userid={id} customerid={customerid} />
      <div className="max-w-5xl mx-auto">
      <div className="text-2xl px-8 mb-4">Invoices</div>
        <ul className=" mx-8 overflow-auto">
          {invoices.map((invoice, ind) => (
            <li
              key={ind}
              className={`border p-4 mb-4 rounded-lg hover:shadow-md  ${invoice.duedate < getCurrentDateString() ? "border-red-600" : "border-green-500"}`}
            >
              <div className="flex justify-between">
                <p className="text-xl mb-2">Name: &nbsp;{invoice.name}</p>
                <p className="text-xl font-semibold mb-2">
                  Invoice No: &nbsp;{invoice.title}
                </p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Amount: ₹{invoice.amount}</p>
                <p className="text-gray-500">
                  Due Date: {convertDateFormat(invoice.duedate)}
                </p>
              </div>
              <div className="text-gray-500">Email: {invoice.email}</div>
                <Button handleButtonClick={handleButtonClick} invoice={invoice}>
                  Send Reminder
                </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
