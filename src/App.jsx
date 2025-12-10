import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestConexion from './components/TestConexion'; // ← Añade esta importación
import { testConnection } from './services/healthCheck';
import './App.css';

function App() {
  const [conexionEstado, setConexionEstado] = useState(null);

  useEffect(() => {
    // Probar conexión con backend al cargar
    const probar = async () => {
      try {
        await testConnection();
        setConexionEstado('conectado');
      } catch (error) {
        setConexionEstado('error');
        console.error('Error de conexión con backend:', error);
      }
    };
    probar();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Banner de estado de conexión (opcional) */}
        {conexionEstado === 'error' && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            textAlign: 'center',
            borderBottom: '1px solid #ffcdd2'
          }}>
            ⚠️ No se pudo conectar con el backend. Verifica que esté corriendo en localhost:8080
          </div>
        )}
        
        {conexionEstado === 'conectado' && (
          <div style={{
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            padding: '10px',
            textAlign: 'center',
            borderBottom: '1px solid #c8e6c9'
          }}>
            ✅ Conectado al backend correctamente
          </div>
        )}

        {/* Componente de prueba de conexión (solo para desarrollo) */}
        <TestConexion />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;