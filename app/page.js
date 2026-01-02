// app/page.js
"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { Gamepad2, Music, Coffee, Trophy } from "lucide-react";

export default function CarnivalDisplay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Calculate the link safely
  const registrationLink = mounted ? `${window.location.origin}/register` : "";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-8 relative overflow-hidden font-sans">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-75"></div>
      </div>

      <div className="z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* LEFT COLUMN */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8 hidden md:block">
          <ActivityItem icon={<Gamepad2 size={40} className="text-cyan-400" />} title="Gaming Arena" desc="FIFA • BGMI • VR" />
          <ActivityItem icon={<Trophy size={40} className="text-yellow-400" />} title="Sports League" desc="Box Cricket • Rink Football" />
        </motion.div>

        {/* CENTER COLUMN: QR Code & Title */}
        <div className="flex flex-col items-center text-center">
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
            <p className="text-cyan-300 tracking-[0.4em] uppercase text-sm font-bold mb-2">TSDC Presents</p>
            <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              ENVISION
            </h1>
            <h2 className="text-4xl font-bold text-white mt-2 tracking-tighter">2026</h2>
          </motion.div>

          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.4)]">
            <div className="bg-white p-4 rounded-2xl">
              {/* Only show QR when mounted */}
              {mounted && registrationLink ? (
                <QRCode value={registrationLink} size={220} />
              ) : (
                <div className="w-[220px] h-[220px] bg-gray-200 animate-pulse rounded-lg"></div>
              )}
            </div>
          </motion.div>
          <p className="mt-8 text-2xl font-bold animate-bounce text-cyan-300">Scan to Register 📲</p>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8 hidden md:block text-right">
          <ActivityItem icon={<Music size={40} className="text-pink-400" />} title="Cultural Fest" desc="Dance • Fashion Show • DJ" align="right" />
          <ActivityItem icon={<Coffee size={40} className="text-orange-400" />} title="Carnival Stalls" desc="Food • Games • Merch" align="right" />
        </motion.div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, desc, align = "left" }) {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <div className="p-3 bg-white/10 rounded-2xl mb-2 backdrop-blur-sm border border-white/10">{icon}</div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-blue-200">{desc}</p>
    </div>
  );
}