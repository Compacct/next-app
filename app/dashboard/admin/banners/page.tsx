import prisma from "@/lib/db";
import { 
  Plus, 
  Image as ImageIcon, 
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  ExternalLink,
  Upload
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { banner_images } from "@prisma/client";

export default async function AdminBannersPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/login");
  }

  const banners = await prisma.banner_images.findMany({
    orderBy: { date_uploaded: "desc" },
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banner Gallery</h1>
          <p className="text-gray-500 mt-2">Manage homepage slider images and promotional banners.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
          <Upload className="w-5 h-5" /> Upload Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {banners.map((banner: banner_images) => (
          <div key={banner.image_id} className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden transform transition-all hover:-translate-y-2">
            <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <ImageIcon className="w-12 h-12" />
               </div>
               {/* Mock Image for UI demo */}
               <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 to-transparent group-hover:from-slate-900/40 transition-all duration-500" />
               
               <div className="absolute top-4 left-4">
                  {banner.published === "Y" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                      <CheckCircle className="w-2.5 h-2.5" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                      <XCircle className="w-2.5 h-2.5" /> Hidden
                    </span>
                  )}
               </div>
            </div>
            
            <div className="p-6">
               <h3 className="font-bold text-slate-800 line-clamp-1">{banner.banner_title}</h3>
               <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Added: {banner.date_uploaded?.toLocaleDateString()}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                     <button className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl">
                        <ExternalLink className="w-4 h-4" />
                     </button>
                     <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <div className="col-span-full py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
             <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
             <p className="text-xl font-black uppercase tracking-widest opacity-20">No Banners Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
