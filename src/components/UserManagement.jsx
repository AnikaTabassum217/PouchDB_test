import React, { useState, useEffect } from 'react';
import { saveUser, fetchAllUsers, fetchUserById, updateUser, deleteUser } from '../db';
import Modal from 'react-modal';
import FormModal from './FormModal';


function UserManagement() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [users, setUsers] = useState([]);
  const [editUsers, setEditUser] = useState([]);
  const [newUser, setNewUser] = useState({
    fullName: '',
    age: '',
    address: ''
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchAllUsers(setUsers);
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSaveUser = () => {
    saveUser(newUser);
    setNewUser({
      fullName: '',
      age: '',
      address: ''
    });
  };

  const handleFetchAllUsers = () => {
    fetchAllUsers(setUsers);
  };

  const handleFetchUserById = (id) => {
    fetchUserById(id)
      .then((user) => {
        // alert(`Fetched user by ID:\n${JSON.stringify(user)}`);
        setSelectedUser(user);
        localStorage.setItem('selectedUser', JSON.stringify(user));
        openModal();
      })
      .catch((err) => {
        console.error('Error fetching user by ID:', err);
      });
  };
  

  const handleUpdateUser = (user) => {
    updateUser(user);
  };

  const handleDeleteUser = (user) => {
    deleteUser(user);
  };

  return (
    <div>
      <h2>User Management</h2>
      <div>
        <h3>Add User</h3>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={newUser.fullName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={newUser.age}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newUser.address}
          onChange={handleInputChange}
        />
        <button onClick={handleSaveUser}>Save User</button>
      </div>
      <div>
        <h3>All Users</h3>
        <button onClick={handleFetchAllUsers}>Fetch All Users</button>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.fullName}, Age: {user.age}, Address: {user.address}
              {/* <button onClick={() => handleFetchUserById(user._id)}>Edit</button>
              <button onClick={openModal}>Edit</button> */}
              <button onClick={() => { handleFetchUserById(user._id); openModal(); }}>Edit</button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Form Modal"
              >
                {/* <FormModal closeModal={closeModal} /> */}
                <FormModal closeModal={closeModal} userData={selectedUser} />
              </Modal>


              <button onClick={() => handleDeleteUser(user)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserManagement;
