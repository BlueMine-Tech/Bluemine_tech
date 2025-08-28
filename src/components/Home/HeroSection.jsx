import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mouse movement for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Track scroll position for scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Rotating words animation
  const words = ["Smart", "Strategic", "Innovative", "Powerful"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate particles with varied sizes
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 5,
      x: Math.random() * 100, // percentage of screen width
      y: Math.random() * 100, // percentage of screen height
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 10 + 15,
    }));
  };

  const particles = generateParticles(20);

  // Features with more engaging icons
  const features = [
    { title: "Software Solutions", icon: "💻", description: "Custom development" },
    { title: "Digital Marketing", icon: "💼", description: "Grow your reach" },
    { title: "24/7 Support", icon: "🔧", description: "Always available" },
    { title: "Data Analytics", icon: "📊", description: "Informed decisions" }
  ];

  // Stagger animation for children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 w-full"
      style={{ 
        background: `linear-gradient(135deg, #FCFAEE 0%, #ECDFCC 50%, #FCFAEE 100%)`,
        width: '100vw', 
        maxWidth: '100vw',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            background: `rgba(218, 131, 89, ${particle.opacity})`,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -500],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated background gradient overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(218, 131, 89, 0.15) 0%, transparent 70%)`
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Radial glow following mouse (disabled on mobile) */}
      {!isMobile && (
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(218, 131, 89, 0.2) 0%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col justify-center min-h-[calc(100vh-80px)] text-center">
          {/* Animated Heading with responsive sizing */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 sm:mt-0"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: '#8B4513' }}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Empowering Businesses Through
              </motion.span>
              <br />
              <div className="h-16 sm:h-20 md:h-24 flex justify-center items-center">
                <motion.span
                  key={currentWordIndex}
                  className="absolute"
                  style={{ color: '#DA8359' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Digital Solutions
              </motion.span>
            </h1>
          </motion.div>

          {/* Animated Underline */}
          <div className="relative flex justify-center mt-4">
            <motion.div
              className="h-1 rounded-full mx-auto"
              style={{ backgroundColor: '#DA8359' }}
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
            <motion.div
              className="absolute h-1 rounded-full mx-auto"
              style={{ backgroundColor: '#B8956A' }}
              initial={{ width: 0 }}
              animate={{ width: "40px" }}
              transition={{ 
                delay: 1.2, 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
          </div>

          {/* Subheading with better responsive text */}
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4"
            style={{ color: '#6B4423' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At BlueMine Technologies, we specialize in driving business growth through advanced software solutions and result-driven digital marketing, 
            including SEO, social media marketing, PPC, content strategy, and performance campaigns..
          </motion.p>

          {/* Call to Action Buttons with improved animations */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.a
              href="#services"
              className="px-6 sm:px-8 py-3 font-bold rounded-lg shadow-lg transition-all"
              style={{ 
                backgroundColor: '#DA8359',
                color: '#FCFAEE',
                boxShadow: '0 4px 15px rgba(218, 131, 89, 0.3)'
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: '#C66A44',
                boxShadow: '0 10px 25px rgba(218, 131, 89, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Our Services
            </motion.a>

            <motion.a
              href="/contact"
              className="px-6 sm:px-8 py-3 border-2 font-medium rounded-lg transition-all"
              style={{ 
                borderColor: '#DA8359',
                color: '#DA8359',
                backgroundColor: 'rgba(252, 250, 238, 0.8)'
              }}
              whileHover={{
                scale: 1.05,
                borderColor: '#C66A44',
                color: '#C66A44',
                backgroundColor: '#FCFAEE'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
            </motion.a>
          </motion.div>

          {/* Features with staggered animations */}
          <motion.div
            className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center p-3 sm:p-4 rounded-lg backdrop-blur-sm border transition-all"
                style={{
                  backgroundColor: 'rgba(252, 250, 238, 0.7)',
                  borderColor: 'rgba(236, 223, 204, 0.8)'
                }}
                variants={childVariants}
                whileHover={{ 
                  y: -5,
                  backgroundColor: 'rgba(252, 250, 238, 0.9)',
                  borderColor: 'rgba(218, 131, 89, 0.5)',
                  boxShadow: '0 4px 20px rgba(218, 131, 89, 0.2)'
                }}
              >
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl mb-2"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: 2 + index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 7
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-medium text-xs sm:text-sm md:text-base"
                    style={{ color: '#DA8359' }}>
                  {feature.title}
                </h3>
                <p className="text-xs mt-1 hidden sm:block"
                   style={{ color: '#8B6F47' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator with enhanced animation */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [0, 5, 10, 5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.2, 0.8, 1]
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs sm:text-sm mb-2"
                    style={{ color: '#8B6F47' }}>
                Scroll Down
              </span>
              <motion.svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ color: '#DA8359' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </motion.svg>
            </div>
          </motion.div>
         
       
        </div>
      </div>
      
      {/* Subtle bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 overflow-hidden z-0">
        <svg 
          viewBox="0 0 1200 120" 
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0Z"
            fill="rgba(236, 223, 204, 0.6)"
            animate={{
              d: [
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0Z",
                "M321.39,86.44c58-10.79,114.16-10.13,172-11.86,82.39-16.72,168.19-37.73,250.45-20.39C823.78,61,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0Z",
                "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </section>
  );
}
