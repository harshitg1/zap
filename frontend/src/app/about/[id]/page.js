"use client";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  onSnapshot
} from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import AddCustomer from "../../../../components/AddCustomer";

const page = () => {
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const subcollectionRef = collection(doc(db, "Users", id), "Customers");
    const unsubscribe = onSnapshot(query(subcollectionRef), (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Navbar />
        <AddCustomer userid={id}/>
      <div className="max-w-5xl mx-auto mt-6 ">
        <div className="text-2xl px-4">Customers</div>
        <div className=" p-2 overflow-auto">
          {customers.map((item, ind) => (
            <a key={ind} href={`/about/${id}/${item.id}`}>
              <div  className=" p-4 my-2 rounded border bottom-1 shadow-sm">
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
