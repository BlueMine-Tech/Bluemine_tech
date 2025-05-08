import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState(null);
  const [isInView, setIsInView] = useState(false);
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
  
  // Services data with extended info
  const services = [
    {
      id: 1,
      title: "Digital Marketing",
      icon: "📱",
      description: "SEO, SMO, Meta & Google Ads, Influencer Marketing",
      color: "blue",
      features: ["Search Engine Optimization", "Social Media Campaigns", "PPC Management", "Analytics"]
    },
    {
      id: 2,
      title: "Social Media Management",
      icon: "💬",
      description: "Facebook, Instagram, WhatsApp, YouTube - complete handling",
      color: "indigo",
      features: ["Content Creation", "Community Management", "Growth Strategy", "Engagement"]
    },
    {
      id: 3,
      title: "Web Development",
      icon: "🌐",
      description: "Custom websites, E-commerce solutions, maintenance",
      color: "purple",
      features: ["Responsive Design", "E-commerce Solutions", "CMS Integration", "Performance"]
    },
    {
      id: 4,
      title: "Business Growth",
      icon: "📈",
      description: "Data analytics, tech support, research & telecaller services",
      color: "cyan",
      features: ["Market Research", "Data Analysis", "Growth Strategy", "Support Services"]
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
        lightBg: "bg-blue-500/10",
        border: "border-blue-500",
        shadowColor: "rgba(59, 130, 246, 0.3)",
        text: "text-blue-400",
        darkText: "text-blue-600", 
        glow: "bg-blue-500/20",
        gradientFrom: "from-blue-600",
        gradientTo: "to-blue-400"
      },
      indigo: {
        bg: isHovered ? "bg-indigo-600" : "bg-indigo-600/20",
        lightBg: "bg-indigo-500/10",
        border: "border-indigo-500",
        shadowColor: "rgba(99, 102, 241, 0.3)",
        text: "text-indigo-400",
        darkText: "text-indigo-600",
        glow: "bg-indigo-500/20",
        gradientFrom: "from-indigo-600",
        gradientTo: "to-indigo-400"
      },
      purple: {
        bg: isHovered ? "bg-purple-600" : "bg-purple-600/20",
        lightBg: "bg-purple-500/10",
        border: "border-purple-500",
        shadowColor: "rgba(168, 85, 247, 0.3)",
        text: "text-purple-400",
        darkText: "text-purple-600",
        glow: "bg-purple-500/20",
        gradientFrom: "from-purple-600",
        gradientTo: "to-purple-400"
      },
      cyan: {
        bg: isHovered ? "bg-cyan-600" : "bg-cyan-600/20",
        lightBg: "bg-cyan-500/10",
        border: "border-cyan-500",
        shadowColor: "rgba(34, 211, 238, 0.3)",
        text: "text-cyan-400",
        darkText: "text-cyan-600",
        glow: "bg-cyan-500/20",
        gradientFrom: "from-cyan-600",
        gradientTo: "to-cyan-400"
      }
    };
    
    return baseClasses[color];
  };

  // Function to generate particles for animation
  const generateParticles = (count, color) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color
    }));
  };

  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden"
      onViewportEnter={() => setIsInView(true)}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        <motion.div 
          className="absolute left-0 bottom-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2
          }}
        />
      </div>

      {/* Animated connector from previous section */}
      <div className="relative">
        <motion.div 
          className="absolute left-1/2 -top-20 transform -translate-x-1/2 w-1 h-20 bg-blue-500/50"
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 80, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute left-1/2 -top-5 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div 
            className="w-3 h-3 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading with enhanced animations */}
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
            Our <motion.span 
              className="text-blue-400 inline-block"
              animate={{ 
                color: ['#60a5fa', '#818cf8', '#a78bfa', '#22d3ee', '#60a5fa'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Services
            </motion.span>
          </motion.h2>
          
          
          <motion.p 
            className="text-gray-300 max-w-3xl mx-auto text-lg"
            variants={itemVariants}
          >
            Empowering your business with innovative digital solutions
          </motion.p>
        </motion.div>

        {/* Services grid with enhanced cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color, hoveredService === service.id);
            const particles = generateParticles(8, service.color);
            
            return (
              <motion.div
                key={service.id}
                className={`relative rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 overflow-hidden`}
                style={{
                  boxShadow: hoveredService === service.id ? `0 10px 25px -5px ${colorClasses.shadowColor}` : 'none',
                  transform: hoveredService === service.id ? 'translateY(-8px)' : 'translateY(0)'
                }}
                variants={itemVariants}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background glow effect */}
                <motion.div 
                  className={`absolute inset-0 ${colorClasses.glow} opacity-0 blur-xl -z-10`}
                  animate={{ 
                    opacity: hoveredService === service.id ? 0.4 : 0,
                    scale: hoveredService === service.id ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: hoveredService === service.id ? Infinity : 0 }}
                />
                
                {/* Animated background particles on hover */}
                {hoveredService === service.id && particles.map(particle => (
                  <motion.div
                    key={`particle-${service.id}-${particle.id}`}
                    className={`absolute rounded-full ${colorClasses.bg} opacity-0`}
                    style={{
                      width: particle.size,
                      height: particle.size,
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                    }}
                    animate={{
                      y: [-20, -100],
                      x: [0, particle.id % 2 === 0 ? 20 : -20],
                      opacity: [0, 0.7, 0],
                      scale: [0, 1, 0.5]
                    }}
                    transition={{
                      duration: particle.duration / 3,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                {/* Card content container with inner glow on hover */}
                <div className="relative z-10">
                  {/* Icon container with rotating orbital ring */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Orbital ring animation */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${colorClasses.border} opacity-60`}
                      style={{ borderStyle: 'dashed' }}
                      animate={{ 
                        rotate: hoveredService === service.id ? 360 : 0,
                        scale: hoveredService === service.id ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    />
                    
                    {/* Orbital dots */}
                    {hoveredService === service.id && (
                      <>
                        <motion.div
                          className={`absolute w-2 h-2 rounded-full ${colorClasses.bg}`}
                          animate={{ 
                            rotate: 360,
                          }}
                          style={{ 
                            top: '50%', 
                            left: '50%',
                            translateX: '-50%', 
                            translateY: '-50%', 
                            transformOrigin: 'center center'
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "linear"
                          }}
                        >
                          <div className={`absolute top-0 left-0 -ml-1 -mt-1 w-4 h-4 rounded-full ${colorClasses.bg} opacity-30`} />
                        </motion.div>
                        
                        <motion.div
                          className={`absolute w-2 h-2 rounded-full ${colorClasses.bg}`}
                          animate={{ 
                            rotate: -360,
                          }}
                          style={{ 
                            top: '50%', 
                            left: '50%',
                            translateX: '-50%', 
                            translateY: '-50%', 
                            transformOrigin: 'center center'
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: 0.5
                          }}
                        >
                          <div className={`absolute top-0 left-0 -ml-1 -mt-1 w-4 h-4 rounded-full ${colorClasses.bg} opacity-30`} />
                        </motion.div>
                      </>
                    )}

                    {/* Icon background with pulse effect */}
                    <motion.div 
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center`}
                      animate={{ 
                        boxShadow: hoveredService === service.id 
                          ? ['0 0 0 0 rgba(0,0,0,0)', `0 0 20px 0px ${colorClasses.shadowColor}`, '0 0 0 0 rgba(0,0,0,0)'] 
                          : '0 0 0 0 rgba(0,0,0,0)',
                      }}
                      transition={{ duration: 2, repeat: hoveredService === service.id ? Infinity : 0 }}
                    >
                      <span className="text-3xl relative z-10">{service.icon}</span>
                    </motion.div>
                  </div>
                  
                  {/* Service title with animated underline */}
                  <div className="text-center mb-4">
                    <h3 className={`text-xl font-bold ${colorClasses.text} mb-1`}>
                      {service.title}
                    </h3>
                    
                    {/* Animated underline on hover */}
                    <motion.div 
                      className="h-0.5 bg-gray-700 rounded-full w-0 mx-auto overflow-hidden"
                      animate={{ 
                        width: hoveredService === service.id ? '80%' : '0%',
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div 
                        className={`h-full ${colorClasses.bg}`}
                        animate={{ x: [-40, 40, -40] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Service description */}
                  <p className="text-gray-300 text-center text-sm">
                    {service.description}
                  </p>
                  
                  {/* Features list - appears on hover */}
                  <motion.div
                    className="mt-4 overflow-hidden"
                    style={{ 
                      height: hoveredService === service.id ? 'auto' : 0,
                      opacity: hoveredService === service.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-1 text-xs text-gray-400">
                      {service.features.map((feature, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: hoveredService === service.id ? 1 : 0,
                            x: hoveredService === service.id ? 0 : -10
                          }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <motion.div 
                            className={`mr-2 w-1.5 h-1.5 rounded-full ${colorClasses.bg}`}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Animated corner accents that appear on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top left corner */}
                  <motion.div 
                    className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg ${colorClasses.border}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredService === service.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Bottom right corner */}
                  <motion.div 
                    className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg ${colorClasses.border}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredService === service.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* "Learn more" button with slide-in animation */}
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
                    className={`text-sm ${colorClasses.text} font-medium flex items-center gap-1 px-3 py-1 rounded-full ${colorClasses.lightBg}`}
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
        
        {/* Call to action button with gradient and pulse effect */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="relative inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-lg shadow-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-white/30"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ 
                opacity: [0, 1, 0],
                scale: [0, 3],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.3
              }}
              style={{ 
                translateX: '-50%',
                translateY: '-50%',
              }}
            />
            
            <Link to="/contact" className="relative inline-block">
  <span className="relative z-10 text-amber-50">Get Started</span>
</Link>
      
          </motion.a>
          
          {/* Subtle pulsing shadow under button */}
          <motion.div
            className="w-full h-4 mt-1 mx-auto"
            animate={{
              boxShadow: ['0 0 0px rgba(59, 130, 246, 0)', '0 0 15px rgba(59, 130, 246, 0.5)', '0 0 0px rgba(59, 130, 246, 0)']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
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
            animate={{ y: [0, 6, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <motion.div
              className="relative w-8 h-8"
              whileHover={{ scale: 1.2 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.div
                className="absolute inset-1 rounded-full border-2 border-blue-400/50"
                animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.2
                }}
              />
              <svg 
                className="w-8 h-8 text-blue-400"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M7 13L12 18L17 13" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M7 7L12 12L17 7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  strokeOpacity="0.5"
                />
              </svg>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}