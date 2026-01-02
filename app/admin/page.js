// app/admin/page.js
"use client";

import { useState } from 'react';
import { ExternalLink, Lock, ShieldCheck, FileSpreadsheet } from 'lucide-react';

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔒 SIMPLE SECURITY: The secret password is "admin123"
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Wrong Password!");
    }
  };

  const handleOpenSheet = () => {
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL GOOGLE SHEET LINK
    // It should look like: https://docs.google.com/spreadsheets/d/YOUR_ID/edit
    window.open("https://docs.google.com/spreadsheets/d/1tx4jzEXCyCHuroNnBTyN6yN0DMZJt_A1ZMU8CKJkSOc/edit", "_blank");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
          <div className="mx-auto bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Lock className="text-pink-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-6">Organizer Access</h1>
          <input 
            type="password" 
            placeholder="Enter Admin PIN"
            className="w-full p-4 bg-black rounded-xl border border-gray-700 text-center text-xl tracking-widest mb-4 focus:border-pink-500 outline-none"
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button className="w-full bg-pink-600 font-bold py-4 rounded-xl hover:bg-pink-500 transition">
            UNLOCK
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#130722] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl text-center">
        
        <ShieldCheck className="text-green-400 mx-auto mb-6" size={64} />
        
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-400 mb-8">ENVISION 2026 Data Center</p>

        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">Status</p>
          <p className="text-xl font-medium flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Live Data Sync Active
          </p>
        </div>

        <button 
          onClick={handleOpenSheet}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
        >
          <FileSpreadsheet size={24} />
          OPEN LIVE SHEET
          <ExternalLink size={18} className="opacity-70" />
        </button>

        <p className="mt-6 text-xs text-gray-600">
          Redirects to secure Google Sheets database
        </p>

      </div>
    </div>
  );
}