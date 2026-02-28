import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
        { id: 'DRV-001', name: 'Robert Fox', phone: '+91 98765 43210', address: '123 Baker Street, London', truck: 'MH-12-AB-5544', helper: 'Guy Hawkins', work: 'Pune → Mumbai', status: 'Active' },
        { id: 'DRV-002', name: 'Jane Cooper', phone: '+91 98765 43211', address: '456 Elm Street, NY', truck: 'MH-12-XY-1122', helper: 'Eleanor Pena', work: 'Nasik → Pune', status: 'Active' },
        { id: 'DRV-003', name: 'Wade Warren', phone: '+91 98765 43212', address: '789 Oak Avenue, LA', truck: 'MH-12-CD-9988', helper: 'Kristin Watson', work: 'Mumbai → Pune', status: 'Active' },
    ],
    loading: false,
    error: null,
};

const driverSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {
        setDrivers: (state, action) => {
            state.list = action.payload;
        },
        addDriver: (state, action) => {
            state.list.unshift(action.payload);
        },
        updateDriver: (state, action) => {
            const index = state.list.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...action.payload };
            }
        },
        deleteDriver: (state, action) => {
            state.list = state.list.filter(d => d.id !== action.payload);
        },
    },
});

export const { setDrivers, addDriver, updateDriver, deleteDriver } = driverSlice.actions;
export default driverSlice.reducer;
