"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, GraduationCap, Building2, Ticket, Sparkles, CheckCircle, X } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', stream: '', college: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', phone: '', stream: '', college: '' });
      } else {
        alert("Server error. Try again.");
      }
    } catch (error) {
      alert("Connection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* SUCCESS POPUP MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-gray-900 rounded-3xl p-8 max-w-sm w-full text-center relative shadow-2xl"
            >
              {/* Green Checkmark */}
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={56} className="text-green-600" />
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-2">YOU ARE IN!</h2>
              <p className="text-lg text-gray-600 mb-8 font-medium">
                Welcome to <span className="font-bold text-blue-600">ENVISION 2026</span>
              </p>

              {/* End Message */}
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wide mb-1">Registration Complete</p>
                <p className="text-gray-900">You can now close this tab.</p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[50%] bg-blue-600/30 rounded-full blur-[80px] pointer-events-none"></div>

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 h-[25vh] flex flex-col items-center justify-center text-center p-6 z-10"
      >
        <div className="bg-white/10 p-3 rounded-2xl mb-3 backdrop-blur-md border border-white/10">
           <Ticket size={32} className="text-cyan-400" />
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200">
          ENVISION 26
        </h1>
        <p className="text-xs text-blue-300 font-bold tracking-[0.2em] mt-1 uppercase">TSDC Presents</p>
      </motion.div>

      {/* FORM */}
      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="flex-grow bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-8 pb-10 flex flex-col z-20">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-8 opacity-50"></div>
        <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-5">
          <h2 className="text-gray-900 text-xl font-bold mb-2 flex items-center gap-2">
            <Sparkles size={18} className="text-blue-500 fill-blue-500"/> Get Your Pass
          </h2>

          <div className="relative group">
            <User size={20} className="absolute left-4 top-4 text-gray-400" />
            <input required type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="relative group">
            <Phone size={20} className="absolute left-4 top-4 text-gray-400" />
            <input required type="tel" maxLength="10" placeholder="Phone Number" className="w-full pl-12 pr-4 py-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
              value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <GraduationCap size={20} className="absolute left-4 top-4 text-gray-400" />
              <input required type="text" placeholder="Stream" className="w-full pl-12 pr-2 py-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
                value={formData.stream} onChange={(e) => setFormData({...formData, stream: e.target.value})} />
            </div>
            <div className="relative group">
              <Building2 size={20} className="absolute left-4 top-4 text-gray-400" />
              <input required type="text" placeholder="College" className="w-full pl-12 pr-2 py-4 bg-gray-50 text-gray-900 rounded-2xl border-2 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
                 value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} />
            </div>
          </div>

          <div className="flex-grow"></div>
          <button disabled={isSubmitting} type="submit" className="w-full bg-[#0f172a] text-white text-lg font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-900 active:scale-[0.98] transition-all">
            {isSubmitting ? "Processing..." : "SUBMIT ➔"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}