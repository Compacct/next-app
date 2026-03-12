import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import ContactForm from "@/app/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 text-center">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
              Have questions about our courses or franchise opportunities? 
              Reach out to us and our team will get back to you shortly.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <MapPin className="text-blue-600 w-6 h-6" />
                    Our Offices
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-bold text-blue-600 text-lg mb-2">Head Office</h3>
                      <p className="text-gray-600 mb-4">
                        Baligeria, Nayagram, Paschim Medinipur,<br />
                        Pin - 721125, West Bengal, India
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                         <Phone className="w-4 h-4" />
                         <span>+91-3223-267123 / 8145825942</span>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div>
                      <h3 className="font-bold text-blue-600 text-lg mb-2">City Office</h3>
                      <p className="text-gray-600 mb-4">
                        Boral T. S. Road, Garia, Kolkata - 700154,<br />
                        West Bengal, India
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                         <Phone className="w-4 h-4" />
                         <span>+91-9903152325 / 8906882047</span>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-600" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                          <a href="mailto:admin@wbca.in" className="text-gray-700 font-bold hover:text-blue-600 transition-colors">admin@wbca.in</a>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Optional Map Placeholder */}
                <div className="bg-slate-200 aspect-video rounded-3xl overflow-hidden relative group">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-slate-500 font-medium">Interactive Map Placeholder</p>
                   </div>
                   <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Feedback Form */}
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="text-blue-600 w-6 h-6" />
                  Send a Message
                </h2>
                <p className="text-gray-500 mb-8 text-sm">We value your feedback and queries. Fill out the form below.</p>
                <ContactForm />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
