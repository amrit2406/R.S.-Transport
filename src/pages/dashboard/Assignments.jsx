import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdAdd, MdSearch, MdFilterList, MdAssignment, MdSchedule,
    MdCheckCircleOutline, MdMap, MdArrowForward, MdPeople,
    MdDirectionsCar, MdSupervisorAccount, MdClose, MdCheck, MdBlock
} from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import {
    setAssignments,
    setRequests,
    setMyAssignments,
    setAvailableDrivers,
    setLoading,
    setError,
    updateAssignmentStatus
} from '../../features/assignments/assignmentSlice';
import {
    getAssignmentsByRequestAPI,
    bulkAssignAPI,
    getAvailableDriversAPI,
    getMyAssignmentsAPI,
    respondAssignmentAPI
} from '../../features/assignments/assignmentAPI';

const Assignments = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { list, requests, myAssignments, availableDrivers, loading, error } = useSelector(state => state.assignments);

    // Explicitly check role from user object or fallback to localStorage if needed
    // In many setups, role is part of the user object
    const role = user?.role || localStorage.getItem('role') || 'admin'; // fallback to admin for testing

    const [searchTerm, setSearchTerm] = useState('');
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [bulkData, setBulkData] = useState({
        requestId: '',
        assignments: [{ vehicleId: '', driverId: '', helperId: '' }]
    });

    useEffect(() => {
        fetchData();
    }, [role]);

    const fetchData = async () => {
        dispatch(setLoading(true));
        try {
            if (role === 'admin') {
                const [reqRes, driversRes] = await Promise.all([
                    getAssignmentsByRequestAPI(),
                    getAvailableDriversAPI()
                ]);
                dispatch(setRequests(reqRes.data.data || reqRes.data || []));
                dispatch(setAvailableDrivers(driversRes.data.data || driversRes.data || []));
            } else {
                const myRes = await getMyAssignmentsAPI();
                dispatch(setMyAssignments(myRes.data.data || myRes.data || []));
            }
        } catch (err) {
            console.error('Failed to fetch assignments:', err);
            dispatch(setError(err.response?.data?.message || 'Failed to load assignment intelligence.'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleRespond = async (id, status, reason = '') => {
        try {
            await respondAssignmentAPI(id, status, reason);
            dispatch(updateAssignmentStatus({ id, status }));
            alert(`Assignment ${status} successfully.`);
        } catch (err) {
            console.error('Response failed:', err);
            alert('Failed to update assignment status.');
        }
    };

    const handleBulkSubmit = async () => {
        if (!bulkData.requestId || !bulkData.assignments[0].driverId) {
            alert('Please select a request and at least one driver.');
            return;
        }

        try {
            await bulkAssignAPI(bulkData);
            alert('Bulk assignment deployment successful.');
            setIsBulkModalOpen(false);
            fetchData();
        } catch (err) {
            console.error('Bulk assignment failed:', err);
            alert(err.response?.data?.message || 'Bulk deployment failed.');
        }
    };

    // Columns configuration based on role
    const getColumns = () => {
        const baseColumns = [
            {
                header: 'Assignment Token', accessor: 'id', render: (row) => (
                    <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-sm tracking-tight">{row._id || row.id || 'ASN-NEW'}</span>
                        <div className="flex items-center text-[10px] font-bold text-slate-400 mt-0.5">
                            <MdSchedule size={12} className="mr-1" />
                            {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'Active'}
                        </div>
                    </div>
                )
            }
        ];

        if (role === 'admin') {
            baseColumns.push(
                {
                    header: 'Operational Link', accessor: 'driver', render: (row) => (
                        <div className="flex flex-col">
                            <span className="font-black text-slate-800 text-[13px]">{row.driver?.name || 'Unassigned'}</span>
                            <span className="text-[11px] font-bold text-primary-500 flex items-center mt-0.5 group-hover:underline">
                                {row.vehicle?.registrationNumber || 'NO-VEHICLE'}
                            </span>
                        </div>
                    )
                },
                {
                    header: 'Enterprise Client', accessor: 'client', render: (row) => (
                        <span className="font-bold text-slate-600 text-sm">{row.request?.client?.name || 'In-House'}</span>
                    )
                }
            );
        }

        baseColumns.push(
            {
                header: 'Logistic Route', accessor: 'route', render: (row) => (
                    <div className="flex items-center text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
                        <MdMap size={16} className="text-slate-300 mr-2" />
                        {row.route || row.request?.route || 'Standard Protocol'}
                    </div>
                )
            },
            {
                header: 'Status Protocol', accessor: 'status', render: (row) => {
                    const status = row.status || 'pending';
                    const colors = {
                        'completed': 'bg-emerald-50 text-emerald-600 border-emerald-200/50',
                        'accepted': 'bg-primary-50 text-primary-600 border-primary-200/50 shadow-primary-50',
                        'pending': 'bg-slate-100 text-slate-400 border-slate-200 shadow-inner',
                        'rejected': 'bg-rose-50 text-rose-600 border-rose-200/50',
                        'in transit': 'bg-indigo-50 text-indigo-600 border-indigo-200/50',
                    };
                    return (
                        <span className={`px-3 py-1.5 rounded-[12px] text-[10px] font-black uppercase tracking-[1.5px] border shadow-sm flex items-center w-fit ${colors[status.toLowerCase()] || colors.pending}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${status === 'completed' ? 'bg-emerald-500' :
                                    status === 'accepted' ? 'bg-primary-500' :
                                        status === 'in transit' ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'
                                }`}></div>
                            {status}
                        </span>
                    );
                }
            }
        );

        if (role !== 'admin') {
            baseColumns.push({
                header: 'Response', accessor: 'actions', render: (row) => (
                    <div className="flex items-center gap-2">
                        {row.status?.toLowerCase() === 'pending' && (
                            <>
                                <button
                                    onClick={() => handleRespond(row._id || row.id, 'accepted')}
                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-all shadow-sm"
                                    title="Accept Assignment"
                                >
                                    <MdCheck size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        const reason = prompt('Enter rejection reason:');
                                        if (reason) handleRespond(row._id || row.id, 'rejected', reason);
                                    }}
                                    className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 hover:bg-rose-100 transition-all shadow-sm"
                                    title="Reject Assignment"
                                >
                                    <MdBlock size={18} />
                                </button>
                            </>
                        )}
                        <button className="flex items-center px-4 py-2 bg-slate-50 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all group">
                            Details
                            <MdArrowForward size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )
            });
        } else {
            baseColumns.push({
                header: '', accessor: 'action', render: () => (
                    <button className="flex items-center px-4 py-2 bg-slate-50 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all group">
                        Control
                        <MdArrowForward size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                )
            });
        }

        return baseColumns;
    };

    const displayData = role === 'admin' ? requests : myAssignments;
    const filteredData = (displayData || []).filter(item =>
        (item._id || item.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.driver?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.request?.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-primary-600 font-bold text-xs uppercase tracking-[3px] mb-3">
                        <MdAssignment size={16} />
                        <span>operational core • {role.toUpperCase()} MODE</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter">
                        {role === 'admin' ? 'Live Assignments' : 'My Assignments'}
                    </h2>
                    <p className="text-slate-500 font-medium text-lg mt-3">
                        {role === 'admin'
                            ? 'Active orchestration of drivers, vehicles, and client fulfillment orders.'
                            : 'Personal deployment queue and route intelligence.'}
                    </p>
                </div>
                {role === 'admin' && (
                    <Button icon={MdAdd} size="lg" className="shadow-2xl shadow-primary-500/20" onClick={() => setIsBulkModalOpen(true)}>
                        Bulk Engine Assignment
                    </Button>
                )}
            </div>

            {/* Protocol Filter */}
            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 bg-white/40 border border-slate-100 shadow-sm">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Identity Filter: Search tokens, personnel, or route nodes..."
                        className="w-full bg-slate-50/50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-semibold focus:ring-4 focus:ring-primary-100 focus:bg-white outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" className="!rounded-2xl border-slate-200 text-[11px] font-black uppercase tracking-widest">In-Transit Only</Button>
                    <Button variant="secondary" size="md" className="!rounded-2xl" onClick={fetchData}>Refresh Stream</Button>
                </div>
            </div>

            <div className="premium-card !p-0 overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/40 min-h-[400px]">
                {loading ? (
                    <div className="p-20 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-slate-500 font-black text-[10px] uppercase tracking-widest">Syncing Operational Data...</p>
                    </div>
                ) : error ? (
                    <div className="p-20 text-center">
                        <p className="text-rose-500 font-black text-sm uppercase tracking-widest">{error}</p>
                        <Button variant="outline" className="mt-6 mx-auto" onClick={fetchData}>Retry Handshake</Button>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="p-20 text-center">
                        <MdAssignment size={48} className="mx-auto text-slate-100 mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active assignments found in registry.</p>
                    </div>
                ) : (
                    <Table columns={getColumns()} data={filteredData} />
                )}
            </div>

            {/* Bulk Assignment Modal */}
            <Modal
                isOpen={isBulkModalOpen}
                onClose={() => setIsBulkModalOpen(false)}
                title="Bulk Resource Deployment"
                maxWidth="max-w-4xl"
            >
                <div className="space-y-6 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Target Vehicle Request</label>
                            <select
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                value={bulkData.requestId}
                                onChange={(e) => setBulkData({ ...bulkData, requestId: e.target.value })}
                            >
                                <option value="">Select Operational Request...</option>
                                {requests.map(req => (
                                    <option key={req._id || req.id} value={req._id || req.id}>
                                        {req.id || req._id} - {req.client?.name || 'Internal'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Asset Allocation (Assignment 1)</label>
                            <div className="space-y-3">
                                <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <MdPeople size={20} className="text-primary-500 mr-3" />
                                    <select
                                        className="flex-1 bg-transparent border-none font-bold text-sm outline-none"
                                        value={bulkData.assignments[0].driverId}
                                        onChange={(e) => {
                                            const updated = [...bulkData.assignments];
                                            updated[0].driverId = e.target.value;
                                            setBulkData({ ...bulkData, assignments: updated });
                                        }}
                                    >
                                        <option value="">Select Available Driver...</option>
                                        {availableDrivers.map(d => (
                                            <option key={d._id || d.id} value={d._id || d.id}>{d.name} ({d.phone})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <MdSupervisorAccount size={20} className="text-primary-500 mr-3" />
                                    <select
                                        className="flex-1 bg-transparent border-none font-bold text-sm outline-none"
                                        value={bulkData.assignments[0].helperId}
                                        onChange={(e) => {
                                            const updated = [...bulkData.assignments];
                                            updated[0].helperId = e.target.value;
                                            setBulkData({ ...bulkData, assignments: updated });
                                        }}
                                    >
                                        <option value="">Select Available Helper (Optional)...</option>
                                        {/* Fallback to drivers if helper API not separate yet or empty */}
                                        <option value="HELPER-001">Standard Helper Unit</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsBulkModalOpen(false)}>Abort Protocol</Button>
                        <Button onClick={handleBulkSubmit} className="shadow-lg shadow-primary-500/20">Finalize Deployment</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Assignments;
