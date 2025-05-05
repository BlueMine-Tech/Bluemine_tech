import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState(null);
  
  // Services data
  const services = [
    {
      id: 1,
      title: "Digital Marketing",
      icon: "📱",
      description: "SEO, SMO, Meta & Google Ads, Influencer Marketing",
      color: "blue"
    },
    {
      id: 2,
      title: "Social Media Management",
      icon: "💬",
      description: "Facebook, Instagram, WhatsApp, YouTube - complete handling",
      color: "indigo"
    },
    {
      id: 3,
      title: "Web Development",
      icon: "🌐",
      description: "Custom websites, E-commerce solutions, maintenance",
      color: "purple"
    },
    {
      id: 4,
      title: "Business Growth",
      icon: "📈",
      description: "Data analytics, tech support, research & telecaller services",
      color: "cyan"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Get color class based on service color
  const getColorClasses = (color, isHovered) => {
    const baseClasses = {
      blue: {
        bg: isHovered ? "bg-blue-600" : "bg-blue-600/20",
        border: "border-blue-500",
        text: "text-blue-400",
        glow: "bg-blue-500/20"
      },
      indigo: {
        bg: isHovered ? "bg-indigo-600" : "bg-indigo-600/20",
        border: "border-indigo-500",
        text: "text-indigo-400",
        glow: "bg-indigo-500/20"
      },
      purple: {
        bg: isHovered ? "bg-purple-600" : "bg-purple-600/20",
        border: "border-purple-500",
        text: "text-purple-400",
        glow: "bg-purple-500/20"
      },
      cyan: {
        bg: isHovered ? "bg-cyan-600" : "bg-cyan-600/20",
        border: "border-cyan-500",
        text: "text-cyan-400",
        glow: "bg-cyan-500/20"
      }
    };
    
    return baseClasses[color];
  };

  return (
    <section
      id="services"
      className="relative py-16 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Blue animated line connector from previous section */}
      <div className="relative w-1 h-20 bg-gradient-to-b from-blue-600 to-blue-400/0 mx-auto -mt-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Our <span className="text-blue-400">Services</span>
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-blue-500 mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-gray-300 max-w-3xl mx-auto text-lg"
            variants={itemVariants}
          >
            Empowering your business with innovative digital solutions
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color, hoveredService === service.id);
            return (
              <motion.div
                key={service.id}
                className={`relative rounded-xl p-6 border border-gray-700 backdrop-blur-sm transition-all duration-300 group ${hoveredService === service.id ? 'shadow-xl transform -translate-y-2' : 'shadow-md'}`}
                variants={itemVariants}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ scale: 1.03 }}
              >
                {/* Background glow effect */}
                <motion.div 
                  className={`absolute inset-0 rounded-xl ${colorClasses.glow} opacity-20 blur-md -z-10`}
                  animate={{ 
                    scale: hoveredService === service.id ? [1, 1.05, 1] : 1,
                    opacity: hoveredService === service.id ? [0.2, 0.4, 0.2] : 0.2
                  }}
                  transition={{ duration: 2, repeat: hoveredService === service.id ? Infinity : 0 }}
                />
                
                {/* Icon container */}
                <motion.div 
                  className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 mx-auto ${colorClasses.bg} transition-colors duration-300`}
                  animate={{ 
                    rotate: hoveredService === service.id ? 360 : 0 
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="text-3xl">{service.icon}</span>
                </motion.div>
                
                {/* Service title */}
                <h3 className={`text-xl font-bold text-center mb-3 ${colorClasses.text}`}>
                  {service.title}
                </h3>
                
                {/* Service description */}
                <p className="text-gray-300 text-center text-sm">
                  {service.description}
                </p>
                
                {/* Animated border */}
                <motion.div 
                  className={`absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none`}
                  animate={{ 
                    borderColor: hoveredService === service.id ? colorClasses.border : 'transparent',
                    opacity: hoveredService === service.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Learn more button - appears on hover */}
                <motion.div 
                  className="absolute bottom-4 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredService === service.id ? 1 : 0,
                    y: hoveredService === service.id ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.a 
                    href="#contact"
                    className={`text-sm ${colorClasses.text} font-medium flex items-center gap-1`}
                    whileHover={{ x: 3 }}
                  >
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="px-8 py-3 bg-blue-600 text-black font-bold rounded-lg shadow-lg shadow-blue-500/20 inline-block"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#2563eb",
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </motion.div>
        
        {/* Scroll to next section indicator */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#portfolio"
            className="flex flex-col items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
           
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}