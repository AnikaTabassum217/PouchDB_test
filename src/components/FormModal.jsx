
import React, { useState, useEffect } from 'react';

const FormModal = ({ closeModal, userData }) => {
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  

  useEffect(() => {
    // Set the initial form values based on the passed user data
    setId(userData?.id|| '');//userData?._id 
    setFullName(userData?.fullName || '');
    setAge(userData?.age || '');
    setAddress(userData?.address || '');
    
  }, [userData]);

  // const handleIdChange = (event)=>{
  //   setId(event.target.value)
  // }

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    const updatedUser = {
      ...userData,
      id:id,
      fullName: fullName,
      age: age,
      address: address
    };
    console.log('Updated user:', updatedUser);
    // Close the modal
    closeModal();
  };

  const handleUpdate = (id) => {
   
    const updatedUser = {
      
      id:JSON.stringify(userData?._id), // Assuming the user data contains an 'id' field
      fullName: fullName,
      age: age,
      address: address,
      
    };
    
    const message = `Update button clicked\n\nID: ${updatedUser.id}\nFull Name: ${updatedUser.fullName}\nAge: ${updatedUser.age}\nAddress: ${updatedUser.address}`;
    console.log('Fetched all Info:', userData)
    alert(message);
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullName}
          onChange={handleFullNameChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={age}
          onChange={handleAgeChange}
          placeholder="Age"
        />
        <input
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Address"
        />
        <button type="button" onClick={handleUpdate}>Update</button>
        <button type="submit">Back</button>
      </form>
    </div>
  );
};

export default FormModal;
