import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MdCameraAlt, MdPerson } from 'react-icons/md';
import Input from '../ui/Input';
import Button from '../ui/Button';

const DriverForm = ({ onSubmit, initialValues, onCancel }) => {
    const [imagePreview, setImagePreview] = useState(initialValues?.image || null);
    const fileInputRef = useRef(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: initialValues || {
            name: '',
            phone: '',
            address: '',
            truck: '',
            helper: '',
            image: null
        }
    });

    const trucks = ['MH-12-AB-5544', 'MH-12-XY-1122', 'MH-12-CD-9988', 'MH-14-EF-3322'];
    const helpers = ['Guy Hawkins', 'Eleanor Pena', 'Kristin Watson', 'Jerome Bell'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue('image', reader.result); // Storing as base64 for now
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-2">
            {/* Profile Image Picker */}
            <div className="flex flex-col items-center space-y-3 pb-4">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-28 h-28 rounded-[36px] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer group hover:border-primary-400 hover:bg-primary-50/30 transition-all overflow-hidden"
                >
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center text-slate-400 group-hover:text-primary-500">
                            <MdPerson size={32} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <MdCameraAlt className="text-white" size={24} />
                    </div>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Profile Image</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            <Input
                label="Full Name"
                placeholder="Enter driver's full name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
            />

            <Input
                label="Phone Number"
                placeholder="+91 XXXXX XXXXX"
                {...register('phone', { required: 'Phone number is required' })}
                error={errors.phone?.message}
            />

            <div className="w-full">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Home Address</label>
                <textarea
                    className="block w-full transition-all duration-300 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500"
                    placeholder="Enter full residential address"
                    rows="2"
                    {...register('address', { required: 'Address is required' })}
                ></textarea>
                {errors.address && <p className="mt-2 ml-1 text-xs font-bold text-rose-500">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Assign Truck</label>
                    <select
                        className="block w-full transition-all duration-300 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 appearance-none font-bold text-slate-700"
                        {...register('truck', { required: 'Truck is required' })}
                    >
                        <option value="">Select Truck</option>
                        {trucks.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.truck && <p className="mt-2 ml-1 text-xs font-bold text-rose-500">{errors.truck.message}</p>}
                </div>

                <div className="w-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Assign Helper</label>
                    <select
                        className="block w-full transition-all duration-300 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary-50 focus:border-primary-500 appearance-none font-bold text-slate-700"
                        {...register('helper', { required: 'Helper is required' })}
                    >
                        <option value="">Select Helper</option>
                        {helpers.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    {errors.helper && <p className="mt-2 ml-1 text-xs font-bold text-rose-500">{errors.helper.message}</p>}
                </div>
            </div>

            <div className="flex space-x-3 pt-6">
                <Button variant="outline" className="flex-1 !rounded-2xl" onClick={onCancel}>Discard</Button>
                <Button type="submit" className="flex-1 shadow-lg shadow-primary-500/20 !rounded-2xl">
                    {initialValues ? 'Update Identity' : 'Secure Registration'}
                </Button>
            </div>
        </form>
    );
};

export default DriverForm;
