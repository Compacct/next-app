"use client";

import { useState, useMemo } from "react";
import { Search, Info, ChevronRight, X, BookOpen, Clock, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  category_id: number;
  category_name: string;
}

interface Course {
  course_id: number;
  category_name: string;
  course_name: string;
  abbreviation: string;
  course_code: string;
  eligibility: string;
  duration: string;
}

interface Semester {
  semester_id: number;
  semester: string;
}

interface Subject {
  subject_id: number;
  course_id: number;
  semester_id: number;
  subject_name: string;
}

export default function CoursesClient({ 
  categories, 
  courses, 
  semesters, 
  subjects 
}: { 
  categories: Category[]; 
  courses: Course[];
  semesters: Semester[];
  subjects: Subject[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((course: Course) => {
      const categoryMatch = selectedCategory === "All" || course.category_name === selectedCategory;
      const searchMatch = course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.course_code.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [courses, selectedCategory, searchQuery]);

  const courseSubjects = useMemo(() => {
    if (!selectedCourse) return {};
    
    const mapped: Record<string, string[]> = {};
    semesters.forEach((sem: Semester) => {
      const semSubjects = subjects
        .filter((s: Subject) => s.course_id === selectedCourse.course_id && s.semester_id === sem.semester_id)
        .map((s: Subject) => s.subject_name);
      
      if (semSubjects.length > 0) {
        mapped[sem.semester] = semSubjects;
      }
    });
    return mapped;
  }, [selectedCourse, semesters, subjects]);

  return (
    <div>
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a course (e.g. Diploma, ADCA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all outline-none"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="md:w-64 px-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all outline-none font-medium"
        >
          <option value="All">All Categories</option>
          {categories.map((cat: any) => (
            <option key={cat.category_id} value={cat.category_name}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={course.course_id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-2xl transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-100">
                  {course.course_code}
                </span>
                <span className="text-gray-400 text-xs font-medium">{course.abbreviation}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {course.course_name}
              </h3>
              
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.duration} Months</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>{course.eligibility}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full py-3 bg-slate-50 text-gray-900 rounded-xl font-bold border border-slate-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>View Subjects</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Search className="w-10 h-10" />
          </div>
          <p className="text-xl font-bold text-gray-900">No courses found</p>
          <p className="text-gray-500">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Subject Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedCourse(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-blue-600 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedCourse.course_name}</h3>
                  <p className="text-blue-100 text-sm opacity-80 uppercase tracking-widest font-bold">
                    Semester Wise Subjects
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {Object.keys(courseSubjects).length > 0 ? (
                  <div className="space-y-8">
                    {Object.entries(courseSubjects).map(([semester, subList]: [string, any]) => (
                      <div key={semester}>
                        <h4 className="flex items-center gap-2 font-bold text-blue-600 mb-4 border-b border-blue-100 pb-2">
                          <BookOpen className="w-4 h-4" />
                          {semester}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                          {subList.map((s: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                              <span className="text-sm font-medium">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 opacity-50">
                    <p>No subjects listed for this course.</p>
                  </div>
                )}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                 <button 
                   onClick={() => setSelectedCourse(null)}
                   className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                 >
                   Close
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
