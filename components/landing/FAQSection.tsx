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




  // FAQ data structure with categories - updated content
  const faqItems = [
    {
      id: 1,
      question: "What makes AMP Vending Machines different in Modesto?",
      answer: "ampvendingmachines.com provides Modesto and Stanislaus County businesses with 21.5\" HD touchscreen vending machines, contactless payment technology, and smart inventory monitoring. We offer comprehensive service including free installation, maintenance, and restocking throughout Central California.",
      icon: <Zap size={20} />,
      category: "technology"
    },
    {
      id: 2,
      question: "What types of products are available?",
      answer: "We offer a wide selection of premium snacks, beverages, and healthy options. Our team customizes the product mix based on your workplace preferences and employee feedback.",
      icon: <Search size={20} />,
      category: "products"
    },
    {
      id: 3,
      question: "How often are machines restocked and maintained?",
      answer: "We monitor inventory levels remotely and typically restock weekly, though high-traffic locations may receive more frequent service. All maintenance is included in our service package.",
      icon: <HelpCircle size={20} />,
      category: "service"
    },
    {
      id: 4,
      question: "What payment methods are accepted?",
      answer: "Our machines accept multiple payment options including credit/debit cards, mobile payments (Apple Pay, Google Pay), as well as traditional cash and coins for maximum convenience.",
      icon: <CreditCard size={20} />,
      category: "payment"
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
          <span className="text-[#FD5A1E] font-medium text-sm">Quick Answers</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#F5F5F5]">
          Vending Machine <span className="text-[#FD5A1E]">FAQs</span>  
        </h2>

        <p className="text-lg text-[#A5ACAF] max-w-3xl mx-auto">
          Everything you need to know about AMP Vending Machines in Modesto, Stanislaus County to Stockton San Joaquin County.
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
          Have More Questions About AMP Vending Machines?
        </h3>
        <p className="text-[#A5ACAF] max-w-2xl mx-auto mb-6">
          Our Modesto-based team is ready to answer any questions about AMP Vending Machines,
          technology features, service packages, and installation process for Stanislaus County businesses.
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