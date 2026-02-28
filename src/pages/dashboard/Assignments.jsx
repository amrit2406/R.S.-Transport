import React from 'react';
import { MdAdd, MdSearch, MdFilterList, MdAssignment, MdSchedule, MdCheckCircleOutline, MdMap, MdArrowForward } from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const Assignments = () => {
    const assignmentsData = [
        { id: 'ASN-701', driver: 'Robert Fox', vehicle: 'MH-12-AB-5544', client: 'Amazon India', route: 'Pune → Mumbai', date: 'Oct 24, 2023', status: 'In Transit' },
        { id: 'ASN-702', driver: 'Jane Cooper', vehicle: 'MH-12-XY-1122', client: 'Flipkart Logistics', route: 'Nasik → Pune', date: 'Oct 24, 2023', status: 'Completed' },
        { id: 'ASN-703', driver: 'Wade Warren', vehicle: 'MH-12-CD-9988', client: 'Blue Dart', route: 'Mumbai → Pune', date: 'Oct 25, 2023', status: 'Scheduled' },
        { id: 'ASN-704', driver: 'Cameron Williamson', vehicle: 'MH-14-EF-3322', client: 'Amazon India', route: 'Pune → Solapur', date: 'Oct 25, 2023', status: 'In Transit' },
    ];

    const columns = [
        {
            header: 'Order Token', accessor: 'id', render: (row) => (
                <div className="flex flex-col">
                    <span className="font-black text-slate-900 text-sm tracking-tight">{row.id}</span>
                    <div className="flex items-center text-[10px] font-bold text-slate-400 mt-0.5">
                        <MdSchedule size={12} className="mr-1" />
                        {row.date}
                    </div>
                </div>
            )
        },
        {
            header: 'Operational Link', accessor: 'driver', render: (row) => (
                <div className="flex flex-col">
                    <span className="font-black text-slate-800 text-[13px]">{row.driver}</span>
                    <span className="text-[11px] font-bold text-primary-500 flex items-center mt-0.5 group-hover:underline">
                        {row.vehicle}
                    </span>
                </div>
            )
        },
        { header: 'Enterprise Client', accessor: 'client', render: (row) => <span className="font-bold text-slate-600 text-sm">{row.client}</span> },
        {
            header: 'Logistic Route', accessor: 'route', render: (row) => (
                <div className="flex items-center text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
                    <MdMap size={16} className="text-slate-300 mr-2" />
                    {row.route}
                </div>
            )
        },
        {
            header: 'Status Protocol', accessor: 'status', render: (row) => {
                const colors = {
                    'Completed': 'bg-emerald-50 text-emerald-600 border-emerald-200/50',
                    'In Transit': 'bg-primary-50 text-primary-600 border-primary-200/50 shadow-primary-50',
                    'Scheduled': 'bg-slate-100 text-slate-400 border-slate-200 shadow-inner',
                };
                return (
                    <span className={`px-3 py-1.5 rounded-[12px] text-[10px] font-black uppercase tracking-[1.5px] border shadow-sm flex items-center w-fit ${colors[row.status]}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${row.status === 'Completed' ? 'bg-emerald-500' :
                                row.status === 'In Transit' ? 'bg-primary-500 animate-pulse' : 'bg-slate-400'
                            }`}></div>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: '', accessor: 'action', render: () => (
                <button className="flex items-center px-4 py-2 bg-slate-50 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all group">
                    Control
                    <MdArrowForward size={14} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </button>
            )
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-primary-600 font-bold text-xs uppercase tracking-[3px] mb-3">
                        <MdAssignment size={16} />
                        <span>Operational Core</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter">Live Assignments</h2>
                    <p className="text-slate-500 font-medium text-lg mt-3">Active orchestration of drivers, vehicles, and client fulfillment orders.</p>
                </div>
                <Button icon={MdAdd} size="lg" className="shadow-2xl">Engineer New Task</Button>
            </div>

            {/* Protocol Filter */}
            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 bg-white/40 border border-slate-100">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Identity Filter: Search order tokens, drivers, or route nodes..."
                        className="w-full bg-slate-50/50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-semibold focus:ring-4 focus:ring-primary-100 focus:bg-white outline-none transition-all"
                    />
                </div>
                <Button variant="outline" className="!rounded-2xl border-slate-200 text-[11px] font-black uppercase tracking-widest">In-Transit Only</Button>
            </div>

            <div className="premium-card !p-0 overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/40">
                <Table columns={columns} data={assignmentsData} />
            </div>
        </div>
    );
};

export default Assignments;
