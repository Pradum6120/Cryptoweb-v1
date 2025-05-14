import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

function Adminairdrops() {
  const { AuthorizationToken } = useAuth();
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    const fetchAirdrops = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/allairdropadmin', {
          method: 'GET',
          headers: {
            Authorization: AuthorizationToken,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'An error occurred while fetching airdrops');
        }

        const data = await response.json();
        setAirdrops(data);
      } catch (error) {
        setError(error.message);
        console.error('Error occurred while fetching airdrops:', error);
      } finally {
        setLoading(false);
        
      }
    };

    useEffect(() => {

    fetchAirdrops();
    
  }, [AuthorizationToken]);

  // Delete function
  const deleteAirdrop = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchAirdrops()
      } else {
        throw new Error(data.message || 'Failed to delete airdrop');
      }
    } catch (error) {
      alert('Failed to delete airdrop');
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto flex rounded-md w-[100%]">
      <table className="shadow-2xl w-[100%] flex flex-col">
        <thead className="flex flex-col justify-center items-center w-[100%] h-[60px] bg-[#718769] gap-28">
          <tr className="flex justify-center items-center gap-56 w-[100%] h-[60px] bg-[#4B6F44]">
            <th className="text-2xl sticky">Airdrop lists</th>
          </tr>
        </thead>

        <tbody className="flex flex-col w-[100%] gap-8 mt-8">
          {airdrops.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">
                No airdrops available
              </td>
            </tr>
          ) : (
            airdrops.data.airdrop.map((airdrop) => (
              <tr key={airdrop.id} className="w-[100%] h-20 flex justify-around items-center bg-[#718769]">
                <td>
                  <div className="flex items-center gap-5">
                    <div className="avatar flex">
                      <div className="mask mask-squircle h-12 w-12 rounded-full">
                        <img className="rounded-full h-12 w-12" src={airdrop.profileimage} alt={airdrop.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{airdrop.title}</div>
                      <div className="text-sm opacity-50">{airdrop.description}</div>
                    </div>
                  </div>
                </td>
                <td className="flex gap-16">
                  <button className="bg-green-500 h-[30px] w-[90px] rounded-xl p-1 shadow-xl">Edit</button>
                  <button
                    className="bg-red-600 h-[30px] w-[90px] rounded-xl p-1 shadow-xl"
                    onClick={() => deleteAirdrop(airdrop._id)} // Correctly pass the id to deleteUser
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Adminairdrops;
