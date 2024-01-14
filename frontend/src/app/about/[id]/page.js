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
      <div className="max-w-4xl mx-auto mt-8 flex flex-col">
        <div className="text-2xl">Customers</div>
        <AddCustomer userid={id}/>
        <div className="bg-gray-100 p-4 overflow-auto">
          {customers.map((item, ind) => (
            <a key={ind} href={`/about/${id}/${item.id}`}>
              <div className="bg-white rounded-md p-2 mb-2">
                <h1>{item.name}</h1>
                <h3>{item.email}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
