import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState: { list: [], loading: false, error: null },
    reducers: {
        setVehicles: (state, action) => { state.list = action.payload; },
    },
});

export const { setVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
