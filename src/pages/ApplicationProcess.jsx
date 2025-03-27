// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { ArrowRight, CheckCircle, ChevronRight, FileText, GraduationCap, Laptop, User } from "lucide-react"
// import { Link } from "react-router-dom"
// import Header from "../components/Header"

// function ApplicationProcess() {
//   const [activeTab, setActiveTab] = useState('nursing')

//   const pathways = [
//     { id: 'nursing', name: 'Nursing Work Contract' },
//     { id: 'ausbildung', name: 'Ausbildung Training' },
//     { id: 'study', name: 'Study Pathway' },
//     { id: 'job-seeker', name: 'Job Seeker Pathway' }
//   ]

//   const pathwaySteps = {
//     nursing: [
//       {
//         title: "Initial Consultation & Assessment",
//         description: "We evaluate your qualifications, experience, and goals to determine eligibility for the nursing pathway.",
//         details: "During this phase, we review your nursing credentials, work experience, and language proficiency. We'll discuss your career goals and preferences to ensure the nursing pathway is the right fit for you."
//       },
//       {
//         title: "German Language Training",
//         description: "Complete German language courses to reach the required B1/B2 level for nursing recognition.",
//         details: "You'll enroll in our specialized German language program designed for healthcare professionals. The program focuses on medical terminology and communication skills needed in healthcare settings. Most nursing positions require B1 level for initial employment, with B2 needed for full recognition."
//       },
//       {
//         title: "Document Preparation",
//         description: "We help you prepare and translate all necessary documents for the recognition process.",
//         details: "This includes your nursing diploma/degree, work certificates, identification documents, and language certificates. All documents must be translated by certified translators and authenticated as required by German authorities."
//       },
//       {
//         title: "Recognition Application",
//         description: "Submit your application for recognition of your nursing qualification in Germany.",
//         details: "We guide you through the application process with the appropriate German authority. This includes completing application forms, submitting required documents, and paying application fees. The recognition process determines whether your qualification is equivalent to German nursing standards."
//       },
//       {
//         title: "Job Placement",
//         description: "We connect you with German healthcare employers seeking qualified nursing professionals.",
//         details: "Through our network of German healthcare institutions, we help match you with suitable employers. We assist with job applications, prepare you for interviews, and help negotiate employment contracts. Most contracts include provisions for completing any additional training required for full recognition."
//       },
//       {
//         title: "Visa Application",
//         description: "We provide comprehensive support for your work visa application.",
//         details: "Once you have a job offer, we assist with the visa application process, including document preparation, form completion, and interview coaching. The visa application includes your employment contract, recognition notice, language certificate, and other required documents."
//       },
//       {
//         title: "Pre-Departure Preparation",
//         description: "We help you prepare for your move to Germany with practical guidance and orientation.",
//         details: "This includes information about housing, healthcare, banking, transportation, and cultural adaptation. We provide resources to help you integrate smoothly into German society and workplace culture."
//       }
//     ],
//     ausbildung: [
//       {
//         title: "Initial Consultation & Assessment",
//         description: "We evaluate your educational background, interests, and goals to determine suitable Ausbildung programs.",
//         details: "During this phase, we review your educational qualifications and discuss your career interests to identify appropriate vocational training fields. We'll explain the Ausbildung system and help you understand the commitment involved."
//       },
//       {
//         title: "German Language Training",
//         description: "Complete German language courses to reach the required B1 level for Ausbildung programs.",
//         details: "You'll enroll in our German language program to achieve the B1 proficiency level required for most Ausbildung programs. The courses focus on both general language skills and vocabulary relevant to your chosen vocational field."
//       },
//       {
//         title: "Ausbildung Field Selection",
//         description: "We help you choose the right vocational field based on your interests, skills, and job market demand.",
//         details: "We provide information about various Ausbildung programs, their requirements, duration, and career prospects. Popular fields include healthcare, technical trades, hospitality, business administration, and IT."
//       },
//       {
//         title: "Application Preparation",
//         description: "We help you prepare compelling applications for Ausbildung positions with German companies.",
//         details: "This includes creating a German-style CV, writing motivation letters, and preparing other application documents. We tailor your application to highlight relevant skills and motivations for your chosen vocational field."
//       },
//       {
//         title: "Company Placement",
//         description: "We connect you with German companies offering Ausbildung positions in your chosen field.",
//         details: "Through our network of German employers, we help match you with companies offering suitable training positions. We assist with the application process, prepare you for interviews, and help you secure an Ausbildung contract."
//       },
//       {
//         title: "Visa Application",
//         description: "We provide comprehensive support for your Ausbildung visa application.",
//         details: "Once you have an Ausbildung contract, we assist with the visa application process, including document preparation, form completion, and interview coaching. The visa application includes your training contract, language certificate, and proof of financial resources."
//       },
//       {
//         title: "Pre-Departure Preparation",
//         description: "We help you prepare for your move to Germany with practical guidance and orientation.",
//         details: "This includes information about housing, healthcare, banking, transportation, and cultural adaptation. We provide resources to help you integrate smoothly into German society and the dual training system."
//       }
//     ],
//     study: [
//       {
//         title: "Initial Consultation & Assessment",
//         description: "We evaluate your academic background, interests, and goals to determine suitable study programs in Germany.",
//         details: "During this phase, we review your educational qualifications and discuss your academic interests to identify appropriate university programs. We'll explain the German higher education system and help you understand the requirements and opportunities."
//       },
//       {
//         title: "German Language Training",
//         description: "Complete German language courses to reach the required level for your chosen study program.",
//         details: "You'll enroll in our German language program to achieve the proficiency level required for your chosen university program. Most German-taught programs require B1/B2 level, while some English-taught programs may have lower German language requirements."
//       },
//       {
//         title: "University & Program Selection",
//         description: "We help you identify suitable universities and study programs based on your academic background and career goals.",
//         details: "We provide information about German universities, their rankings, specializations, and admission requirements. We help you select programs that match your qualifications and interests, considering factors like location, tuition fees, and career prospects."
//       },
//       {
//         title: "Application Preparation",
//         description: "We help you prepare compelling applications for German universities.",
//         details: "This includes assistance with document preparation, application forms, motivation letters, and CVs. We ensure all academic documents are properly translated and authenticated as required by German universities."
//       },
//       {
//         title: "University Application Submission",
//         description: "We guide you through the application process for your selected universities.",
//         details: "This includes direct applications to universities or applications through centralized systems like uni-assist. We help you track application deadlines, submit required documents, and communicate with university admissions offices."
//       },
//       {
//         title: "Visa Application",
//         description: "We provide comprehensive support for your student visa application.",
//         details: "Once you have a university admission letter, we assist with the visa application process, including document preparation, form completion, and interview coaching. The visa application includes your admission letter, language certificate, and proof of financial resources."
//       },
//       {
//         title: "Pre-Departure Preparation",
//         description: "We help you prepare for your move to Germany with practical guidance and orientation.",
//         details: "This includes information about student housing, health insurance, banking, transportation, and campus life. We provide resources to help you integrate smoothly into German university culture and academic expectations."
//       }
//     ],
//     "job-seeker": [
//       {
//         title: "Initial Consultation & Assessment",
//         description: "We evaluate your professional qualifications, experience, and goals to determine eligibility for the Job Seeker pathway.",
//         details: "During this phase, we review your educational qualifications, professional experience, and career goals. We assess whether your profile meets the requirements for a German Job Seeker visa and identify potential employment sectors."
//       },
//       {
//         title: "German Language Training",
//         description: "Complete German language courses to reach the recommended B1 level for job seeking in Germany.",
//         details: "You'll enroll in our German language program to achieve at least B1 proficiency, which significantly improves your job prospects in Germany. While some sectors (particularly IT) may offer positions with English as the working language, German skills are essential for most jobs and daily life."
//       },
//       {
//         title: "Qualification Recognition",
//         description: "We assist with the recognition of your foreign qualifications in Germany, if applicable.",
//         details: "For regulated professions and some academic degrees, recognition is mandatory. For other qualifications, recognition can improve your job prospects. We guide you through the recognition process with the appropriate German authorities."
//       },
//       {
//         title: "Career Profile Development",
//         description: "We help you create a compelling German-style CV, cover letter, and professional profile.",
//         details: "This includes adapting your resume to German standards, creating targeted cover letters, and developing a professional online presence. We help you highlight relevant skills and experiences valued in the German job market."
//       },
//       {
//         title: "Job Search Strategy",
//         description: "We develop a personalized job search strategy based on your qualifications and the German job market.",
//         details: "This includes identifying potential employers, industry-specific job portals, networking opportunities, and recruitment agencies. We provide guidance on job application procedures and interview practices in Germany."
//       },
//       {
//         title: "Visa Application",
//         description: "We provide comprehensive support for your Job Seeker visa application.",
//         details: "We assist with the visa application process, including document preparation, form completion, and interview coaching. The Job Seeker visa allows you to stay in Germany for up to six months to search for employment. Once you find a job, you can apply for a work permit without leaving Germany."
//       },
//       {
//         title: "Pre-Departure Preparation",
//         description: "We help you prepare for your move to Germany with practical guidance and orientation.",
//         details: "This includes information about housing, healthcare, banking, transportation, and cultural adaptation. We provide resources to help you integrate smoothly into German society and workplace culture."
//       }
//     ]
//   }

