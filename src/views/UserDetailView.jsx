import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import { getUserById } from '../services/userService';

const UserDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ciclo de vida: mount y unmount
  useEffect(() => {
    console.log('Componente UserDetailView montado');
    return () => {
      console.log('Componente UserDetailView desmontado');
    };
  }, []);

  // Ciclo de vida: actualización cuando cambia el id
  useEffect(() => {
    console.log('Componente UserDetailView actualizado — id:', id);
    setLoading(true);
    setError('');
    getUserById(id)
      .then((data) => setUser(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/users')}
          sx={{ mb: 3 }}
        >
          Volver a usuarios
        </Button>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && user && (
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: '16px 16px 0 0',
                height: 100,
              }}
            />
            <CardContent sx={{ pt: 0, pb: 4, px: 4, textAlign: 'center' }}>
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
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h5" fontWeight={700} sx={{ mt: 1.5 }}>
                {user.username}
              </Typography>

              <Chip
                label={user.role}
                color={user.role === 'admin' ? 'primary' : 'default'}
                size="small"
                sx={{ mt: 1, textTransform: 'capitalize' }}
              />

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PersonIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
                      USUARIO
                    </Typography>
                    <Typography variant="body1">{user.username}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
                      EMAIL
                    </Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <BadgeIcon color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
                      ROL
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default UserDetailView;
