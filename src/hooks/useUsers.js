import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser } from '../services/userService';
import useAuth from './useAuth';

const useUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const addUser = async (form) => {
    const newUser = await createUser(form, token);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const removeUser = async (id) => {
    await deleteUser(id, token);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return { users, loading, error, addUser, removeUser };
};

export default useUsers;
