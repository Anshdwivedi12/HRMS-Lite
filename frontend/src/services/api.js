import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// ===========================
// EMPLOYEE API FUNCTIONS
// ===========================

export const employeeAPI = {
    // Get all employees
    getAll: async () => {
        const response = await api.get('/employees');
        return response.data;
    },

    // Get single employee
    getById: async (employeeId) => {
        const response = await api.get(`/employees/${employeeId}`);
        return response.data;
    },

    // Create employee
    create: async (employeeData) => {
        const response = await api.post('/employees', employeeData);
        return response.data;
    },

    // Delete employee
    delete: async (employeeId) => {
        const response = await api.delete(`/employees/${employeeId}`);
        return response.data;
    }
};

// ===========================
// ATTENDANCE API FUNCTIONS
// ===========================

export const attendanceAPI = {
    // Mark attendance
    mark: async (attendanceData) => {
        const response = await api.post('/attendance', attendanceData);
        return response.data;
    },

    // Get attendance for specific employee
    getByEmployee: async (employeeId) => {
        const response = await api.get(`/attendance/${employeeId}`);
        return response.data;
    },

    // Get attendance for specific date
    getByDate: async (date) => {
        const response = await api.get(`/attendance/date/${date}`);
        return response.data;
    },

    // Get attendance summary
    getSummary: async (date = null) => {
        const url = date ? `/attendance/summary?date=${date}` : '/attendance/summary';
        const response = await api.get(url);
        return response.data;
    }
};

// Health check
export const healthCheck = async () => {
    const response = await api.get('/health');
    return response.data;
};

export default api;
