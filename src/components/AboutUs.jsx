import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function AboutUsSection() {
  const sectionRef = useRef(null);

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

  const fadeInUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="about" 
      className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute left-20 bottom-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Blue animated line connector from previous section */}
      <div className="relative w-1 h-20 bg-gradient-to-b from-blue-600 to-blue-400/0 mx-auto -mt-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            About <span className="text-blue-400">Us</span>
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-blue-500 mx-auto mb-8"
            variants={itemVariants}
          ></motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column: About us content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={fadeInUpVariants}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Bluemine Technologies is a fresh, innovative digital marketing and software solutions company based in India. We focus on delivering impactful digital campaigns and technology tools that drive real business results.
              </p>
            </motion.div>

            {/* Vision and Mission cards */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-500 shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
              variants={fadeInUpVariants}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Our Vision</h3>
              <p className="text-gray-300">
                To be the go-to partner for businesses aiming for digital excellence through intelligent marketing strategies and tailor-made software solutions.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-400 shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
              variants={fadeInUpVariants}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-3">Our Mission</h3>
              <p className="text-gray-300">
                To empower brands with result-driven marketing and efficient technology that enhances growth and operational success.
              </p>
            </motion.div>
          </motion.div>

          {/* Right column: Animated visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              {/* Animated digital globe or tech visual representation */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/20 to-blue-400/20 blur-md"></div>
              
              {/* Pulsing core */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/30 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Orbital rings */}
              {[40, 60, 80].map((size, index) => (
                <motion.div
                  key={`ring-${index}`}
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-${400 - index*100}/30`}
                  style={{ width: `${size}%`, height: `${size}%` }}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 15 + index*5, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                />
              ))}
              
              {/* Floating elements */}
              {[
                { icon: "💡", delay: 0, position: "top-10 right-20" },
                { icon: "💻", delay: 1.2, position: "bottom-16 right-10" },
                { icon: "📱", delay: 0.7, position: "top-20 left-16" },
                { icon: "📊", delay: 1.5, position: "bottom-10 left-20" }
              ].map((item, index) => (
                <motion.div
                  key={`icon-${index}`}
                  className={`absolute ${item.position} bg-gray-800 p-3 rounded-full shadow-lg z-10`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: item.delay,
                    duration: 0.5 
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.7
                    }}
                    className="text-2xl"
                  >
                    {item.icon}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Scroll to next section indicator */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#services"
            className="flex flex-col items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <span className="text-sm mb-2">Discover Our Services</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}