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

  // Service categories with animated icons
  const serviceCategories = [
    {
      title: "Digital Marketing",
      icon: "📱",
      services: ["SEO", "Social Media", "PPC", "Content"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Software Solutions",
      icon: "💻",
      services: ["Custom Apps", "ERP", "CRM", "Automation"],
      color: "from-blue-400 to-cyan-600"
    },
    {
      title: "IT Support",
      icon: "🛠️",
      services: ["24/7 Support", "Maintenance", "Consulting", "Training"],
      color: "from-indigo-500 to-blue-700"
    },
    {
      title: "Data Analytics",
      icon: "📊",
      services: ["Reporting", "Visualization", "Research", "Insights"],
      color: "from-cyan-500 to-blue-500"
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
      className="relative min-h-[70vh] bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 overflow-hidden w-full py-16"
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
          className="absolute rounded-full bg-blue-500/10"
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

      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-blue-900/10 to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Dynamic glow effect */}
      {!isMobile && (
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 160,
            y: mousePosition.y - 160,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
        />
      )}

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Main heading with animated underline */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-2"
          >
            Our Services
          </motion.h1>
          
          {/* Animated double underline */}
          <motion.div 
            variants={itemVariants}
            className="relative h-1 w-24 bg-blue-500 rounded-full mx-auto mb-1"
          >
            <motion.div
              className="absolute h-1 w-12 bg-blue-300 rounded-full"
              animate={{
                x: [0, 12, 0],
                width: [12, 18, 12]
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
            className="h-1 w-12 bg-blue-600 rounded-full mx-auto mb-6"
          />

          {/* Subheading with gradient text */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-2xl text-center mb-12"
          >
            Comprehensive 
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 px-2 font-medium"
              animate={{ 
                backgroundPosition: ['0% center', '100% center', '0% center'] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Digital & Software
            </motion.span> 
            Solutions Tailored to Your Business Needs
          </motion.p>

          {/* Service category tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {serviceCategories.map((category, idx) => (
              <motion.button
                key={category.title}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all flex items-center ${
                  activeCategory === idx 
                    ? "bg-blue-700 text-blue shadow-lg shadow-blue-700/30" 
                    : "bg-gray-800/70 text-blue-500 hover:bg-gray-800"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(idx)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </motion.button>
            ))}
          </motion.div>

          {/* Active service category display */}
          <motion.div
            key={activeCategory}
            variants={serviceCardVariants}
            initial="hidden"
            animate="visible"
            className={`w-full max-w-4xl p-6 md:p-8 rounded-xl bg-gradient-to-br ${serviceCategories[activeCategory].color} bg-opacity-10 backdrop-blur-sm border border-white/10`}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Category icon with animation */}
              <motion.div
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white/15 text-3xl md:text-4xl"
                animate={{
                  rotateY: [0, 360],
                  boxShadow: [
                    '0 0 0 rgba(255,255,255,0.1)',
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 0 rgba(255,255,255,0.1)'
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

              {/* Category content */}
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  {serviceCategories[activeCategory].title} Solutions
                </h2>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {serviceCategories[activeCategory].services.map((service, idx) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center"
                    >
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full mr-2"
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.5
                        }}
                      />
                      <span className="text-white">{service}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA button with hover effect */}
                <motion.a
                  href={`#${serviceCategories[activeCategory].title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block mt-6 px-6 py-2 bg-white/15 hover:bg-white/25 text-white rounded-lg font-medium transition-all"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(255,255,255,0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Bottom decorative elements */}
          <div className="mt-12 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500"
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
            fill="rgba(30, 41, 59, 0.8)"
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