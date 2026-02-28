import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
        {
            id: 'DRV-001',
            name: 'Robert Fox',
            dateOfBirth: '1988-03-12',
            gender: 'male',
            phone: '9000000001',
            email: 'robert.fox@example.com',
            password: 'Driver@123',
            role: 'driver',
            permanentAddress: 'Village Road, Puri, Odisha',
            currentAddress: 'Rental Colony, Bhubaneswar, Odisha',
            drivingLicenseNumber: 'OD1420110010001',
            licenseType: 'hmv',
            licenseExpiryDate: '2028-06-15',
            licenseIssuingState: 'Odisha',
            yearsOfExperience: 10,
            preferredVehicleType: 'truck',
            canDriveVehicleTypes: ['truck', 'van'],
            aadharNumber: '123412340001',
            panNumber: 'ABCDE1001F',
            passportNumber: 'P1000001',
            emergencyContactName: 'Suresh Kumar',
            emergencyContactRelationship: 'Brother',
            emergencyContactPhone: '9888888888',
            status: 'Active',
            work: 'Active Deployment'
        },
        {
            id: 'DRV-002',
            name: 'Jane Cooper',
            dateOfBirth: '1995-07-22',
            gender: 'female',
            phone: '9000000002',
            email: 'jane.cooper@example.com',
            password: 'Driver@123',
            role: 'driver',
            permanentAddress: 'Main Road, Mumbai, Maharashtra',
            currentAddress: 'Colaba, Mumbai, Maharashtra',
            drivingLicenseNumber: 'MH1220150012345',
            licenseType: 'lmv',
            licenseExpiryDate: '2030-01-10',
            licenseIssuingState: 'Maharashtra',
            yearsOfExperience: 5,
            preferredVehicleType: 'van',
            canDriveVehicleTypes: ['van', 'pickup'],
            aadharNumber: '123412340002',
            panNumber: 'ABCDE1002G',
            passportNumber: 'P1000002',
            emergencyContactName: 'Anita Cooper',
            emergencyContactRelationship: 'Mother',
            emergencyContactPhone: '9777777777',
            status: 'Active',
            work: 'Awaiting Assignment'
        }
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
