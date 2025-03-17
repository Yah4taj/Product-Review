const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    createdAt: '2023-01-15T08:30:00Z'
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    createdAt: '2023-02-20T10:15:00Z'
  }
];
const getAllUsers = (filters = {}) => {
  let filteredUsers = [...users];
  
  // Apply filters if any
  if (filters.username) {
    filteredUsers = filteredUsers.filter(user => 
      user.username.toLowerCase().includes(filters.username.toLowerCase())
    );
  }
  
  return filteredUsers;
};

const getUserById = (id) => {
  return users.find(user => user.id === id);
};

const createUser = (userData) => {
  const newUser = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) return null;
  
  const updatedUser = {
    ...users[index],
    ...userData,
    id: users[index].id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  users[index] = updatedUser;
  return updatedUser;
};

const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
