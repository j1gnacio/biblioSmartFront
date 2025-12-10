// src/components/EjemploComponent.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function EjemploComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/saludo');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const enviarDatos = async () => {
    try {
      const datos = { nombre: 'Juan', email: 'juan@example.com' };
      const response = await api.post('/usuarios', datos);
      console.log('Respuesta:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={enviarDatos}>Enviar Datos</button>
    </div>
  );
}

export default EjemploComponent;