//   const eligibilityRequirements = {
//     nursing: [
//       "Nursing degree or diploma recognized in your home country",
//       "At least 2 years of professional nursing experience",
//       "German language proficiency (minimum B1 level, B2 recommended)",
//       "Good health and character (medical certificate and police clearance)",
//       "Willingness to complete additional training if required for full recognition"
//     ],
//     ausbildung: [
//       "Secondary school certificate (equivalent to German Mittlere Reife)",
//       "German language proficiency (minimum B1 level)",
//       "Age typically between 18-35 years (though exceptions exist)",
//       "Interest in vocational training and practical work",
//       "Willingness to commit to 2-3.5 years of combined work and study"
//     ],
//     study: [
//       "Higher education entrance qualification recognized in Germany",
//       "German language proficiency (B1/B2 for German-taught programs)",
//       "English proficiency for English-taught programs",
//       "Proof of financial resources (approximately €10,332 per year)",
//       "Academic records showing good performance in relevant subjects"
//     ],
//     "job-seeker": [
//       "University degree or vocational qualification recognized in Germany",
//       "At least 2 years of professional experience in your field",
//       "German language proficiency (recommended B1 level)",
//       "Proof of financial resources to support yourself during job search",
//       "Clear career goals and knowledge of the German job market in your field"
//     ]
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 bg-primary/10">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">Germany Travel Pathways</h1>
//             <p className="text-xl text-gray-600">
//               Comprehensive solutions to help you achieve your German immigration goals
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Pathway Tabs */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-wrap justify-center mb-12 gap-2">
//             {pathways.map(pathway => (
//               <button
//                 key={pathway.id}
//                 onClick={() => setActiveTab(pathway.id)}
//                 className={`px-4 py-2 rounded-md transition-colors ${
//                   activeTab === pathway.id
//                     ? 'bg-primary text-white'
//                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//                 }`}
//               >
//                 {pathway.name}
//               </button>
//             ))}
//           </div>

