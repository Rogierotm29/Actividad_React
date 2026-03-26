import React, { useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AuthContext } from '../contexts/AuthContext';

const ProfileView = () => {
  const { user } = useContext(AuthContext);
  const inicial = user?.username?.charAt(0).toUpperCase();

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="sm">

        {/* Cabecera del perfil */}
        <Card elevation={3} sx={{ borderRadius: 4, mb: 3, overflow: 'visible' }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              borderRadius: '16px 16px 0 0',
              height: 100,
            }}
          />
          <CardContent sx={{ pt: 0, pb: 3, px: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'primary.dark',
                fontSize: '2.5rem',
                fontWeight: 700,
                mx: 'auto',
                mt: '-45px',
                border: '4px solid white',
                boxShadow: 3,
              }}
            >
              {inicial}
            </Avatar>

            <Typography variant="h5" fontWeight={700} sx={{ mt: 1.5 }}>
              {user?.username}
            </Typography>

            <Chip
              icon={<CheckCircleIcon />}
              label="Sesión activa"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          </CardContent>
        </Card>

        {/* Detalles */}
        <Card elevation={2} sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AccountCircleIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Información de la cuenta
              </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
                NOMBRE DE USUARIO
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.3 }}>
                {user?.username}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
                ESTADO
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.3, color: 'success.main', fontWeight: 500 }}>
                Conectado
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
                ACERCA DE LA APP
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                Aplicación de una sola página desarrollada con React, Vite, React Router y Material UI.
                Usa Context API para manejar la autenticación.
              </Typography>
            </Box>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default ProfileView;
