import React from 'react';
import { MdAdd, MdSearch, MdFilterList, MdBusiness, MdLocationOn, MdEmail, MdLayers, MdArrowOutward } from 'react-icons/md';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const Clients = () => {
    const clientsData = [
        { id: 'CLT-001', name: 'Amazon India', contact: 'shipping@amazon.in', location: 'Hyderabad, TS', industry: 'E-commerce', jobs: 452, status: 'Premium' },
        { id: 'CLT-002', name: 'Flipkart Logistics', contact: 'ops@flipkart.com', location: 'Bangalore, KA', industry: 'E-commerce', jobs: 312, status: 'Active' },
        { id: 'CLT-003', name: 'Blue Dart', contact: 'support@bluedart.com', location: 'Mumbai, MH', industry: 'Courier', jobs: 890, status: 'Enterprise' },
        { id: 'CLT-004', name: 'Zomato Hyperlocal', contact: 'fleet@zomato.com', location: 'Gurgaon, HR', industry: 'Food-tech', jobs: 124, status: 'Active' },
    ];

    const columns = [
        {
            header: 'Commercial Entity', accessor: 'name', render: (row) => (
                <div className="flex items-center group/client">
                    <div className="w-12 h-12 rounded-[20px] bg-slate-900 text-white flex items-center justify-center mr-4 shadow-xl group-hover/client:scale-105 transition-all">
                        <span className="font-black text-xs">{row.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                        <p className="font-black text-slate-800 text-[15px] tracking-tight">{row.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.id}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Communication', accessor: 'contact', render: (row) => (
                <div className="flex items-center text-slate-500 font-bold text-xs">
                    <MdEmail size={14} className="mr-2 text-slate-300" />
                    {row.contact}
                </div>
            )
        },
        {
            header: 'Operations Base', accessor: 'location', render: (row) => (
                <div className="flex items-center text-slate-500 font-bold text-xs">
                    <MdLocationOn size={14} className="mr-2 text-primary-400" />
                    {row.location}
                </div>
            )
        },
        { header: 'Sector', accessor: 'industry', render: (row) => <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{row.industry}</span> },
        {
            header: 'Volume', accessor: 'jobs', render: (row) => (
                <div className="flex items-center space-x-2">
                    <span className="font-black text-slate-700 text-sm">{row.jobs}</span>
                    <span className="text-[10px] text-emerald-500 font-black">+12%</span>
                </div>
            )
        },
        {
            header: 'Partnership', accessor: 'status', render: (row) => {
                const colors = {
                    'Premium': 'bg-amber-50 text-amber-600 border-amber-200 shadow-amber-100',
                    'Enterprise': 'bg-primary-50 text-primary-600 border-primary-200 shadow-primary-100',
                    'Active': 'bg-slate-50 text-slate-500 border-slate-200 shadow-slate-100',
                };
                return (
                    <span className={`px-3 py-1.5 rounded-[12px] text-[9px] font-black uppercase tracking-[2px] border shadow-sm ${colors[row.status]}`}>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: '', accessor: 'actions', render: () => (
                <button className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-xl text-primary-600 transition-all border border-transparent hover:border-slate-200">
                    <MdArrowOutward size={20} />
                </button>
            )
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-2 text-primary-600 font-bold text-xs uppercase tracking-[3px] mb-3">
                        <MdBusiness size={16} />
                        <span>Partnership Hub</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter leading-none">Global Clients</h2>
                    <p className="text-slate-500 font-medium text-lg mt-3">Portfolio of enterprise shipping partners and collaborative entities.</p>
                </div>
                <Button icon={MdAdd} size="lg" className="shadow-2xl">Onboard New Client</Button>
            </div>

            {/* Advanced Search */}
            <div className="premium-card !p-4 flex flex-col lg:flex-row lg:items-center gap-4 bg-white/40 border border-slate-100">
                <div className="relative flex-1 group">
                    <MdSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search enterprise accounts: Query by name, ID, or sector..."
                        className="w-full bg-slate-50/50 border-none rounded-2xl py-3.5 pl-12 pr-5 text-sm font-semibold focus:ring-4 focus:ring-primary-100 focus:bg-white outline-none transition-all"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" icon={MdFilterList} className="!rounded-2xl border-slate-200">Industry Sector</Button>
                    <Button variant="ghost" className="!rounded-2xl font-black text-slate-400">Archived Accounts</Button>
                </div>
            </div>

            <div className="premium-card !p-0 overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/40">
                <Table columns={columns} data={clientsData} />
            </div>

            {/* Grid Footer Insight */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900 rounded-[32px] text-white flex items-center justify-between shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</p>
                        <p className="text-2xl font-black tracking-tighter">+18.5% <span className="text-xs text-emerald-400 font-bold underline ml-2">MoM</span></p>
                    </div>
                    <MdLayers size={40} className="text-slate-800" />
                </div>
            </div>
        </div>
    );
};

export default Clients;
