import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to="/create" className="btn btn-primary mb-4">Create New User</Link>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none block md:table-row">
            <th className="block md:table-cell p-2 text-left">Name</th>
            <th className="block md:table-cell p-2 text-left">Email</th>
            <th className="block md:table-cell p-2 text-left">Phone</th>
            <th className="block md:table-cell p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {users.map(user => (
            <tr key={user.id} className="block md:table-row">
              <td className="block md:table-cell p-2">{user.name}</td>
              <td className="block md:table-cell p-2">{user.email}</td>
              <td className="block md:table-cell p-2">{user.phone}</td>
              <td className="block md:table-cell p-2">
                <Link to={`/user/${user.id}`} className="btn btn-info">View</Link>
                <Link to={`/edit/${user.id}`} className="btn btn-warning ml-2">Edit</Link>
                <button onClick={() => deleteUser(user.id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
