import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../scripts/firebaseInit';
import { UserInfo } from '@/stores/user.store';
import { useStore } from '@nanostores/react'

const UserDataDisplay = () => {
  // State to store user data, loading status, errors, edit mode status, edited data, delete mode status, and fields marked for deletion.
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteFields, setDeleteFields] = useState({});
  const $userInfo = useStore(UserInfo)

  // Fetches user data on component mount or when user information changes.
  useEffect(() => {

    console.log($userInfo.email)

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "users", $userInfo.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setEditedData(docSnap.data());
        } else {
          setError("No user found with that email.");
        }
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Handles enabling edit mode.
  const handleEdit = () => {
    setEditMode(true);
  };

   // Handles changes to input fields.
  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  // Toggles delete mode on and off.
  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setDeleteFields({});
  };
 
  // Marks or unmarks a field for deletion.
  const handleDeleteField = (fieldName) => {
    const updatedFields = { ...deleteFields };
    updatedFields[fieldName] = !updatedFields[fieldName];
    setDeleteFields(updatedFields);
  };

  // Deletes selected fields.
  const handleDeleteSelected = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const docRef = doc(db, "users", $userInfo.email);
      const updatedData = { ...userData };
  
      for (const field in deleteFields) {
        if (deleteFields[field]) {
          delete updatedData[field];
          await deleteField(docRef, field);
        }
      }
  
      setUserData(updatedData);
      setDeleteFields({});
      setDeleteMode(false);
    } catch (err) {
      setError(err.message);
    }
  
    setLoading(false);
  };
  
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all your PII?")) {
      setLoading(true);
      setError(null);
  
      try {
        const docRef = doc(db, "users", $userInfo.email);
        await updateDoc(docRef, {});
        setUserData({});
        setDeleteFields({});
        setDeleteMode(false);
      } catch (err) {
        setError(err.message);
      }
  
      setLoading(false);
    }
  };
  

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "users", $userInfo.email);
      await updateDoc(docRef, editedData);
      setUserData(editedData);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Your Information</h2>
      {editMode ? (
        <form className="space-y-4">
          {Object.entries(userData).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-1 font-semibold text-gray-600">{key}:</label>
              <input
                type="text"
                name={key}
                value={editedData[key] || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {Object.entries(userData).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-600">{key}:</div>
                <div>{value}</div>
              </div>
              {deleteMode && (
                <input
                  type="checkbox"
                  onChange={() => handleDeleteField(key)}
                  checked={deleteFields[key]}
                />
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={handleDeleteMode}
              className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
            >
              {deleteMode ? 'Cancel Delete' : 'Delete Mode'}
            </button>
            <button
              onClick={handleEdit}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition-colors"
            >
              Edit Information
            </button>
          </div>
          {deleteMode && (
            <div className="mt-4">
              <button
                onClick={handleDeleteSelected}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors mr-2"
              >
                Delete Selected Fields
              </button>
              <button
                onClick={handleDeleteAll}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Delete All PII
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default UserDataDisplay;
