import axios from 'axios';

const BASE_URL = '/to-do';


const getStoredToken = () => {
  const token = localStorage.getItem('token');
  return token ? token.trim() : null;
};


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getStoredToken() || ''}`
  }
});


api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {

      console.error('No token found');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/login`,
      data: { email },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.data && response.data.data.token) {
      const token = response.data.data.token.trim();

      localStorage.setItem('token', token);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return response.data;
    } else {
      console.error('Estructura de respuesta:', response.data);
      throw new Error('Estructura de token inválida en la respuesta');
    }
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const getTasks = async (page = 1, limit = 5) => {
  try {
    const response = await api.get(`/tasks?page=${page}&limit=${limit}&order=-created_at`);
    return response.data;
  } catch (error) {
    console.error('Error detallado:', error.response || error);
    throw new Error('Error al obtener las tareas');
  }
};

export const createTask = async (user_email, title) => {
  try {
    const response = await api.post('/tasks/create', { user_email, title });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la tarea');
  }
};

export const updateTask = async (taskId) => {
  try {
    const response = await api.patch(`/tasks/update/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la tarea');
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/delete/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar la tarea');
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener la tarea');
  }
}; 