//           {/* Pathway Content */}
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Left Column - Pathway Overview */}
//             <div className="md:col-span-1">
//               <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
//                 <div className="mb-6">
//                   {activeTab === 'nursing' && (
//                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                       <User className="h-8 w-8 text-primary" />
//                     </div>
//                   )}
//                   {activeTab === 'ausbildung' && (
//                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                       <GraduationCap className="h-8 w-8 text-primary" />
//                     </div>
//                   )}
//                   {activeTab === 'study' && (
//                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                       <FileText className="h-8 w-8 text-primary" />
//                     </div>
//                   )}
//                   {activeTab === 'job-seeker' && (
//                     <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                       <Laptop className="h-8 w-8 text-primary" />
//                     </div>
//                   )}

//                   <h2 className="text-2xl font-bold mb-2">
//                     {pathways.find(p => p.id === activeTab)?.name} Pathway
//                   </h2>

//                   {activeTab === 'nursing' && (
//                     <p className="text-gray-600">
//                       Our Nursing Work Contract pathway is designed for qualified nursing professionals seeking employment in Germany's healthcare sector. This comprehensive program guides you from language acquisition to job placement and visa approval.
//                     </p>
//                   )}
//                   {activeTab === 'ausbildung' && (
//                     <p className="text-gray-600">
//                       The Ausbildung Training pathway offers a unique opportunity to gain recognized German vocational qualifications while earning an income. This dual training system combines practical work experience with theoretical education.
//                     </p>
//                   )}
//                   {activeTab === 'study' && (
//                     <p className="text-gray-600">
//                       Our Study Pathway provides comprehensive support for students looking to pursue higher education at German universities. From university selection to visa application, we guide you through every step of the process.
//                     </p>
//                   )}
//                   {activeTab === 'job-seeker' && (
//                     <p className="text-gray-600">
//                       The Job Seeker pathway is designed for qualified professionals looking to find employment opportunities in Germany. We provide language training, career development, and visa support to help you succeed in the German job market.
//                     </p>
//                   )}
//                 </div>

