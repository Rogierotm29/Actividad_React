import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Inicio
          </Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>
            Mi Perfil
          </Button>
          <Button color="inherit" onClick={() => navigate('/users')}>
            Usuarios
          </Button>
        </Box>
        <Box sx={{ mr: 2 }}>
          Bienvenido, {user?.username}
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
