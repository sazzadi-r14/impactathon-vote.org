// src/components/UserDataDisplay.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../scripts/firebaseInit.js';

const UserDataDisplay = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Adjust "users" and userId with the actual collection and document ID you want to fetch
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching document: ", err);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No data available.</div>;

  return (
    <div>
      <h2>User Data</h2>
      <p>First Name: {userData['first-name']}</p>
      <p>Last Name: {userData['last-name']}</p>
      <p>Email Address: {userData['email address']}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserDataDisplay;
