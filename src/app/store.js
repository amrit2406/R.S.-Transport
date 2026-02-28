import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import driverReducer from '../features/drivers/driverSlice';
import vehicleReducer from '../features/vehicles/vehicleSlice';
import clientReducer from '../features/clients/clientSlice';
import assignmentReducer from '../features/assignments/assignmentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        drivers: driverReducer,
        vehicles: vehicleReducer,
        clients: clientReducer,
        assignments: assignmentReducer,
    },
});
