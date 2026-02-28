import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdShowChart,
    MdBusiness,
    MdPerson,
    MdInventory,
    MdArrowForward
} from 'react-icons/md';

import RevenueChart from './RevenueChart';
import ClientBusinessChart from './ClientBusinessChart';
import DriverLeaderboard from './DriverLeaderboard';
import GoodsChart from './GoodsChart';
import Button from '../ui/Button';

const LogisticsCommandCenter = () => {
    const [activeTab, setActiveTab] = useState('revenue');

    const tabs = [
        { id: 'revenue', label: 'Revenue Trends', icon: MdShowChart, color: 'primary' },
        { id: 'clients', label: 'Top Clients', icon: MdBusiness, color: 'blue' },
        { id: 'drivers', label: 'Best Drivers', icon: MdPerson, color: 'indigo' },
        { id: 'goods', label: 'Top Goods', icon: MdInventory, color: 'slate' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'revenue': return <RevenueChart />;
            case 'clients': return <ClientBusinessChart />;
            case 'drivers': return <DriverLeaderboard />;
            case 'goods': return <GoodsChart />;
            default: return null;
        }
    };

    const getHeader = () => {
        const current = tabs.find(t => t.id === activeTab);
        return (
            <div>
                <h3 className="text-xl font-black text-slate-900 font-display transition-all duration-300">
                    {current.label} Analytics
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    Operational Intelligence Protocol • Real-time Data
                </p>
            </div>
        );
    };

    return (
        <div className="premium-card space-y-8 min-h-[520px] flex flex-col">
            {/* Platform Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-50">
                <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100 gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-white text-primary-600 shadow-sm border border-slate-100'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-primary-600' : 'text-slate-300'} />
                            <span>{tab.id}</span>
                        </button>
                    ))}
                </div>

                {getHeader()}
            </div>

            {/* Dynamic Content Area */}
            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer Insight */}
            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[3px]">Mission Control Node 01</p>
                <Button variant="ghost" size="sm" icon={MdArrowForward} className="flex-row-reverse group font-bold">
                    <span className="group-hover:translate-x-[-4px] transition-transform">Comprehensive Audit</span>
                </Button>
            </div>
        </div>
    );
};

export default LogisticsCommandCenter;
