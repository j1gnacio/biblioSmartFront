import api from './api';

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    console.log('Backend conectado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error conectando al backend:', error);
    
    // Si el endpoint /health no existe, probamos alternativas
    const endpoints = ['/api/health', '/actuator/health'];
    
    for (const endpoint of endpoints) {
      try {
        const altResponse = await api.get(endpoint);
        console.log(`Backend conectado (${endpoint}):`, altResponse.data);
        return altResponse.data;
      } catch (altError) {
        console.log(`Endpoint ${endpoint} no disponible`);
      }
    }
    
    throw error;
  }
};

// Prueba de conexión automática
export const testConnection = async () => {
  console.log('Probando conexión con backend...');
  try {
    await healthCheck();
  } catch (error) {
    console.warn('No se pudo conectar al backend. Asegúrate de que esté ejecutándose en puerto 8080');
  }
};