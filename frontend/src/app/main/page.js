'use client'
import axios from "axios";
import { useEffect } from "react";
import {  collection, query, onSnapshot, where,  addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        const User = response.data.user.profile;
        console.log(User)
        
        const q = query(collection(db, "Users"), where("Email", "==", User.emails[0].value));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          if(querySnapshot.docs.length === 0) {
            const addDocumentToCollection = async() => {
              try {
                const docRef = await addDoc(collection(db, "Users"), {
                  Name : User.displayName,
                  Email: User.emails[0].value
                });
                console.log("Document written with ID: ", docRef.id);
                router.push(`/main/${docRef.id}`);
              } catch (error) {
                console.error("Error adding document: ", error);
              }
            }
            addDocumentToCollection();
          } else {
            if(querySnapshot.docs[0].id) router.push(`/main/${querySnapshot.docs[0].id}`)
          }
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    
  }, []);

  return (
    <>
     <Navbar/>
     <div> Loading...</div>
    </>
  );
};

export default page;
