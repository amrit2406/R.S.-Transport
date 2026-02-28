import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
    name: 'clients',
    initialState: { list: [], loading: false, error: null },
    reducers: {
        setClients: (state, action) => { state.list = action.payload; },
    },
});

export const { setClients } = clientSlice.actions;
export default clientSlice.reducer;
