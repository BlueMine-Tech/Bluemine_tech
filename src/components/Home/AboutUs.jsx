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
      boxShadow: "0 10px 15px -3px rgba(218, 131, 89, 0.1), 0 4px 6px -2px rgba(218, 131, 89, 0.05)"
    },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 20px 25px -5px rgba(218, 131, 89, 0.2), 0 10px 10px -5px rgba(218, 131, 89, 0.1)",
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
      className="relative py-20 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, #FCFAEE 0%, #ECDFCC 30%, #FCFAEE 70%, #ECDFCC 100%)`
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic background blobs based on scroll */}
        <motion.div 
          className="absolute right-0 top-40 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'rgba(218, 131, 89, 0.15)'
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style1={{ 
            x: xMouse
          }}
        />
        <motion.div 
          className="absolute -left-20 top-20 w-80 h-80 rounded-full blur-3xl"
          style={{ 
            background: 'rgba(236, 223, 204, 0.4)'
          }}
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
          style2={{ 
            x: -xMouse * 0.5
          }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-20 w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: 'rgba(218, 131, 89, 0.1)'
          }}
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
          style3={{ 
            x: xMouse * 0.3
          }}
        />
        
        {/* Subtle pattern overlay for texture */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DA8359' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Animated connector from previous section */}
      <div className="relative z-10">
        <motion.div 
          className="w-1 h-24 mx-auto -mt-20"
          style={{
            background: `linear-gradient(to bottom, #DA8359, rgba(218, 131, 89, 0))`
          }}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 96, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.div
          className="w-6 h-6 rounded-full mx-auto -mt-3 relative z-10"
          style={{ backgroundColor: '#DA8359' }}
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
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'rgba(218, 131, 89, 0.7)' }}
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
            style={{ color: '#8B4513' }}
            variants={itemVariants}
          >
            About <span 
              className="bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, #DA8359, #B8956A)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Us
            </span>
          </motion.h2>
          
          <motion.div 
            className="flex justify-center items-center gap-2 mb-6"
            variants={itemVariants}
          >
            <span 
              className="h-1 w-12 rounded-full"
              style={{ backgroundColor: '#DA8359' }}
            />
            <div 
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: '#B8956A' }}
            />
            <span 
              className="h-1 w-12 rounded-full"
              style={{ backgroundColor: '#DA8359' }}
            />
          </motion.div>
          
          <motion.p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: '#6B4423' }}
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
              <p 
                className="text-lg leading-relaxed mb-6"
                style={{ color: '#6B4423' }}
              >
                <span 
                  className="font-medium"
                  style={{ color: '#DA8359' }}
                >
                  Bluemine Technologies
                </span> is a fresh, innovative software solutions and digital marketing company based in India. We focus on delivering impactful digital campaigns and technology tools that drive real business results.
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
                className="backdrop-blur-sm rounded-xl p-6 border-l-4 shadow-lg"
                style={{
                  background: 'rgba(252, 250, 238, 0.8)',
                  borderLeftColor: '#DA8359'
                }}
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(218, 131, 89, 0.2)',
                      color: '#DA8359'
                    }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 
                      className="text-2xl font-bold mb-3"
                      style={{ color: '#DA8359' }}
                    >
                      Our Vision
                    </h3>
                    <p style={{ color: '#6B4423' }}>
                      To be the go-to partner for businesses aiming for digital excellence through intelligent marketing strategies and tailor-made software solutions.
                    </p>
                    
                    <motion.div 
                      className="w-0 h-0.5 mt-3 group-hover:w-full"
                      style={{
                        background: `linear-gradient(to right, #DA8359, #B8956A)`
                      }}
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
                className="backdrop-blur-sm rounded-xl p-6 border-l-4 shadow-lg"
                style={{
                  background: 'rgba(252, 250, 238, 0.8)',
                  borderLeftColor: '#B8956A'
                }}
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(184, 149, 106, 0.2)',
                      color: '#B8956A'
                    }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 
                      className="text-2xl font-bold mb-3"
                      style={{ color: '#DA8359' }}
                    >
                      Our Mission
                    </h3>
                    <p style={{ color: '#6B4423' }}>
                      To empower brands with result-driven marketing and efficient technology that enhances growth and operational success.
                    </p>
                    
                    <motion.div 
                      className="w-0 h-0.5 mt-3 group-hover:w-full"
                      style={{
                        background: `linear-gradient(to right, #B8956A, #DA8359)`
                      }}
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
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: `linear-gradient(135deg, rgba(218, 131, 89, 0.2), rgba(184, 149, 106, 0.2))`,
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
                <div 
                  className="absolute inset-0 rounded-full blur-md"
                  style={{
                    background: `linear-gradient(135deg, rgba(218, 131, 89, 0.4), rgba(184, 149, 106, 0.4))`
                  }}
                />
                <div 
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, rgba(218, 131, 89, 0.3), rgba(184, 149, 106, 0.3))`
                  }}
                />
                
                {/* Center logo or icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: '#DA8359' }}
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
                    className="absolute inset-0 rounded-full border"
                    style={{
                      borderWidth: 1 + index * 0.5,
                      borderRadius: "9999px",
                      borderColor: `rgba(218, 131, 89, ${0.3 - index * 0.05})`
                    }}
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      rotate: {
                        duration: 15 + index*5, 
                        repeat: Infinity, 
                        ease: "linear"
                      }
                    }}
                  />
                </motion.div>
              ))}
              
              {/* Dynamic floating elements that follow mouse subtly */}
              {techIcons.map((item, index) => {
                const baseDelay = item.delay;
                
                return (
                  <motion.div
                    key={`icon-${index}`}
                    className={`absolute ${item.position} p-3 rounded-full shadow-lg z-10`}
                    style={{
                      backgroundColor: 'rgba(252, 250, 238, 0.9)',
                      border: '1px solid rgba(236, 223, 204, 0.8)'
                    }}
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
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'rgba(218, 131, 89, 0.5)' }}
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
            className="flex flex-col items-center transition-colors duration-300 group"
            style={{ color: '#DA8359' }}
            whileHover={{ 
              y: 3,
              color: '#B8956A'
            }}
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