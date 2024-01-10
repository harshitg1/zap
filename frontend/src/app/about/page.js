"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

const page = () => {
 
 const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/protected');
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts
  return (
    <>
      <h2>User Information</h2>
          
          <h2>User Data</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
          </>
  )
}

export default page




