 // src/components/UserDataDisplay.jsx
 import React, { useState, useEffect } from 'react';
 import { doc, getDoc } from 'firebase/firestore';
 import { db } from '../scripts/firebaseInit';
 
 const UserDataDisplay = () => {
   const [inputEmail, setInputEmail] = useState('');
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
 
   const handleEmailSubmit = async (event) => {
     event.preventDefault();
     setLoading(true);
     setError(null);
 
     try {
       const docRef = doc(db, "users", inputEmail);
       const docSnap = await getDoc(docRef);
 
       if (docSnap.exists()) {
         setUserData(docSnap.data());
       } else {
         setError("No user found with that email.");
       }
     } catch (err) {
       setError(err.message);
     }
 
     setLoading(false);
   };
 
   if (userData) {
     // Display the user data
     return (
       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
         <h2 className="text-xl font-bold text-gray-800 mb-6">Your Information</h2>
         <div className="space-y-2">
           {Object.entries(userData).map(([key, value]) => (
             <p key={key} className="border-b border-gray-200 py-2">
               <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
             </p>
           ))}
         </div>
         <button
           onClick={() => setUserData(null)} // Replace with your own back/edit function
           className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition-colors"
         >
           Edit Information
         </button>
       </div>
     );
   } else {
     // Show the form to input the email
     return (
       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
         <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Access Your Voter Information</h2>
         <form onSubmit={handleEmailSubmit} className="space-y-4">
           <div>
             <input
               type="email"
               value={inputEmail}
               onChange={(e) => setInputEmail(e.target.value)}
               placeholder="Enter your email"
               required
               className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
           </div>
           <button
             type="submit"
             disabled={loading}
             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors"
           >
             Submit
           </button>
         </form>
         {loading && <div className="text-center mt-4">Loading...</div>}
         {error && <div className="text-red-500 text-center mt-4">{error}</div>}
       </div>
     );
   }
 };
 
 export default UserDataDisplay;