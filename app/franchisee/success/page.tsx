import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Thank you for your interest in becoming a WBCA franchisee. 
          Our team will review your application and contact you soon.
        </p>
        <Link
          href="/"
          className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
