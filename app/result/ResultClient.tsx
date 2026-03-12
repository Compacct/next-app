"use client";

import { Printer } from "lucide-react";

export default function ResultClient() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-lg"
    >
      <Printer className="w-5 h-5" />
      <span>Print Result</span>
    </button>
  );
}