//                 <div className="mb-6">
//                   <h3 className="text-lg font-bold mb-3">Eligibility Requirements</h3>
//                   <ul className="space-y-2">
//                     {eligibilityRequirements[activeTab].map((requirement, index) => (
//                       <li key={index} className="flex items-start gap-2">
//                         <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                         <span>{requirement}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="pt-4">
//                   <Link
//                     to="/contact"
//                     className="block w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
//                   >
//                     Apply for This Pathway
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - Application Process */}
//             <div className="md:col-span-2">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-2xl font-bold mb-6">Application Process</h2>

//                 <div className="space-y-8">
//                   {pathwaySteps[activeTab].map((step, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4, delay: index * 0.1 }}
//                       className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0"
//                     >
//                       <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
//                       <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                         <span className="text-primary font-bold">{index + 1}</span>
//                       </div>

//                       <div>
//                         <h3 className="text-xl font-bold mb-2">{step.title}</h3>
//                         <p className="text-gray-700 font-medium mb-3">{step.description}</p>
//                         <p className="text-gray-600">{step.details}</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Timeline End */}
//                 <div className="relative pl-8 mt-8">
//                   <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
//                   <div className="absolute left-[-16px] top-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   </div>

//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <h3 className="text-xl font-bold text-green-700 mb-2">Start Your New Life in Germany!</h3>
//                     <p className="text-green-600">
//                       Begin your journey to Germany with our expert guidance and support every step of the way.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Timeline */}
//               <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-2xl font-bold mb-6">Estimated Timeline</h2>

//                 {activeTab === 'nursing' && (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 1-6</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>German language training (A1-B1 levels)</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 7-9</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Document preparation and recognition application</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 10-12</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Job placement and contract negotiation</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 13-14</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Visa application and approval</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Month 15</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Pre-departure preparation and relocation to Germany</div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'ausbildung' && (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 1-6</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>German language training (A1-B1 levels)</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 7-8</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Ausbildung field selection and application preparation</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 9-11</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Company placement and contract signing</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 12-13</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Visa application and approval</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Month 14</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Pre-departure preparation and relocation to Germany</div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'study' && (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 1-6</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>German language training (A1-B1/B2 levels)</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 7-8</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>University and program selection</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 9-10</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Application preparation and submission</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 11-12</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>University admission and visa application</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Month 13</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Pre-departure preparation and relocation to Germany</div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === 'job-seeker' && (
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 1-6</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>German language training (A1-B1 levels)</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 7-8</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Qualification recognition (if applicable)</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 9-10</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Career profile development and job search strategy</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Months 11-12</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Job seeker visa application and approval</div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-24 text-right font-bold">Month 13</div>
//                       <ArrowRight className="h-5 w-5 text-gray-400" />
//                       <div>Pre-departure preparation and relocation to Germany</div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="mt-6 text-sm text-gray-500">
//                   <p>* Timeline is approximate and may vary based on individual circumstances, processing times, and other factors.</p>
//                 </div>
//               </div>

//               {/* Success Stories */}
//               <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-2xl font-bold mb-6">Success Stories</h2>

//                 {activeTab === 'nursing' && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex items-start gap-4">
//                       <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
//                         <img src="/testimonial-1.jpg" alt="Chioma A." className="w-full h-full object-cover" />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-lg">Chioma A., Registered Nurse</h3>
//                         <p className="text-gray-600 italic mb-3">
//                           "AOCA Resources guided me through every step of the nursing pathway. From language training to job placement, their support was invaluable. I'm now working at a hospital in Berlin with excellent pay and benefits. The investment in this program was the best decision I've made for my career."
//                         </p>
//                         <Link
//                           to="/success-stories"
//                           className="text-primary text-sm font-medium hover:underline inline-flex items-center"
//                         >
//                           Read full story
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div\
