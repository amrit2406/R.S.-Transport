import React from 'react';
import { MdAdd, MdSearch, MdFilterList, MdDirectionsCar, MdLocalShipping, MdSettings, MdEvStation, MdNumbers } from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const Vehicles = () => {
    const vehiclesData = [
        { id: 'VEH-204', model: 'Tata Ultra T.7', type: 'Heavy Cargo', plate: 'MH-12-AB-5544', fuel: 'Diesel', load: '7 Tons', status: 'In Transit' },
        { id: 'VEH-108', model: 'Mahindra Bolero', type: 'Pickup', plate: 'MH-12-XY-1122', fuel: 'Diesel', load: '1.5 Tons', status: 'Available' },
        { id: 'VEH-312', model: 'Ashok Leyland Dost', type: 'Mini Truck', plate: 'MH-12-CD-9988', fuel: 'CNG', load: '2 Tons', status: 'Maintenance' },
        { id: 'VEH-401', model: 'Eicher Pro 2049', type: 'Heavy Cargo', plate: 'MH-14-EF-3322', fuel: 'Diesel', load: '5 Tons', status: 'Available' },
    ];

    const columns = [
        {
            header: 'Asset Model', accessor: 'model', render: (row) => (
                <div className="flex items-center group/item">
                    <div className="w-14 h-14 rounded-[22px] bg-indigo-50 text-indigo-500 flex items-center justify-center mr-4 border border-indigo-100 shadow-inner group-hover/item:scale-110 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-500">
                        <MdLocalShipping size={28} />
                    </div>
                    <div>
                        <p className="font-black text-slate-800 text-[15px] tracking-tight">{row.model}</p>
                        <div className="flex items-center space-x-2 mt-0.5">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.id}</p>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase">{row.type}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: 'Registration', accessor: 'plate', render: (row) => (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                        <MdNumbers size={14} className="text-slate-400" />
                    </div>
                    <span className="font-mono text-xs font-black bg-slate-900 text-white px-3 py-1.5 rounded-lg border border-slate-700 shadow-md transform rotate-[-1deg]">{row.plate}</span>
                </div>
            )
        },
        { header: 'Payload Cap', accessor: 'load', render: (row) => <span className="font-black text-slate-600 text-sm">{row.load}</span> },
        {
            header: 'Fuel Type', accessor: 'fuel', render: (row) => (
                <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 w-fit">
                    <MdEvStation size={16} className={`mr-2 ${row.fuel === 'Diesel' ? 'text-slate-400' : 'text-emerald-500'}`} />
                    <span className="text-xs font-bold text-slate-700">{row.fuel}</span>
                </div>
            )
        },
        {
            header: 'Fleet Status', accessor: 'status', render: (row) => {
                const colors = {
                    'Available': 'bg-emerald-50 text-emerald-600 border-emerald-200/50',
                    'In Transit': 'bg-primary-50 text-primary-600 border-primary-200/50',
                    'Maintenance': 'bg-rose-50 text-rose-600 border-rose-200/50',
                };
                return (
                    <span className={`px-4 py-1.5 rounded-[12px] text-[10px] font-bold uppercase tracking-[1.5px] border shadow-sm ${colors[row.status]}`}>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: '', accessor: 'actions', render: () => (
                <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl text-slate-300 hover:text-slate-600 transition-all">
                    <MdSettings size={22} />
                </button>
            )
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs uppercase tracking-[3px] mb-3">
                        <MdDirectionsCar size={16} />
                        <span>Asset Intelligence</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter leading-none">Fleet Registry</h2>
                    <p className="text-slate-500 font-medium text-lg mt-3">Advanced monitoring of vehicle operational status and lifecycle.</p>
                </div>
                <Button icon={MdAdd} size="lg" className="bg-slate-900 hover:bg-black shadow-2xl">Inventory Asset</Button>
            </div>

            {/* Control Section */}
            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 bg-white/40 border border-slate-100">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Asset lookup: Search by model, plate number, or ID..."
                        className="w-full bg-slate-50/50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-semibold focus:ring-4 focus:ring-indigo-100 focus:bg-white outline-none transition-all"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" icon={MdFilterList} className="!rounded-2xl">Categorize</Button>
                    <Button variant="secondary" size="md" className="!rounded-2xl">Audit Logs</Button>
                </div>
            </div>

            <div className="premium-card !p-0 overflow-hidden border border-slate-100 shadow-2xl shadow-indigo-200/20">
                <Table columns={columns} data={vehiclesData} />
            </div>
        </div>
    );
};

export default Vehicles;
