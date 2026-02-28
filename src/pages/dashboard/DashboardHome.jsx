import React from 'react';
import { motion } from 'framer-motion';
import {
    MdTrendingUp,
    MdPeople,
    MdDirectionsCar,
    MdBusiness,
    MdAdd,
    MdLayers,
    MdAutoGraph
} from 'react-icons/md';

import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import LogisticsCommandCenter from '../../components/dashboard/LogisticsCommandCenter';

const DashboardHome = () => {
    return (
        <div className="space-y-10 pb-12">
            {/* High-Impact Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-2 text-primary-600 font-black text-[10px] uppercase tracking-[4px] mb-4"
                    >
                        <MdAutoGraph size={16} />
                        <span>Operations Dashboard</span>
                    </motion.div>
                    <h2 className="text-4xl font-black text-slate-900 font-display tracking-tighter leading-none mb-3">
                        Mission Command
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">
                        A unified view of your fleet operational intelligence.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="outline" size="lg" className="!rounded-2xl border-slate-200">Global Ledger</Button>
                    <Button size="lg" icon={MdAdd} className="shadow-2xl shadow-primary-500/20 !rounded-2xl">Engineer Assignment</Button>
                </div>
            </div>

            {/* Core KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Revenue (MTD)" value="$67,420" icon={MdTrendingUp} trend="up" trendValue="12.5" color="blue" />
                <StatCard title="Personnel Active" value="142" icon={MdPeople} trend="up" trendValue="8.2" color="indigo" />
                <StatCard title="Deployment" value="94.8%" icon={MdDirectionsCar} trend="up" trendValue="2.4" color="emerald" />
                <StatCard title="Partner Grid" value="18" icon={MdBusiness} trend="up" trendValue="4.1" color="purple" />
            </div>

            {/* The Unified Logistics Command Center */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                {/* Main Unified Engine */}
                <div className="xl:col-span-3">
                    <LogisticsCommandCenter />
                </div>

                {/* Tactical Status Column */}
                <div className="space-y-6">
                    <div className="premium-card bg-slate-900 border-none relative overflow-hidden group min-h-[250px] flex flex-col justify-between">
                        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"></div>

                        <div>
                            <h4 className="text-white font-black text-lg font-display mb-1">Operational Pulse</h4>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[2px]">System: Optimized</p>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Delivery Delta</span>
                                    <span className="text-emerald-400">+12%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} className="h-full bg-emerald-500 shadow-[0_0_12px_#10b981]"></motion.div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Grid Integrity</span>
                                    <span className="text-blue-400">96.8%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "96.8%" }} className="h-full bg-blue-500 shadow-[0_0_12px_#3b82f6]"></motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card bg-primary-50 border-primary-100 flex items-center p-6 space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg">
                            <MdLayers size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-primary-600 uppercase tracking-widest">Compliance</p>
                            <p className="text-[11px] font-bold text-slate-600 leading-tight mt-1">All fleet assets are within safety protocols.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardHome;
