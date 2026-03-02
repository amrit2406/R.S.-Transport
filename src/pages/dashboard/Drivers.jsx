import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdAdd, MdSearch, MdFilterList, MdMoreVert, MdPhone,
    MdAssignmentInd, MdPerson, MdVerified, MdEdit, MdDelete,
    MdBadge, MdFingerprint, MdCreditCard, MdContactPhone
} from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import DriverForm from '../../components/forms/DriverForm';
import { addDriver, deleteDriver, setDrivers } from '../../features/drivers/driverSlice';
import axiosInstance from '../../services/axios';

const Drivers = () => {
    const dispatch = useDispatch();
    const driversData = useSelector(state => state.drivers.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/users/onboard');
            const list = response.data.data || response.data || [];
            dispatch(setDrivers(list));
        } catch (error) {
            console.error('Failed to fetch drivers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterDriver = async (payload) => {
        try {
            const response = await axiosInstance.post('/api/users/onboard', payload);
            if (response.status === 200 || response.status === 201) {
                fetchDrivers();
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Onboarding failed:', error);
            const msg = error.response?.data?.message || 'Onboarding failed. Please check the data.';
            alert(msg);
        }
    };

    const handleDeleteDriver = (id) => {
        if (window.confirm('Wipe personnel record from the local fleet intelligence?')) {
            dispatch(deleteDriver(id));
            setActiveMenuId(null);
        }
    };

    const columns = [
        {
            header: 'Fleet Identity', accessor: 'name', render: (row) => (
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 overflow-hidden shadow-sm">
                        <img src={`https://ui-avatars.com/api/?name=${row.name}&background=f8f9fa&color=2563eb&bold=true`} alt={row.name} className="opacity-80" />
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span className="font-black text-slate-800 text-sm tracking-tight">{row.name}</span>
                            <MdVerified className="ml-1.5 text-blue-500" size={14} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mt-0.5">{row.phone}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Professional Audit', accessor: 'drivingLicenseNumber', render: (row) => (
                <div className="space-y-1.5">
                    <div className="flex items-center text-[11px] font-black text-slate-700">
                        <MdBadge size={16} className="text-primary-500 mr-2" />
                        <span>{row.drivingLicenseNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-100 uppercase">{row.licenseType}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">EXP: {row.licenseExpiryDate}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Security Clearance', accessor: 'identity', render: (row) => (
                <div className="space-y-1.5">
                    <div className="flex items-center text-[10px] font-bold text-slate-600">
                        <MdFingerprint size={16} className="text-slate-300 mr-2" />
                        <span className="font-mono">AADHAR: {row.aadharNumber ? `****${row.aadharNumber.slice(-4)}` : '----'}</span>
                    </div>
                    <div className="flex items-center text-[10px] font-bold text-slate-600">
                        <MdCreditCard size={16} className="text-slate-300 mr-2" />
                        <span className="font-mono uppercase">PAN: {row.panNumber || '----'}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Crisis Signal', accessor: 'emergency', render: (row) => (
                <div className="space-y-1">
                    <div className="text-[10px] font-black text-slate-800 flex items-center">
                        <MdContactPhone className="text-rose-500 mr-2" size={14} />
                        {row.emergencyContactName || '---'}
                    </div>
                    <p className="text-[9px] font-bold text-slate-400">{row.emergencyContactPhone || '---'}</p>
                </div>
            )
        },
        {
            header: 'Fleet Intel', accessor: 'exp', render: (row) => (
                <div className="space-y-1">
                    <div className="flex items-center text-xs font-black text-slate-600">
                        {row.yearsOfExperience} YRS EXP
                    </div>
                    <div className="text-[9px] font-black text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100 w-fit">
                        {row.preferredVehicleType}
                    </div>
                </div>
            )
        },
        {
            header: '', accessor: 'actions', render: (row) => (
                <div className="relative">
                    <button
                        onClick={() => setActiveMenuId(activeMenuId === row._id ? null : row._id)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${activeMenuId === row._id ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-700'}`}
                    >
                        <MdMoreVert size={24} />
                    </button>
                    <AnimatePresence>
                        {activeMenuId === row._id && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)}></div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-50 z-20 overflow-hidden"
                                >
                                    <div className="p-2 space-y-1">
                                        <button className="w-full flex items-center px-4 py-3 text-[11px] font-black text-slate-600 hover:bg-slate-50 hover:text-primary-600 rounded-xl transition-all uppercase tracking-wider">
                                            <MdEdit className="mr-3" size={18} />
                                            Update Assets
                                        </button>
                                        <div className="border-t border-slate-50 my-1"></div>
                                        <button onClick={() => handleDeleteDriver(row._id)} className="w-full flex items-center px-4 py-3 text-[11px] font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all uppercase tracking-wider">
                                            <MdDelete className="mr-3" size={18} />
                                            Terminate Asset
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            )
        },
    ];

    const filteredDrivers = (driversData || []).filter(driver =>
        (driver.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (driver.drivingLicenseNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (driver.aadharNumber || '').includes(searchTerm)
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-primary-600 font-bold text-[10px] uppercase tracking-[4pt] mb-3">
                        <MdPerson size={16} />
                        <span>Workforce Intelligence Ledger</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter">Fleet Personnel</h2>
                    <p className="text-slate-500 font-medium text-lg mt-2 tracking-tight">Access the highly-secured registry of verified carrier identities and operational credentials.</p>
                </div>
                <Button icon={MdAdd} size="lg" className="shadow-2xl shadow-primary-500/30 !rounded-2xl" onClick={() => setIsModalOpen(true)}>
                    Initialize Onboarding
                </Button>
            </div>

            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 border border-slate-100 shadow-sm">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan Workforce Ledger: Name, License, UID or PAN..."
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-bold focus:ring-4 focus:ring-primary-50 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" icon={MdFilterList} className="!rounded-2xl text-[10px] uppercase tracking-widest px-6">Protocols</Button>
                    <Button variant="secondary" icon={MdAssignmentInd} className="!rounded-2xl text-[10px] uppercase tracking-widest px-6" onClick={fetchDrivers}>Refresh Audit</Button>
                </div>
            </div>

            <div className="premium-card !p-0 overflow-hidden border border-slate-50 shadow-heavy rounded-[32px]">
                {isLoading ? (
                    <div className="p-20 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-slate-500 font-black text-[10px] uppercase tracking-widest">Accessing Ledger...</p>
                    </div>
                ) : (
                    <Table columns={columns} data={filteredDrivers} />
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Carrier Registration Terminal" maxWidth="max-w-4xl">
                <DriverForm onSubmit={handleRegisterDriver} onCancel={() => setIsModalOpen(false)} />
            </Modal>

        </div >
    );
};

export default Drivers;
