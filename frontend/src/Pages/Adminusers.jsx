import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

function Adminusers() {
  const { AuthorizationToken } = useAuth();
  const [users, setUsers] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users when component mounts
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://cryptoweb-8nuf.onrender.com/api/v1/users', {
          method: 'GET',
          headers: {
            Authorization: AuthorizationToken, // Include the Authorization token for authentication
          },
        });
        const data = await response.json();
        
        if (response.ok) {
          setUsers(data); // Assuming `data` is an array of users
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error occurred while fetching users:", error);
        alert('An error occurred while fetching users');
      } finally {
        setLoading(false); // Set loading to false once the fetch completes (either success or error)
      }
    };

    useEffect(() => {
    fetchUsers();
  }, [AuthorizationToken]);
  
  

  const HandleDelete = async (id) => {
      try {
        const response = await fetch(`https://cryptoweb-8nuf.onrender.com/api/v1/deleteuser/${id}`,{
          method: 'DELETE',
        headers: {
          Authorization: AuthorizationToken,
        },
        })
        const data = await response.json();
        if (response.ok) {
          fetchUsers()
        } else {
          throw new Error(data.message || 'Failed to delete airdrop');
        }
      } catch (error) {
        alert('Failed to delete airdrop');
      }

  }

  return (
    <div className="overflow-x-auto w-full rounded-md">
      {/* Loading state display */}
      {loading ? (
        <div className="text-center py-4">
          <p>Loading users...</p>
        </div>
      ) : (
        <table className="w-full flex flex-col">
          {/* Head */}
          <thead className="h-[50px] w-full items-center justify-center">
            <tr className="flex justify-between bg-[#4B6F44] pr-12 pl-12 items-center h-[50px]">
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="w-full flex flex-col gap-4">
            {/* Dynamically rendering users */}
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">No users found</td>
              </tr>
            ) : (
              users.user.map((user) => (
                <tr key={user.id} className="flex justify-between mt-6 bg-[#4B6F44] h-[60px] p-6 items-center w-full">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="flex gap-3">
                    <button className="bg-green-500 h-[30px] w-[90px] rounded-xl p-1 shadow-xl">Edit</button>
                    <button className="bg-red-600 h-[30px] w-[90px] rounded-xl p-1 shadow-xl" onClick={()=> HandleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Adminusers;
