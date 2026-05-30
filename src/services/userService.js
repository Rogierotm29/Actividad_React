const BASE_URL = "https://actividadapi.onrender.com";

export const getUsers = async (token) => {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const createUser = async (data, token) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
};

export const deleteUser = async (id, token) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar usuario");
  return res.json();
};

export const getUserById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
};
