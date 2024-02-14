import React, { useEffect, useState } from 'react';

const API_URL = 'https://swapi.dev/api/people';
const RANDOM_IMAGE_BASE_URL = 'https://source.unsplash.com/200x300/?';
const USERS_PER_PAGE = 5;

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const filterUsers = () => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const generateRandomImageUrl = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${RANDOM_IMAGE_BASE_URL}&${randomNumber}`;
  };
  const renderUserCard = (user) => (
    <div
      key={user.name}
      className="user-card bg-white rounded-lg overflow-hidden shadow-lg border-t-4"
      style={{ borderLeft: `4px solid ${user.hair_color}` }}
    >
      <img
        src={generateRandomImageUrl()}
        alt={`Random User - ${user.name}`}
        className="user-image w-full h-32 object-cover object-center"
      />
      <div className="user-info p-4">
        <h2 className="user-name text-lg font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600">Hair Color: {user.hair_color}</p>
        <p className="text-gray-600">Skin Color: {user.skin_color}</p>
        <p className="text-gray-600">Gender: {user.gender}</p>
        <p className="text-gray-600">Vehicles Count: {user.vehicles.length}</p>
      </div>
    </div>
  );

  const renderedUsers = filterUsers().map(renderUserCard);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="user-list-container p-4">
      <h1 className="text-3xl font-bold mb-4">Star Wars Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <input
            type="text"
            className="p-2 mb-4 border border-gray-300 rounded-md w-full"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {renderedUsers}
          </div>
          <div className="pagination mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                } p-2 rounded-md mx-1`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;





