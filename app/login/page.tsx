"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck, Building2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [type, setType] = useState<"admin" | "franchisee">("franchisee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const credentials = 
      type === "admin" 
      ? { userid: formData.get("userid"), password: formData.get("password") }
      : { code: formData.get("code"), password: formData.get("password") };

    const result = await signIn(type, {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      toast.success("Login successful!");
      router.push(type === "admin" ? "/dashboard/admin" : "/dashboard/franchisee");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
             <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
             <p className="text-blue-100/80 text-sm">Please select your login type to continue</p>
          </div>

          <div className="p-8">
            {/* Type Selector */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
               <button
                 onClick={() => setType("franchisee")}
                 className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                   type === "franchisee" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                 }`}
               >
                 <Building2 className="w-4 h-4" />
                 <span>Franchisee</span>
               </button>
               <button
                 onClick={() => setType("admin")}
                 className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                   type === "admin" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                 }`}
               >
                 <ShieldCheck className="w-4 h-4" />
                 <span>Admin</span>
               </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  {type === "admin" ? "Username" : "Franchisee Code"}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    name={type === "admin" ? "userid" : "code"}
                    required
                    autoFocus
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    placeholder={type === "admin" ? "Enter admin ID" : "e.g. A-001"}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <span>{loading ? "Authenticating..." : "Login Now"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Facing issues? <a href="/contact" className="text-blue-600 font-bold hover:underline">Contact Support</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
