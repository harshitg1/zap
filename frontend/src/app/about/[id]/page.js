"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useRouter, useParams } from "next/navigation";

const page = () => {
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const subcollectionRef = collection(doc(db, "Users", id), "Customers");
    const getCustomers = async () => {
      const res = await getDocs(subcollectionRef);
      res.forEach((doc) => {
        setCustomers((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    };
    getCustomers();
  }, []);

  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="text-white text-lg font-bold">
            Zap
          </a>
          <div className="space-x-8 mr-4">
            <span className="text-white">{}</span>
          </div>
          <a href="http://localhost:3000/logout">
            <button
              className="bg-black  text-white px-4 py-2  border rounded-md"
              onClick={() => handleButtonClick(invoice)}
            >
              Logout
            </button>
          </a>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto mt-8 flex flex-col">
        <div className="text-2xl">Customers</div>
        <div className="bg-gray-100 p-4 ">
          {customers.map((item, ind) => (
            <a href={`/about/${id}/${item.id}`}>
              <div key={ind} className="bg-white rounded-md p-2 mb-2">
                {item.Name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
