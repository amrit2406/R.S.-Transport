import axiosInstance from '../../services/axios';
export const getVehiclesAPI = () => axiosInstance.get('/vehicles');
