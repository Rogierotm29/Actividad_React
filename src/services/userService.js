let mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'usuario', email: 'usuario@example.com', role: 'user' },
  { id: 3, username: 'juan', email: 'juan@example.com', role: 'user' },
];

export const getUsers = async () => {
  return [...mockUsers];
};

export const createUser = async (data) => {
  const newUser = { id: Date.now(), ...data };
  mockUsers.push(newUser);
  return newUser;
};

export const deleteUser = async (id) => {
  mockUsers = mockUsers.filter((u) => u.id !== id);
  return { success: true };
};
