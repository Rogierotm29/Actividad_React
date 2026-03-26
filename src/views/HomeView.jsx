import React, { useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import RouteIcon from '@mui/icons-material/AltRoute';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import { AuthContext } from '../contexts/AuthContext';

const tecnologias = [
  {
    icon: <BoltIcon fontSize="large" color="primary" />,
    titulo: 'React + Vite',
    descripcion: 'Proyecto creado con Vite para un desarrollo rápido y un build optimizado.',
  },
  {
    icon: <RouteIcon fontSize="large" color="primary" />,
    titulo: 'React Router',
    descripcion: 'Navegación entre vistas con rutas protegidas según el estado de autenticación.',
  },
  {
    icon: <PaletteIcon fontSize="large" color="primary" />,
    titulo: 'Material UI',
    descripcion: 'Componentes de interfaz basados en Material Design para una apariencia profesional.',
  },
  {
    icon: <CodeIcon fontSize="large" color="primary" />,
    titulo: 'Context API + Hooks',
    descripcion: 'Estado global de sesión manejado con useContext, useState y createContext.',
  },
];

const HomeView = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">

        {/* Encabezado */}
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 3,
            p: 4,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Bienvenido, {user?.username}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, mt: 1 }}>
              Actividad React — Aplicación de una sola página con autenticación y navegación
            </Typography>
          </Box>
          <Chip
            icon={<CheckCircleIcon />}
            label="Sesión activa"
            sx={{ backgroundColor: 'white', color: 'primary.main', fontWeight: 600 }}
          />
        </Box>

        {/* Cards de tecnologías */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#333' }}>
          Tecnologías utilizadas
        </Typography>
        <Grid container spacing={3}>
          {tecnologias.map((tec, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    {tec.icon}
                    <Typography variant="h6" fontWeight={600}>
                      {tec.titulo}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {tec.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default HomeView;
