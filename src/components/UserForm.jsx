// src/components/UserForm.js (update)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ addUser, updateUser, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

    useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [editingUser]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name,
        email,
        phone
      });
      addUser(response.data);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
        name,
        email,
        phone
      });
      updateUser({
        id: editingUser.id,
        name,
        email,
        phone
      });
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form onSubmit={editingUser ? handleUpdate : handleAdd}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      {editingUser ? (
        <button type="submit">Update User</button>
      ) : (
        <button type="submit">Add User</button>
      )}
    </form>
  );
};

export default UserForm;
