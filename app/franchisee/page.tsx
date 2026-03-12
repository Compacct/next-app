import prisma from "@/lib/db";
import { CheckCircle2, Send, Building2, MapPin, Globe, CreditCard, Clock, Award } from "lucide-react";
import FranchiseeForm from "./FranchiseeForm";

export default async function FranchiseePage() {
  const states = await prisma.master_state.findMany({
    orderBy: { state_name: "asc" },
  });

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center">
              WBCA <span className="text-gradient">Franchisee Network</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left Column: Why Join Us */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Building2 className="text-blue-600 w-8 h-8" />
                    Why WBCA?
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Join an ISO 9001:2008 Certified Institution dedicated to excelence in computer education.
                    The IT training industry is growing over 35% annually, making this the perfect business opportunity.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Govt. Registered Institution",
                      "ISO 9001:2008 Certified",
                      "Trade Mark Registered",
                      "Low Franchisee Fees",
                      "24/7 HO Support",
                      "Govt. Tender Eligibility",
                      "Branded Hardware Support",
                      "Flexible Terms"
                    ].map((benefit: string) => (
                      <div key={benefit} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CheckCircle2 className="text-blue-500 w-4 h-4 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="text-blue-600 w-6 h-6" />
                    Eligibility Criteria
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-bold">01</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Educational</h4>
                        <p className="text-sm text-gray-500">Graduate in any discipline with a degree/diploma in IT.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-bold">02</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Financial</h4>
                        <p className="text-sm text-gray-500">Capability to personally invest the total project cost.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-bold">03</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Experience</h4>
                        <p className="text-sm text-gray-500">1-3 years experience in IT or middle management.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Enquiry Form */}
              <div id="enquiry" className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl relative">
                <div className="absolute top-0 right-10 -translate-y-1/2">
                  <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg">
                    <Send className="w-6 h-6" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Now</h2>
                <p className="text-gray-500 mb-8 text-sm">Please complete the form below to receive more information.</p>
                <FranchiseeForm states={states} />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
