"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Decorative Elements & Image */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-slate-50/60 to-slate-50 z-10" />
        <img 
          src="/hero_background_1773314390166.png" 
          alt="WBCA Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] z-0" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ y: y1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px] z-0" 
        />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>West Bengal's Premier IT Academy</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[1]">
              Unlock Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Potential</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Join thousands of students mastering technology through our 
              certified professional courses and expert mentorship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/courses"
              className="group w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-1 active:scale-95"
            >
              <span className="text-lg">View All Courses</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/admission"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-md text-gray-900 px-10 py-5 rounded-2xl font-bold border border-white hover:bg-white transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
            >
              <span className="text-lg">Register Now</span>
            </Link>
          </motion.div>
          
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600" />
              <span className="font-bold text-gray-900">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600" />
              <span className="font-bold text-gray-900">Govt. Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-600" />
              <span className="font-bold text-gray-900">15+ Years Excellence</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 opacity-50 flex flex-col items-center"
      >
        <div className="w-7 h-12 border-2 border-gray-300 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-blue-600 rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
}
