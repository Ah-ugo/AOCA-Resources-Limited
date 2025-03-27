"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, ChevronDown, ChevronUp, Search } from "lucide-react";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "general", name: "General Questions" },
    { id: "language", name: "Language Courses" },
    { id: "nursing", name: "Nursing Pathway" },
    { id: "ausbildung", name: "Ausbildung Training" },
    { id: "study", name: "Study Pathway" },
    { id: "job-seeker", name: "Job Seeker Visa" },
    { id: "visa", name: "Visa & Immigration" },
  ];

  const faqData = {
    general: [
      {
        question: "What services does AOCA Resources Limited offer?",
        answer:
          "AOCA Resources Limited offers a comprehensive range of services including German language training from A1 to B2 level, visa consultancy for various German immigration pathways, recruitment services connecting Nigerian talent with German employers, and support services for integration into German society. Our specialties include nursing work contracts, Ausbildung training, study pathways, and job seeker visa applications.",
      },
      {
        question: "Where are your offices located?",
        answer:
          "We have two main offices in Nigeria. Our Lagos office is located at 8 Bayo Adetuna Street off Sangotedo, Lagos. Our Port Harcourt office is at 7 Salvation Avenue, Off Igbo Etche Road, Rumukwurusi, Port Harcourt. You can visit either location during our business hours or contact us via phone or email to schedule an appointment.",
      },
      {
        question: "How can I contact AOCA Resources for more information?",
        answer:
          "You can contact us through multiple channels: Phone: 08038867495, 08036714612; WhatsApp: 08038865466; Email: info@aocaresorcesltd.com or aocaresources@gmail.com. You can also visit our offices in Lagos or Port Harcourt, or use the contact form on our website.",
      },
      {
        question: "What is the success rate of your programs?",
        answer:
          "We're proud to maintain a success rate of approximately 98% across our various programs. This high success rate is due to our comprehensive approach, experienced team, and personalized support throughout the entire process. We carefully screen candidates to ensure they meet the requirements for their chosen pathway before beginning the process.",
      },
      {
        question:
          "How long does the entire process take from enrollment to departure to Germany?",
        answer:
          "The timeline varies depending on the specific pathway and individual circumstances. On average, the process takes 8-18 months from initial enrollment to departure. Language acquisition typically takes 4-8 months for A1-B1 levels, document processing and visa application can take 2-4 months, and additional preparation time varies by pathway. We provide detailed timeline estimates during your initial consultation.",
      },
    ],
    language: [
      {
        question: "What German language levels do you offer courses for?",
        answer:
          "We offer comprehensive German language courses for all levels from A1 (beginner) to B2 (upper intermediate). Our courses follow the Common European Framework of Reference for Languages (CEFR) and prepare students for official German language examinations. Each level builds upon the previous one, developing your speaking, listening, reading, and writing skills progressively.",
      },
      {
        question: "How long does it take to complete each language level?",
        answer:
          "The duration varies depending on the course intensity and individual learning pace. Typically, each level (A1, A2, B1, B2) takes about 2-3 months with regular classes. We offer both intensive and regular course formats. Intensive courses meet more frequently and can be completed in a shorter timeframe, while regular courses have a more relaxed schedule spread over a longer period.",
      },
      {
        question: "Are your language courses recognized for visa applications?",
        answer:
          "Yes, our language courses are recognized for German visa applications. We prepare students for official examinations through the Goethe-Institut or telc, which are widely accepted for visa purposes. Upon completion of each level, students receive certificates that can be used for visa applications, university admissions, or employment requirements.",
      },
      {
        question: "Do you offer online or in-person classes?",
        answer:
          "We offer both online and in-person classes to accommodate different learning preferences and situations. Our in-person classes are held at our Lagos and Port Harcourt offices, while our online classes use interactive platforms that allow for real-time communication with instructors and fellow students. Both formats follow the same curriculum and prepare you equally well for official examinations.",
      },
      {
        question: "What is included in the language course fees?",
        answer:
          "Our language course fees include instruction by qualified teachers, course materials, practice tests, and mock examinations. For in-person courses, access to our learning facilities is included. For online courses, access to our digital learning platform is provided. Examination fees for official tests (Goethe-Institut or telc) are not included in the course fees and must be paid separately when registering for the exam.",
      },
    ],
    nursing: [
      {
        question:
          "What qualifications do I need to apply for the nursing pathway?",
        answer:
          "To qualify for the nursing pathway, you need: 1) A nursing degree or diploma from a recognized institution, 2) At least 2 years of professional experience (preferred but not always mandatory), 3) German language proficiency (minimum B1 level, though B2 is preferred for healthcare), and 4) Registration with the Nursing Council in Nigeria. We'll help you assess your qualifications during the initial consultation.",
      },
      {
        question:
          "How does the recognition process work for my nursing qualification?",
        answer:
          "The recognition process involves: 1) Compiling and translating your educational certificates and work experience documents, 2) Submitting them to the appropriate German authority for evaluation, 3) Receiving a recognition notice that may require additional adaptation measures or knowledge tests, and 4) Completing any required additional training. This process typically takes 3-6 months, and we provide guidance throughout each step.",
      },
      {
        question: "What is the salary range for nurses in Germany?",
        answer:
          "Nurses in Germany typically earn between €2,500 and €3,500 gross per month, depending on experience, qualifications, location, and the specific healthcare facility. This salary increases with additional qualifications, specializations, and years of experience. German employment also includes benefits such as health insurance, pension contributions, and paid vacation time.",
      },
      {
        question: "Do I need to speak German to work as a nurse in Germany?",
        answer:
          "Yes, German language proficiency is essential for nursing positions. You'll need general German language skills at minimum B1 level, though B2 is strongly preferred for healthcare professionals. Additionally, you'll need to develop medical German vocabulary. We offer specialized language courses for healthcare professionals that focus on both general German and medical terminology.",
      },
      {
        question:
          "How long does it take to secure a nursing position in Germany?",
        answer:
          "The timeline varies, but typically the process takes 10-18 months from starting language training to beginning work in Germany. This includes 6-8 months for language acquisition (A1-B1/B2), 3-6 months for the recognition process, and 1-4 months for visa processing and relocation. Our recruitment services help streamline the job placement process once you've reached the required language level.",
      },
    ],
    ausbildung: [
      {
        question: "What is the Ausbildung training program?",
        answer:
          "Ausbildung is Germany's dual vocational training system that combines classroom instruction at a vocational school with on-the-job training at a company. This approach ensures students learn both theoretical knowledge and practical skills. Training typically lasts 2-3.5 years depending on the profession, and there are over 300 recognized Ausbildung professions covering virtually every sector of the economy.",
      },
      {
        question: "What are the requirements to apply for Ausbildung?",
        answer:
          "To qualify for an Ausbildung program as an international applicant, you'll need: 1) A school-leaving certificate equivalent to the German 'Mittlere Reife' (10 years of schooling), 2) German language proficiency (minimum B1 level, though B2 is recommended), 3) A training contract with a German company, and 4) A visa that allows you to participate in vocational training.",
      },
      {
        question: "Do I get paid during the Ausbildung training?",
        answer:
          "Yes, during your Ausbildung, you'll receive a monthly training allowance (Ausbildungsvergütung). The amount varies by profession and increases each year of your training, but typically ranges from €800-€1,000 per month in the first year, €900-€1,100 in the second year, and €1,000-€1,300 in the third year. This income is usually sufficient to cover basic living expenses in Germany.",
      },
      {
        question: "What happens after completing the Ausbildung program?",
        answer:
          "After successfully completing your Ausbildung, you'll receive a recognized vocational qualification certificate. You can then: 1) Receive a residence permit to work in your trained profession for at least 2 years, 2) Apply for permanent residency after working for 2 years, 3) Potentially apply for German citizenship after 8 years, or 4) Continue your education with advanced training or specialized studies.",
      },
      {
        question: "Which Ausbildung professions have the best job prospects?",
        answer:
          "Several Ausbildung professions currently have excellent job prospects in Germany, including: 1) Healthcare professions (geriatric care, medical assistants), 2) Technical trades (mechatronics, electronics, IT specialists), 3) Skilled crafts (electricians, plumbers, HVAC technicians), 4) Logistics specialists, and 5) Hotel and restaurant management. We can help you identify programs that match both your interests and market demand.",
      },
    ],
    study: [
      {
        question: "What are the requirements to study in Germany?",
        answer:
          "To study in Germany, you'll need: 1) A secondary school leaving certificate equivalent to the German Abitur (for Nigerian students, this typically means WASSCE/NECO plus at least 1-2 years of university education or completion of a foundation program), 2) German language proficiency (B1-C1 level for German-taught programs) or English proficiency (for English-taught programs), 3) Proof of financial resources (approximately €11,208 per year), and 4) Health insurance coverage.",
      },
      {
        question: "Are there tuition fees for studying in Germany?",
        answer:
          "Most public universities in Germany charge no tuition fees, except in Baden-Württemberg where non-EU students pay about €1,500 per semester. All students pay a semester contribution (€100-350) covering administrative costs, student services, and public transportation. Private universities charge tuition fees ranging from €5,000-20,000 per year. This makes Germany one of the most affordable destinations for quality higher education.",
      },
      {
        question: "How can I find English-taught programs in Germany?",
        answer:
          "Many German universities offer programs taught entirely in English, especially at the Master's level. You can find these programs through the DAAD (German Academic Exchange Service) database, university websites, or with our assistance. While studying in English is possible, we still recommend learning basic German to enhance your daily life and integration in Germany.",
      },
      {
        question: "What scholarships are available for international students?",
        answer:
          "Various scholarships are available for international students in Germany, including: 1) DAAD (German Academic Exchange Service) scholarships, 2) Erasmus+ programs, 3) University-specific scholarships, 4) Government-funded scholarships from your home country, and 5) Foundation scholarships. We can help you identify and apply for scholarships that match your profile and study plans.",
      },
      {
        question: "Can I work while studying in Germany?",
        answer:
          "Yes, international students in Germany can work part-time for up to 120 full days or 240 half days per year. This allows you to gain work experience and supplement your finances while studying. Many universities also offer student assistant positions related to your field of study. After graduation, you can apply for an 18-month job seeker visa to find employment related to your field of study.",
      },
    ],
    "job-seeker": [
      {
        question: "What is the German Job Seeker Visa?",
        answer:
          "The German Job Seeker Visa is a long-term residency permit that allows qualified professionals to stay in Germany for up to six months to look for employment. This gives you the opportunity to search for jobs while already in the country, attend interviews in person, and network with potential employers. If you find suitable employment during this period, you can apply for a work permit without leaving Germany.",
      },
      {
        question:
          "What are the eligibility requirements for the Job Seeker Visa?",
        answer:
          "To qualify for the German Job Seeker Visa, you must: 1) Hold a university degree (Bachelor's or higher) from an institution recognized in Germany, 2) Have at least five years of professional experience in your field, 3) Demonstrate German language skills (typically at least B1 level), 4) Prove you have sufficient funds to support yourself during your stay (approximately €1,000 per month for six months), and 5) Have valid health insurance coverage.",
      },
      {
        question: "How do I apply for the Job Seeker Visa?",
        answer:
          "The application process involves: 1) Gathering all required documents (degree certificate, proof of work experience, CV, motivation letter, proof of financial resources, health insurance, etc.), 2) Scheduling an appointment at the German embassy or consulate in Nigeria, 3) Submitting your application and paying the visa fee (approximately €75), 4) Attending a visa interview, and 5) Waiting for visa processing (typically 4-12 weeks). We provide guidance throughout this process.",
      },
      {
        question:
          "What happens if I don't find a job within the six-month period?",
        answer:
          "If you're unable to secure employment within the six-month period, you must leave Germany when your visa expires. You can apply for the Job Seeker Visa again, but typically only after spending some time outside Germany. Before reapplying, we recommend improving your qualifications, German language skills, or job search strategies based on your experience during the first attempt.",
      },
      {
        question:
          "Which professions have the best chances with a Job Seeker Visa?",
        answer:
          "Germany currently has high demand for professionals in: 1) Information Technology (software developers, IT security specialists, data scientists), 2) Engineering (mechanical, electrical, civil), 3) Healthcare (doctors, specialists), 4) Natural Sciences (chemists, biologists, physicists), 5) Mathematics and Statistics, and 6) Teaching and Education. Your chances are best if your qualifications and experience align with Germany's skilled labor shortage areas.",
      },
    ],
    visa: [
      {
        question: "What types of German visas do you provide consultancy for?",
        answer:
          "We provide consultancy for various German visa types, including: 1) Language Course Visa, 2) Student Visa, 3) Job Seeker Visa, 4) Work Visa, 5) Training/Ausbildung Visa, 6) Family Reunion Visa, and 7) Blue Card (for highly qualified professionals). Our consultancy services include assessment of eligibility, document preparation, application guidance, and interview preparation.",
      },
      {
        question:
          "What documents are typically required for German visa applications?",
        answer:
          "While specific requirements vary by visa type, common documents include: 1) Valid passport, 2) Visa application form, 3) Biometric photos, 4) Proof of purpose (job offer, university admission, etc.), 5) Proof of financial resources, 6) Health insurance coverage, 7) Language certificates, 8) Educational/professional certificates, and 9) Motivation letter or CV. All documents must be translated into German by certified translators if they're not already in German or English.",
      },
      {
        question: "How long does the visa application process take?",
        answer:
          "The processing time varies depending on the visa type and current workload at the German embassy or consulate. Typically, you can expect: 1) Language Course Visa: 2-4 weeks, 2) Student Visa: 4-6 weeks, 3) Job Seeker Visa: 4-12 weeks, 4) Work Visa: 4-8 weeks, 5) Ausbildung Visa: 4-8 weeks. We recommend applying well in advance of your planned departure to allow for any unexpected delays.",
      },
      {
        question: "What is a blocked account and why do I need it?",
        answer:
          "A blocked account (Sperrkonto) is a special type of German bank account required for most long-term visa applications. It serves as proof that you have sufficient financial resources to support yourself in Germany. You must deposit a specific amount (currently €11,208 for one year) which is then released to you in monthly installments after arrival in Germany. We can guide you through the process of opening a blocked account with approved providers.",
      },
      {
        question: "What happens if my visa application is rejected?",
        answer:
          "If your visa application is rejected, you'll receive a letter stating the reasons for rejection. Depending on the reasons, you can either: 1) Appeal the decision within one month, 2) Address the issues and reapply, or 3) Consider alternative pathways. Our consultants will analyze the rejection reasons and advise on the best course of action. With proper preparation and our guidance, rejection rates among our clients are very low.",
      },
    ],
  };

  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? Object.values(faqData)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqData[activeCategory];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">AOCA Resources Limited</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/#pathways"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Pathways
            </Link>
            <Link
              to="/#courses"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/blog"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-primary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600">
                Find answers to common questions about our services, German
                immigration pathways, and more
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for questions..."
                  className="w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories */}
              {!searchQuery && (
                <div className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-bold mb-4">Categories</h3>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() => setActiveCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-md ${
                              activeCategory === category.id
                                ? "bg-primary text-white"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* FAQ List */}
              <div className={searchQuery ? "w-full" : "lg:w-3/4"}>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    {searchQuery
                      ? "Search Results"
                      : categories.find((c) => c.id === activeCategory)?.name}
                  </h2>

                  {filteredFAQs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-2">
                        No questions found matching your search.
                      </p>
                      <p className="text-gray-500">
                        Try using different keywords or browse by category.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFAQs.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border rounded-lg overflow-hidden"
                        >
                          <button
                            className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50"
                            onClick={() =>
                              toggleQuestion(`${activeCategory}-${index}`)
                            }
                          >
                            <span>{faq.question}</span>
                            {openQuestions[`${activeCategory}-${index}`] ? (
                              <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>

                          {openQuestions[`${activeCategory}-${index}`] && (
                            <div className="p-4 bg-gray-50 border-t">
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer you were looking for, our team is
              here to help. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:08038867495"
                className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary/10 transition-colors"
              >
                Call Us
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Globe className="h-8 w-8" />
                <span className="font-bold text-xl">
                  AOCA Resources Limited
                </span>
              </Link>
              <p className="text-gray-400 mb-4">
                Your trusted partner for German language training, visa
                consultancy, and recruitment services.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/#pathways"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pathways
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Globe className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Lagos Office:</p>
                    <p className="text-gray-400">
                      8 Bayo Adetuna Street off Sangotedo. Lagos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Port Harcourt Office:</p>
                    <p className="text-gray-400">
                      7 Salvation Avenue, Off Igbo Etche Road, Rumukwurusi, Port
                      Harcourt
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4 mb-6">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} AOCA Resources Limited. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FAQ;
