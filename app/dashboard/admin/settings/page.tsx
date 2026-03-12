import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Mail,
  Smartphone,
  Check
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-500 mt-2">Configure application preferences and security protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="md:col-span-1 space-y-2">
            {[
              { name: "General", icon: Globe, active: true },
              { name: "Account", icon: User },
              { name: "Security", icon: Shield },
              { name: "Notifications", icon: Bell },
              { name: "E-mail Config", icon: Mail },
            ].map((item: { name: string; icon: any; active?: boolean }) => (
              <button 
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all
                  ${item.active ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-white hover:text-slate-900"}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
        </div>

        {/* Form Area */}
        <div className="md:col-span-3 space-y-8">
           {/* Section 1 */}
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" /> Site Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Institute Name</label>
                    <input type="text" defaultValue="West Bengal Computer Academy" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all text-slate-900" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Technical Support Email</label>
                    <input type="email" defaultValue="support@wbca.in" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all text-slate-900 font-sans" />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Primary Office Address</label>
                    <textarea rows={3} defaultValue="Kolkata, West Bengal, India" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all text-slate-900" />
                 </div>
              </div>
           </div>

           {/* Section 2 */}
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" /> Security Policies
              </h3>
              <div className="space-y-4">
                 {[
                   { id: "s1", label: "Enforce 2FA for Franchisees", desc: "Require centers to use two-factor authentication upon login.", active: true },
                   { id: "s2", label: "Public Registration", desc: "Allow new centers to submit enquiry forms publicly.", active: true },
                   { id: "s3", label: "Automatic Enrollment Approval", desc: "Approve student records automatically if documentation is valid.", active: false },
                 ].map((opt: { id: string; label: string; desc: string; active: boolean }) => (
                   <div key={opt.id} className="flex items-start justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="space-y-1">
                        <p className="font-bold text-slate-800">{opt.label}</p>
                        <p className="text-sm text-slate-500">{opt.desc}</p>
                      </div>
                      <button className={`w-12 h-6 rounded-full p-1 transition-all flex items-center ${opt.active ? "bg-blue-600" : "bg-slate-200"}`}>
                         <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all ${opt.active ? "translate-x-6" : "translate-x-0"}`} />
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="flex justify-end pt-4">
              <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-2">
                 <Check className="w-5 h-5" /> Save All Changes
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
