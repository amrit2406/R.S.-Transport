import React from 'react';
import { MdAdd, MdSearch, MdFilterList, MdSupervisorAccount, MdVerified, MdVerifiedUser, MdStar } from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const Helpers = () => {
    const helpersData = [
        { id: 'HLP-101', name: 'Guy Hawkins', type: 'Loading Specialist', contact: '+91 90000 11111', status: 'Available', assignments: 12, rating: 4.7 },
        { id: 'HLP-102', name: 'Eleanor Pena', type: 'Route Assistant', contact: '+91 90000 22222', status: 'Assigned', assignments: 8, rating: 4.8 },
        { id: 'HLP-103', name: 'Kristin Watson', type: 'Unloading Expert', contact: '+91 90000 33333', status: 'Available', assignments: 15, rating: 4.9 },
        { id: 'HLP-104', name: 'Jerome Bell', type: 'Safety Inspector', contact: '+91 90000 44444', status: 'On Break', assignments: 5, rating: 4.5 },
    ];

    const columns = [
        {
            header: 'Support Force', accessor: 'name', render: (row) => (
                <div className="flex items-center group/helper">
                    <div className="w-12 h-12 rounded-[18px] bg-slate-50 text-slate-400 flex items-center justify-center mr-4 border border-slate-200/50 shadow-inner group-hover/helper:bg-teal-50 group-hover/helper:text-teal-600 transition-all overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${row.id}`} alt={row.name} className="opacity-70 group-hover/helper:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        <div className="flex items-center">
                            <span className="font-black text-slate-800 text-[15px] tracking-tight">{row.name}</span>
                            <MdVerifiedUser className="ml-1.5 text-teal-500" size={14} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{row.id}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Specialization', accessor: 'type', render: (row) => (
                <div className="flex items-center text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    {row.type}
                </div>
            )
        },
        { header: 'Secure ID', accessor: 'contact', render: (row) => <span className="font-medium text-slate-500 text-xs">{row.contact}</span> },
        {
            header: 'Success Score', accessor: 'rating', render: (row) => (
                <div className="flex items-center text-amber-500 font-black text-sm bg-amber-50/50 px-2 py-1 rounded-lg border border-amber-100/50">
                    <MdStar size={14} className="mr-1" />
                    {row.rating}
                </div>
            )
        },
        {
            header: 'Operational Status', accessor: 'status', render: (row) => {
                const colors = {
                    'Available': 'bg-teal-50 text-teal-600 border-teal-200/60 shadow-teal-50',
                    'Assigned': 'bg-blue-50 text-blue-600 border-blue-200/60 shadow-blue-50',
                    'On Break': 'bg-slate-100 text-slate-500 border-slate-200 shadow-inner',
                };
                return (
                    <span className={`px-4 py-1.5 rounded-[12px] text-[10px] font-black uppercase tracking-[1.5px] border shadow-sm ${colors[row.status]}`}>
                        {row.status}
                    </span>
                );
            }
        },
    ];

    return (
        <div className="space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-teal-600 font-bold text-xs uppercase tracking-[3px] mb-3">
                        <MdSupervisorAccount size={16} />
                        <span>Workforce Support</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter">Support Personnel</h2>
                    <p className="text-slate-500 font-medium text-lg mt-3">Roster of logistics assistance staff and rapid-response helpers.</p>
                </div>
                <Button icon={MdAdd} size="lg" className="bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-500/20">Recruit Helper</Button>
            </div>

            {/* Staff Search */}
            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 bg-white/40 border border-slate-100">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search roster: Identity query by name, role, or serial..."
                        className="w-full bg-slate-50/50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-semibold focus:ring-4 focus:ring-teal-100 focus:bg-white outline-none transition-all"
                    />
                </div>
                <Button variant="outline" icon={MdFilterList} className="!rounded-2xl border-slate-200">Deployed Only</Button>
            </div>

            <div className="premium-card !p-0 overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/40">
                <Table columns={columns} data={helpersData} />
            </div>
        </div>
    );
};

export default Helpers;
