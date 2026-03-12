"use client";

import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface Student {
  image_id: number;
  student_name: string;
  course_name: string;
  mimetype: string;
  custom_url?: string;
}

export default function StudentGallery({ students }: { students: Student[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {students.map((student) => (
        <motion.div 
          key={student.image_id} 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <p className="text-white font-bold text-xs truncate">{student.student_name}</p>
            <p className="text-blue-300 text-[10px] uppercase tracking-tighter">{student.course_name}</p>
          </div>
          <div className="w-full h-full relative">
             <img 
               src={student.custom_url || `/uploads/student-photo/${student.image_id}.${student.mimetype.toLowerCase()}`} 
               alt={student.student_name}
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               onError={(e) => {
                 if (!student.custom_url) {
                   (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.student_name)}&background=random&color=fff`;
                 }
                 (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
               }}
             />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
