"use client";
import { useEffect, useState } from "react";
import { doc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import AddCustomer from "../../../../components/AddCustomer";
import { fetchDocs } from "../../../../config/firebase-functions";

const page = () => {
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const colRef = collection(doc(db, "Users", id), "Customers");
    const unsubscribe = fetchDocs(colRef, setCustomers);
    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
     
      <Navbar />
      <AddCustomer userid={id} />
      <div className="max-w-5xl mx-auto mt-6 ">
        <div className="text-2xl px-4">Customers</div>
        <div className=" p-2 overflow-auto">
          {customers.map((item, ind) => (
            <a key={ind} href={`/main/${id}/${item.id}`}>
              <div className=" p-4 my-2 rounded border bottom-1 shadow-sm">
                <p className="text-lg font-bold mb-2 ">{item.name}</p>
                <p className="text-gray-600">{item.email}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
