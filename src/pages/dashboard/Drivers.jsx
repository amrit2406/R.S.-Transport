import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdSearch, MdFilterList, MdMoreVert, MdPhone, MdAssignmentInd, MdPerson, MdVerified, MdEdit, MdDelete } from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import DriverForm from '../../components/forms/DriverForm';
import { addDriver, deleteDriver } from '../../features/drivers/driverSlice';

const Drivers = () => {
    const dispatch = useDispatch();
    const driversData = useSelector(state => state.drivers.list);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);

    const handleRegisterDriver = (data) => {
        const newDriver = {
            ...data,
            id: `DRV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            status: 'Active',
            work: 'Awaiting Assignment'
        };
        dispatch(addDriver(newDriver));
        setIsModalOpen(false);
    };

    const handleDeleteDriver = (id) => {
        if (window.confirm('Are you sure you want to remove this personnel from the fleet?')) {
            dispatch(deleteDriver(id));
            setActiveMenuId(null);
        }
    };

    const columns = [
        {
            header: 'Personnel Identity', accessor: 'name', render: (row) => (
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-[18px] bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 group-hover/row:border-primary-200 transition-colors overflow-hidden">
                        {row.image ? (
                            <img src={row.image} alt={row.name} className="w-full h-full object-cover" />
                        ) : (
                            <img src={`https://i.pravatar.cc/150?u=${row.id}`} alt={row.name} className="opacity-80" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span className="font-black text-slate-800 text-[15px] tracking-tight">{row.name}</span>
                            <MdVerified className="ml-1.5 text-blue-500" size={14} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{row.id}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact', accessor: 'phone', render: (row) => (
                <div className="flex items-center font-bold text-slate-500">
                    <MdPhone size={14} className="text-slate-300 mr-2" />
                    <span className="text-xs">{row.phone}</span>
                </div>
            )
        },
        {
            header: 'Truck Assigned',
            accessor: 'truck',
            render: (row) => (
                <div className="flex items-center">
                    <span className="font-mono text-xs font-black bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100 uppercase tracking-tight">
                        {row.truck || 'Pending'}
                    </span>
                </div>
            )
        },
        {
            header: 'Helper',
            accessor: 'helper',
            render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                    <span className="font-bold text-slate-600 text-sm">{row.helper}</span>
                </div>
            )
        },
        {
            header: 'Deployment',
            accessor: 'work',
            render: (row) => (
                <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 w-fit">
                    <span className="font-black text-slate-500 text-[10px] uppercase tracking-tighter">{row.work}</span>
                </div>
            )
        },
        {
            header: '', accessor: 'actions', render: (row) => (
                <div className="relative">
                    <button
                        onClick={() => setActiveMenuId(activeMenuId === row.id ? null : row.id)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${activeMenuId === row.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-700'}`}
                    >
                        <MdMoreVert size={24} />
                    </button>

                    <AnimatePresence>
                        {activeMenuId === row.id && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)}></div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 z-20 overflow-hidden"
                                >
                                    <div className="p-2 space-y-1">
                                        <button
                                            className="w-full flex items-center px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary-600 rounded-xl transition-all"
                                        >
                                            <MdEdit className="mr-3" size={18} />
                                            Update Profile
                                        </button>
                                        <div className="border-t border-slate-50 my-1"></div>
                                        <button
                                            onClick={() => handleDeleteDriver(row.id)}
                                            className="w-full flex items-center px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                        >
                                            <MdDelete className="mr-3" size={18} />
                                            Delete Carrier
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

    const filteredDrivers = driversData.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-primary-600 font-bold text-xs uppercase tracking-[4px] mb-3">
                        <MdPerson size={16} />
                        <span>Personnel Intelligence</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter">Fleet Workforce</h2>
                    <p className="text-slate-500 font-medium text-lg mt-2 tracking-tight">Manage your verified driver network and active deployments.</p>
                </div>
                <Button
                    icon={MdAdd}
                    size="lg"
                    className="shadow-2xl shadow-primary-500/20 !rounded-2xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    Secure Registration
                </Button>
            </div>

            {/* Filter Hub */}
            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 border border-slate-100">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan Personnel: Search by name, ID or license..."
                        className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-bold focus:ring-4 focus:ring-primary-50 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" icon={MdFilterList} className="!rounded-2xl text-xs">Filter Protocols</Button>
                    <Button variant="secondary" icon={MdAssignmentInd} className="!rounded-2xl text-xs">Data Ledger</Button>
                </div>
            </div>

            {/* Main Asset Table */}
            <div className="premium-card !p-0 overflow-hidden border border-slate-100 shadow-heavy">
                <Table columns={columns} data={filteredDrivers} />
            </div>

            {/* Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Personnel Registration"
                maxWidth="max-w-xl"
            >
                <DriverForm
                    onSubmit={handleRegisterDriver}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default Drivers;
