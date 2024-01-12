'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { doc, collection, query, onSnapshot, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useRouter } from "next/navigation";

const page = () => {
  const [customers, setCustomers] = useState([]);
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (userData && userData.emails[0].value) {
      const q = query(
        collection(db, "Users"),
        where("Email", "==", userData.emails[0].value)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((item) => {
          if(item.id) router.push(`/about/${item.id}`)
        });
      });
      return () => unsubscribe();
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const currentUserId = response.data.userid;
        const currentUser = response.data.users.filter(
          (user) => user.id === currentUserId
        );
        const User = currentUser[0].profile;
        setUserData(User);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="text-white text-lg font-bold">
            Zap
          </a>
     
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
    
   
    </>
  );
};

export default page;
