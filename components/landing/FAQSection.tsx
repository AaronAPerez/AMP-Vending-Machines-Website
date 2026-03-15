import Link from 'next/link';
import { motion } from 'framer-motion';
import { HelpCircle, Search, Zap, CreditCard } from 'lucide-react';
import Section from '../ui/shared/Section';

/**
 * FAQSection Component
 * Displays frequently asked questions about AMP Vending services
 * Updated to remove cost references and focus on service benefits
 */
const FAQSection = () => {




  // FAQ data structure with categories - SEO optimized for high-volume keywords
  const faqItems = [
    {
      id: 1,
      question: "How do I get a free vending machine for my business?",
      answer: "Getting a free vending machine is simple! AMP Vending provides free snack and drink vending machine placement for offices, warehouses, and workplaces in Modesto, Stockton, and Central Valley California. We handle everything - free installation, free maintenance, and free restocking. Contact us to qualify for free vending machine placement.",
      icon: <Zap size={20} />,
      category: "free placement"
    },
    {
      id: 2,
      question: "What types of vending machines do you offer?",
      answer: "We offer snack vending machines, drink vending machines, beverage vending machines, combo vending machines, and healthy vending machines. AMP vending machines feature 21.5\" HD touchscreen displays, cashless payment with tap-to-pay technology, and refrigerated options for cold drinks and fresh food.",
      icon: <Search size={20} />,
      category: "machine types"
    },
    {
      id: 3,
      question: "Do your vending machines accept credit cards and Apple Pay?",
      answer: "Yes! All our vending machines are cashless vending machines that accept credit cards, debit cards, Apple Pay, Google Pay, and tap-to-pay contactless payments. We also accept traditional cash and coins for maximum convenience.",
      icon: <CreditCard size={20} />,
      category: "cashless payment"
    },
    {
      id: 4,
      question: "What locations qualify for free vending machine placement?",
      answer: "We provide free vending machine placement for offices, warehouses, factories, schools, gyms, hotels, hospitals, and break rooms with 50+ employees or regular foot traffic. Our full-service vending includes free installation, maintenance, and restocking in Modesto, Stockton, Stanislaus County, San Joaquin County and throughout Central Valley California.",
      icon: <HelpCircle size={20} />,
      category: "locations"
    }
  ];

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Section
      id="faq"
      background="dark"
      spacing="lg"
    // className='max-w-7xl'
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-[#FD5A1E]/10 rounded-full mb-6">
          <span className="text-[#FD5A1E] font-medium text-sm">Free Vending Machine Placement</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
          Vending Machine <span className="text-[#FD5A1E]">FAQs</span>
        </h2>

        <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
          Learn how to get a free vending machine for your business. Snack, drink & cashless vending machines for offices and workplaces in Central Valley California.
        </p>
      </div>

      {/* FAQ Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-[#111111] rounded-xl overflow-hidden border border-[#333333] hover:border-[#FD5A1E] transition-all"
            variants={itemVariants}
          >
            {/* Question */}
            <div className="p-6 border-b border-[#333333] flex items-start gap-4">
              <div className="p-2 bg-[#FD5A1E]/10 rounded-full text-[#FD5A1E] flex-shrink-0">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#F5F5F5]">{item.question}</h3>
            </div>

            {/* Answer */}
            <div className="p-6">
              <p className="text-[#A5ACAF]">{item.answer}</p>

              {/* Category Tag */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs py-1 px-3 bg-[#333333] text-[#A5ACAF] rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Questions Section */}
      <motion.div
        className="bg-[#0a0a0a] rounded-xl p-8 border border-[#333333] mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-[#F5F5F5] mb-4">
          Ready to Get a Free Vending Machine?
        </h3>
        <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-6">
          Contact us about free vending machine placement for your office, warehouse, or workplace.
          We serve Modesto, Stockton, and all of Central Valley California with snack, drink & combo vending machines.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#FD5A1E]/10 text-[#FD5A1E] rounded-full border border-[#FD5A1E]/30 hover:bg-[#FD5A1E]/20 transition-colors"
          >
            <span>Contact Support</span>
            <HelpCircle size={16} className="ml-2" />
          </Link>
        </div>
      </motion.div>
    </Section>
  );
};

export default FAQSection;