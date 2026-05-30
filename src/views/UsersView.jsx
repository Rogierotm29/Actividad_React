import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useUsers from '../hooks/useUsers';

const emptyForm = { username: '', password: '', email: '', role: 'user' };

const UsersView = () => {
  const { users, loading, error, addUser, removeUser } = useUsers();
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await removeUser(id);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password || !form.email) {
      setFormError('Todos los campos son obligatorios');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      await addUser(form);
      setForm(emptyForm);
      setDialogOpen(false);
    } catch (e) {
      setFormError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>
            Usuarios
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Agregar usuario
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Usuario</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>Rol</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Detalle</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }} align="center">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No hay usuarios registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id} hover>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => navigate(`/users/${user._id}`)}>
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => handleDelete(user._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle fontWeight={700}>Nuevo usuario</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '16px !important' }}>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
              label="Usuario"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              fullWidth
            />
            <TextField
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => { setDialogOpen(false); setFormError(''); setForm(emptyForm); }}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};

export default UsersView;
