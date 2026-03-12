import prisma from "@/lib/db";
import { Calendar, FileText, Download } from "lucide-react";

export default async function NewsPage() {
  const newsItems = await prisma.news.findMany({
    where: { published: "Y" },
    orderBy: { date_updated: "desc" },
  });

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center">
              Latest <span className="text-gradient">News & Notices</span>
            </h1>
            <p className="text-lg text-gray-600 text-center mb-16">
              Stay updated with the latest announcements, examination notices, and academy news.
            </p>

            <div className="space-y-6">
              {newsItems.length > 0 ? (
                newsItems.map((item: any) => (
                  <div 
                    key={item.doc_id} 
                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                          {item.document_name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date_updated ? new Date(item.date_updated).toLocaleDateString("en-GB") : "Recently"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all md:w-auto w-full justify-center">
                      <Download className="w-4 h-4" />
                      <span>View Notice</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                   <p className="text-gray-400 font-medium">No recent news or notices found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
