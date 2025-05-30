import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ServicesBanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Handle mouse movement for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Category tabs animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveCategory(prev => (prev + 1) % serviceCategories.length);
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  // Service categories with animated icons - reordered with Software Solutions first
  const serviceCategories = [
    {
      title: "Software Solutions",
      icon: "💻",
      services: ["Custom Apps", "ERP", "CRM", "Automation"],
      color: "from-[#E5A287] to-[#DA8359]"
    },
    {
      title: "Digital Marketing",
      icon: "📱",
      services: ["SEO", "Social Media", "PPC", "Content"],
      color: "from-[#DA8359] to-[#B5684A]"
    },
    {
      title: "IT Support",
      icon: "🛠️",
      services: ["24/7 Support", "Maintenance", "Consulting", "Training"],
      color: "from-[#B5684A] to-[#9A8778]"
    },
    {
      title: "Data Analytics",
      icon: "📊",
      services: ["Reporting", "Visualization", "Research", "Insights"],
      color: "from-[#DA8359] to-[#E5A287]"
    }
  ];

  // Generate floating particles
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 15 + 10,
    }));
  };

  const particles = generateParticles(15);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const serviceCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    }
  };

  return (
    <section
      className="relative min-h-[70vh] bg-gradient-to-br from-[#FCFAEE] via-[#ECDFCC] to-[#E5A287]/20 overflow-hidden w-full py-16"
      style={{ 
        width: '100vw', 
        maxWidth: '100%',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#DA8359]/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, particle.x > 50 ? 100 : -100],
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
        className="absolute inset-0 bg-gradient-radial from-[#DA8359]/15 via-transparent to-[#B5684A]/10"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Secondary gradient overlay for depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-[#ECDFCC]/30 via-transparent to-[#FCFAEE]/20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Dynamic glow effect - enhanced */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[#DA8359]/8 blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-[#E5A287]/12 blur-2xl pointer-events-none"
            animate={{
              x: mousePosition.x - 128,
              y: mousePosition.y - 128,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
          />
        </>
      )}

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main heading with enhanced styling */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#6B5A45] via-[#9A8778] to-[#DA8359] bg-clip-text text-transparent text-center mb-2"
          >
            Our Services
          </motion.h1>
          
          {/* Enhanced animated double underline */}
          <motion.div 
            variants={itemVariants}
            className="relative h-1.5 w-28 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mx-auto mb-1 shadow-sm"
          >
            <motion.div
              className="absolute h-1.5 w-14 bg-gradient-to-r from-[#E5A287] to-[#DA8359] rounded-full"
              animate={{
                x: [0, 14, 0],
                width: [14, 20, 14]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-16 bg-gradient-to-r from-[#B5684A] to-[#DA8359] rounded-full mx-auto mb-8 shadow-sm"
          />

          {/* Enhanced subheading with better styling */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[#9A8778] max-w-3xl text-center mb-12 leading-relaxed"
          >
            Comprehensive 
            <motion.span 
              className="bg-gradient-to-r from-[#DA8359] via-[#E5A287] to-[#B5684A] bg-clip-text text-transparent px-2 font-semibold"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'],
                backgroundSize: ['100% 100%', '150% 100%', '100% 100%']
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Software & Digital
            </motion.span> 
            Solutions Tailored to Your Business Needs
          </motion.p>

          {/* Enhanced service category tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {serviceCategories.map((category, idx) => (
              <motion.button
                key={category.title}
                className={`px-5 py-3 md:px-7 md:py-4 rounded-2xl text-sm md:text-base font-semibold transition-all flex items-center shadow-md hover:shadow-lg ${
                  activeCategory === idx 
                    ? "bg-gradient-to-r from-[#DA8359] to-[#B5684A] text-[#FCFAEE] shadow-[#DA8359]/30 transform scale-105" 
                    : "bg-[#FCFAEE]/90 backdrop-blur-sm text-[#B5684A] hover:bg-[#ECDFCC] border-2 border-[#ECDFCC]/50 hover:border-[#DA8359]/30"
                }`}
                whileHover={{ scale: activeCategory === idx ? 1.05 : 1.08, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(idx)}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced active service category display */}
          <motion.div
            key={activeCategory}
            variants={serviceCardVariants}
            initial="hidden"
            animate="visible"
            className={`w-full max-w-5xl p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#FCFAEE]/95 via-[#ECDFCC]/80 to-[#E5A287]/10 backdrop-blur-md border border-[#ECDFCC]/60 shadow-2xl shadow-[#DA8359]/10`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Enhanced category icon with animation */}
              <motion.div
                className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#ECDFCC] to-[#FCFAEE] text-4xl md:text-5xl border-2 border-[#DA8359]/20 shadow-lg"
                animate={{
                  rotateY: [0, 360],
                  boxShadow: [
                    '0 4px 20px rgba(218,131,89,0.1)',
                    '0 8px 30px rgba(218,131,89,0.3)',
                    '0 4px 20px rgba(218,131,89,0.1)'
                  ]
                }}
                transition={{
                  rotateY: {
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                {serviceCategories[activeCategory].icon}
              </motion.div>

              {/* Enhanced category content */}
              <div className="flex-grow text-center md:text-left">
                <motion.h2 
                  className="bg-gradient-to-r from-[#6B5A45] to-[#DA8359] bg-clip-text text-transparent text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {serviceCategories[activeCategory].title} Solutions
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                  {serviceCategories[activeCategory].services.map((service, idx) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                      className="flex items-center p-3 rounded-lg bg-[#FCFAEE]/50 backdrop-blur-sm border border-[#ECDFCC]/30"
                    >
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mr-3 flex-shrink-0"
                        animate={{
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            '0 0 0 rgba(218,131,89,0.3)',
                            '0 0 10px rgba(218,131,89,0.6)',
                            '0 0 0 rgba(218,131,89,0.3)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.5
                        }}
                      />
                      <span className="text-[#6B5A45] font-medium">{service}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA button */}
                <motion.a
                  href={`#${serviceCategories[activeCategory].title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#DA8359] to-[#B5684A] hover:from-[#B5684A] hover:to-[#9A8778]  rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl text-amber-50"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(218,131,89,0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Learn More
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Bottom decorative elements */}
          <div className="mt-12 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#DA8359]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 overflow-hidden z-0">
        <svg 
          viewBox="0 0 1200 120" 
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(236, 223, 204, 0.8)"
            animate={{
              d: [
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                "M0,0V46.29c47.79,32.2,103.59,22.17,158,28,70.36-15.37,136.33-23.31,206.8-17.5C438.64,42.43,512.34,63.67,583,52.05c69.27-8,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,15,1113-24.29,1200,22.47V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              ]
            }}
            transition={{
              duration: 25,
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