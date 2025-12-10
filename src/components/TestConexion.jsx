// src/components/TestConexion.jsx
import React, { useState } from 'react';
import api from '../services/api';

function TestConexion() {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const probarConexion = async () => {
    try {
      setError('');
      const response = await api.get('/test/saludo');
      setMensaje(response.data);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setMensaje('');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Prueba de conexión Backend-Frontend</h3>
      <button onClick={probarConexion}>
        Probar conexión con backend
      </button>
      
      {mensaje && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          <strong>✅ Éxito:</strong> {mensaje}
        </div>
      )}
      
      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}
    </div>
  );
}

export default TestConexion;