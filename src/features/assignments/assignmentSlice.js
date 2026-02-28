import { createSlice } from '@reduxjs/toolkit';

const assignmentSlice = createSlice({
    name: 'assignments',
    initialState: { list: [], loading: false, error: null },
    reducers: {
        setAssignments: (state, action) => { state.list = action.payload; },
    },
});

export const { setAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;
