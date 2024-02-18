import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  return (
    <div className="container">
      <div className='row'>
      <h1>User List</h1></div>
      <div className='row'>
      <UserForm addUser={addUser} updateUser={updateUser} editingUser={editingUser} />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="btn btn-primary" onClick={() => editUser(user)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserList;
