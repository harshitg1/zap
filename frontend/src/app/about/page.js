"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

const page = () => {
 
 const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        console.log(response);
        setUserData(response.data.users);
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
          <ul>
      {userData && userData.map(({ id, profile }) => (
        <li key={id}>
          <p>User ID: {id}</p>
          <p>Name: {profile.displayName}</p>
          {/* Include other user properties as needed */}
        </li>
      ))}
    </ul>
          </>
  )
}

export default page




