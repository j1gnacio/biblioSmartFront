import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  MenuBook as BookIcon,
  People as PeopleIcon,
  SwapHoriz as LoanIcon,
  CheckCircle as AvailableIcon,
  Cancel as UnavailableIcon,
  TrendingUp as StatsIcon,
  Notifications as NotifIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { testConnection } from '../services/healthCheck';

function Dashboard() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [stats, setStats] = useState({
    books: 156,
    available: 128,
    loans: 28,
    users: 42,
    pendingReturns: 7
  });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await testConnection();
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('disconnected');
        console.error('Backend error:', error);
      }
    };
    checkBackend();
  }, []);

  const statusChip = {
    connected: { label: 'Conectado', color: 'success', icon: <AvailableIcon /> },
    disconnected: { label: 'Desconectado', color: 'error', icon: <UnavailableIcon /> },
    checking: { label: 'Verificando...', color: 'warning', icon: <SettingsIcon /> }
  }[backendStatus];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: '#1976d2', color: 'white' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold">
              📚 BiblioSmart Dashboard
            </Typography>
            <Typography variant="subtitle1">
              Sistema de Gestión de Biblioteca Inteligente
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2}>
            <Chip
              label={statusChip.label}
              color={statusChip.color}
              icon={statusChip.icon}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <IconButton color="inherit">
              <NotifIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: '#1976d2', margin: '0 auto 10px' }}>
                <BookIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {stats.books}
              </Typography>
              <Typography color="textSecondary">
                Libros Totales
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(stats.available / stats.books) * 100} 
                sx={{ mt: 2 }}
                color="success"
              />
              <Typography variant="caption">
                {stats.available} disponibles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: '#2e7d32', margin: '0 auto 10px' }}>
                <AvailableIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {stats.available}
              </Typography>
              <Typography color="textSecondary">
                Disponibles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: '#ed6c02', margin: '0 auto 10px' }}>
                <LoanIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {stats.loans}
              </Typography>
              <Typography color="textSecondary">
                Préstamos Activos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: '#9c27b0', margin: '0 auto 10px' }}>
                <PeopleIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {stats.users}
              </Typography>
              <Typography color="textSecondary">
                Usuarios
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: '#d32f2f', margin: '0 auto 10px' }}>
                <StatsIcon />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                {stats.pendingReturns}
              </Typography>
              <Typography color="textSecondary">
                Devoluciones Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Acciones Rápidas
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              {[
                { label: 'Agregar Nuevo Libro', color: 'primary', icon: <BookIcon /> },
                { label: 'Registrar Préstamo', color: 'success', icon: <LoanIcon /> },
                { label: 'Registrar Devolución', color: 'warning', icon: <AvailableIcon /> },
                { label: 'Agregar Usuario', color: 'info', icon: <PeopleIcon /> },
                { label: 'Generar Reportes', color: 'secondary', icon: <StatsIcon /> },
                { label: 'Configuración', color: 'inherit', icon: <SettingsIcon /> }
              ].map((action, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Button
                    variant="outlined"
                    startIcon={action.icon}
                    fullWidth
                    sx={{ 
                      height: '100px',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 1,
                      borderStyle: 'dashed',
                      borderWidth: 2
                    }}
                    color={action.color}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {action.label}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Actividad Reciente
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { user: 'Ana López', action: 'tomó prestado "Cien años de soledad"', time: 'Hace 2 horas' },
                { user: 'Carlos Ruiz', action: 'devolvió "El principito"', time: 'Hace 4 horas' },
                { user: 'María García', action: 'se registró como nuevo usuario', time: 'Ayer' },
                { user: 'Admin', action: 'agregó 5 nuevos libros', time: '15/12/2025' }
              ].map((activity, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {activity.user}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {activity.action}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {activity.time}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Backend Connection Status */}
      {backendStatus === 'connected' && (
        <Paper 
          elevation={1} 
          sx={{ 
            mt: 4, 
            p: 2, 
            bgcolor: '#e8f5e9', 
            borderLeft: '4px solid #2e7d32',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <AvailableIcon color="success" />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              ✅ Backend Conectado
            </Typography>
            <Typography variant="caption">
              Servidor Spring Boot funcionando en http://localhost:8080
            </Typography>
          </Box>
        </Paper>
      )}

      {backendStatus === 'disconnected' && (
        <Paper 
          elevation={1} 
          sx={{ 
            mt: 4, 
            p: 2, 
            bgcolor: '#ffebee', 
            borderLeft: '4px solid #d32f2f',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <UnavailableIcon color="error" />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              ⚠️ Backend Desconectado
            </Typography>
            <Typography variant="caption">
              No se puede conectar con el servidor en localhost:8080
            </Typography>
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Dashboard;