import PouchDB from 'pouchdb';

// Create a new PouchDB instance
const db = new PouchDB('users');

// Save user data to the database

function saveUser(user) {
    console.log("hello", user);
    
    db.post(user)
      .then(function(response) {
        console.log("response",response)  
        console.log('User saved to the database:'+ JSON.stringify(response));
      })
      .catch(function(err) {
        console.error('Error saving user:', err);
      });
  }
  

// Fetch all users from the database
function fetchAllUsers(setUsers) {
  db.allDocs({ include_docs: true })
    .then(function (result) {
      const users = result.rows.map((row) => row.doc);
      console.log('Fetched all users:', users);
      setUsers(users);
    })
    .catch(function (err) {
      console.error('Error fetching users:', err);
    });
}

// Fetch a specific user by ID from the database
// function fetchUserById(id) {
//   db.get(id)
//     .then(function (doc) {
//       console.log('Fetched user by ID:', doc);
//     })
//     .catch(function (err) {
//       console.error('Error fetching user by ID:', err);
//     });
// }
// Fetch a specific user by ID from the database
function fetchUserById(id) {
    return new Promise((resolve, reject) => {
      db.get(id)
        .then(function (doc) {
          resolve(doc); // Resolve with the fetched user document
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
  

// Update user data in the database
function updateUser(user) {
  db.put(user)
    .then(function (response) {
      console.log('User updated in the database:', response);
    })
    .catch(function (err) {
      console.error('Error updating user:', err);
    });
}

// Delete a user from the database
function deleteUser(user) {
  db.remove(user._id, user._rev)
    .then(function (response) {
      console.log('User deleted from the database:', response);
    })
    .catch(function (err) {
      console.error('Error deleting user:', err);
    });
}

export { saveUser, fetchAllUsers, fetchUserById, updateUser, deleteUser };
