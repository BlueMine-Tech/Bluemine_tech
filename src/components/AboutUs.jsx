import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function AboutUsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax effect with scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create motion values from scroll progress
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.5, 1, 1, 0.5]);
  
  // Create motion values from mouse position
  const [xMouse, setXMouse] = useState(0);
  const [yMouse, setYMouse] = useState(0);
  
  // Mouse follow effect (for floating elements and glow)
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use throttling to improve performance
      if (!window.requestAnimationFrame) return;
      
      window.requestAnimationFrame(() => {
        // Get mouse position relative to viewport
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        setMousePosition({ x, y });
        setXMouse(x * 40 - 20); // Convert to -20 to 20 range
        setYMouse(y * 40 - 20); // Convert to -20 to 20 range
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for more natural movement
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Card hover animation variants
  const cardVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    }
  };

  // Floating tech icons data
  const techIcons = [
    { icon: "💡", delay: 0, position: "top-10 right-20", size: "text-2xl" },
    { icon: "💻", delay: 1.2, position: "bottom-16 right-10", size: "text-3xl" },
    { icon: "📱", delay: 0.7, position: "top-20 left-16", size: "text-2xl" },
    { icon: "📊", delay: 1.5, position: "bottom-10 left-20", size: "text-2xl" },
    { icon: "🚀", delay: 0.3, position: "top-1/4 left-1/3", size: "text-xl" },
    { icon: "⚙️", delay: 0.9, position: "bottom-1/3 right-1/4", size: "text-xl" }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic background blobs based on scroll */}
        <motion.div 
          className="absolute right-0 top-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            x: xMouse
          }}
        />
        <motion.div 
          className="absolute -left-20 top-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{ 
            x: -xMouse * 0.5
          }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-20 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl"
          animate={{
            y: [0, 10, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{ 
            x: xMouse * 0.3
          }}
        />
        
        {/* Subtle grid pattern overlay for texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Animated connector from previous section */}
      <div className="relative z-10">
        <motion.div 
          className="w-1 h-24 bg-gradient-to-b from-blue-600 to-blue-400/0 mx-auto -mt-20"
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 96, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.div
          className="w-6 h-6 rounded-full bg-blue-500 mx-auto -mt-3 relative z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.4
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-8">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4"
            variants={itemVariants}
          >
            About <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Us</span>
          </motion.h2>
          
          <motion.div 
            className="flex justify-center items-center gap-2 mb-6"
            variants={itemVariants}
          >
            <span className="h-1 w-12 bg-blue-500 rounded-full"></span>
            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
            <span className="h-1 w-12 bg-blue-500 rounded-full"></span>
          </motion.div>
          
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            variants={itemVariants}
          >
            We're passionate about creating digital experiences that leave a lasting impression.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column: About us content */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={fadeInUpVariants}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                <span className="text-blue-400 font-medium">Bluemine Technologies</span> is a fresh, innovative digital marketing and software solutions company based in India. We focus on delivering impactful digital campaigns and technology tools that drive real business results.
              </p>
            </motion.div>

            {/* Vision and Mission cards with hover effects */}
            <motion.div 
              variants={fadeInUpVariants}
              initial="initial"
              whileHover="hover"
              animate="initial"
              className="group"
            >
              <motion.div
                variants={cardVariants}
                className="bg-gradient-to-r from-gray-800/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-500 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="p-2 bg-blue-500/20 rounded-lg text-blue-400"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-3">Our Vision</h3>
                    <p className="text-gray-300">
                      To be the go-to partner for businesses aiming for digital excellence through intelligent marketing strategies and tailor-made software solutions.
                    </p>
                    
                    <motion.div 
                      className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mt-3 group-hover:w-full"
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUpVariants}
              initial="initial"
              whileHover="hover"
              animate="initial"
              className="group"
            >
              <motion.div
                variants={cardVariants}
                className="bg-gradient-to-r from-gray-800/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border-l-4 border-blue-400 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="p-2 bg-blue-400/20 rounded-lg text-blue-300"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400 mb-3">Our Mission</h3>
                    <p className="text-gray-300">
                      To empower brands with result-driven marketing and efficient technology that enhances growth and operational success.
                    </p>
                    
                    <motion.div 
                      className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200 mt-3 group-hover:w-full"
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column: Enhanced animated visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div 
              className="relative aspect-square w-full max-w-lg mx-auto"
              style={{
                perspective: "1000px"
              }}
            >
              {/* Main glow effect that responds to mouse movement */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 blur-xl"
                style={{
                  x: xMouse * 0.5,
                  y: yMouse * 0.5
                }}
              />
              
              {/* Pulsating core */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/40 to-cyan-400/40 blur-md"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/30"></div>
                
                {/* Center logo or icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-blue-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </motion.div>
              
              {/* Enhanced 3D orbital rings */}
              {[40, 60, 80].map((size, index) => (
                <motion.div
                  key={`ring-${index}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    width: `${size}%`, 
                    height: `${size}%`,
                    rotateX: yMouse * -0.2,
                    rotateY: xMouse * 0.2
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-full border border-blue-${400 - index*100}/30`}
                    style={{
                      borderWidth: 1 + index * 0.5,
                      borderRadius: "9999px"
                    }}
                    animate={{ 
                      rotate: 360,
                      borderColor: [
                        `rgba(96, 165, 250, 0.3)`, // blue-400/30
                        `rgba(37, 99, 235, 0.3)`,  // blue-600/30
                        `rgba(96, 165, 250, 0.3)`  // back to blue-400/30
                      ]
                    }}
                    transition={{ 
                      rotate: {
                        duration: 15 + index*5, 
                        repeat: Infinity, 
                        ease: "linear"
                      },
                      borderColor: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Dynamic floating elements that follow mouse subtly */}
              {techIcons.map((item, index) => {
                // Calculate base positions and dynamic offsets based on mouse
                const baseDelay = item.delay;
                
                return (
                  <motion.div
                    key={`icon-${index}`}
                    className={`absolute ${item.position} bg-gray-800/90 p-3 rounded-full shadow-lg z-10`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      delay: baseDelay,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100
                    }}
                    style={{
                      x: mousePosition.x * (index % 2 === 0 ? 10 : -10),
                      y: mousePosition.y * (index % 3 === 0 ? 10 : -10)
                    }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                      }}
                      transition={{ 
                        duration: 2 + index * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className={item.size}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>
                );
              })}
              
              {/* Particle trail effects */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-blue-400/50"
                    initial={{ 
                      x: "50%", 
                      y: "50%", 
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      x: `${35 + Math.random() * 30}%`,
                      y: `${35 + Math.random() * 30}%`,
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.a
            href="#services"
            className="flex flex-col items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
            whileHover={{ y: 3 }}
          >
            <span className="text-sm font-medium mb-2 tracking-wide">
              Discover Our Services
            </span>
            <motion.div
              className="relative h-8 w-8 overflow-hidden"
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <svg
                className="w-8 h-8"
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
              <div className="absolute bottom-full left-0 w-full h-full transform group-hover:translate-y-full transition-transform duration-300">
                <svg
                  className="w-8 h-8"
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
              </div>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}