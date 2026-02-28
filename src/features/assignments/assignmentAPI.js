import axiosInstance from '../../services/axios';
export const getAssignmentsAPI = () => axiosInstance.get('/assignments');
