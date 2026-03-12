import prisma from "@/lib/db";
import { FileText, Download, Calendar, ArrowUpRight, Scale } from "lucide-react";

export default async function DownloadPage() {
  const documents = await prisma.download_document.findMany({
    where: { published: "Y" },
    orderBy: { doc_id: "desc" },
  });

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16 md:py-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center">
              Resources & <span className="text-gradient">Downloads</span>
            </h1>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Access important documents, brochures, application forms, and student resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.length > 0 ? (
                documents.map((doc: any) => (
                  <div 
                    key={doc.doc_id} 
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-start gap-6"
                  >
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                      <FileText className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                           {doc.document_name}
                         </h3>
                         <span className="bg-slate-100 text-[10px] font-bold text-slate-500 px-2 py-1 rounded uppercase tracking-wider">
                           {doc.mimetype}
                         </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{doc.date_uploaded ? new Date(doc.date_uploaded).toLocaleDateString("en-GB") : "-"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Scale className="w-3 h-3" />
                          <span>PDF Document</span>
                        </div>
                      </div>
                      <a 
                        href={`/api/download/${doc.doc_id}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                      >
                         <span>Download Now</span>
                         <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                   <p className="text-gray-400 font-bold">No documents available for download at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
