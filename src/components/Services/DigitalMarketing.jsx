import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function DigitalMarketingServices() {
  const [activeService, setActiveService] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check if section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Digital marketing services data
  const services = [
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      shortName: 'SEO',
      icon: '🔍',
      description: 'Boost your website visibility in search results with data-driven SEO strategies that increase organic traffic and improve rankings.',
      features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 'smo',
      title: 'Social Media Optimization',
      shortName: 'SMO',
      icon: '📱',
      description: 'Enhance your brand presence across social platforms with engaging content strategies that connect with your target audience.',
      features: ['Profile Optimization', 'Content Calendar', 'Community Management', 'Growth Strategies'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'google-business',
      title: 'Google Business Profile',
      shortName: 'Google Business',
      icon: '🌐',
      description: 'Maximize your local search visibility with optimized Google Business Profiles that attract nearby customers and improve conversions.',
      features: ['Profile Setup', 'Location Management', 'Review Management', 'Local SEO'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'paid-ads',
      title: 'Meta & Google Ads',
      shortName: 'Paid Ads',
      icon: '📊',
      description: 'Drive targeted traffic and conversions with strategic paid advertising campaigns across Google, Facebook, Instagram, and more.',
      features: ['Campaign Strategy', 'Ad Creation', 'Performance Tracking', 'ROI Optimization'],
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'influencer',
      title: 'Influencer Marketing',
      shortName: 'Influencer',
      icon: '👥',
      description: 'Leverage influential voices in your industry to amplify your brand message and reach new relevant audiences effectively.',
      features: ['Influencer Research', 'Campaign Planning', 'Content Collaboration', 'Performance Analytics'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'content',
      title: 'Content Creation',
      shortName: 'Content',
      icon: '✏️',
      description: 'Engage your audience with compelling posts, reels, and multimedia content specifically designed for high engagement and conversions.',
      features: ['Content Strategy', 'Multimedia Production', 'Copywriting', 'Seasonal Campaigns'],
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  // Auto-rotate service display (stop on mobile)
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      if (isInView) {
        setActiveService(prev => (prev + 1) % services.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView, isMobile, services.length]);

  // Animation variants
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
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Generate floating shapes
  const generateShapes = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: Math.random() > 0.5 ? 'circle' : 'square',
      size: Math.random() * 10 + 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.15 + 0.05,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10
    }));
  };

  const shapes = generateShapes(15);

  return (
    <section 
      id="digital-marketing" 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden"
      style={{ 
        width: '100vw', 
        maxWidth: '100%',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Floating background shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.shape === 'circle' ? 'rounded-full' : 'rounded-md'} bg-blue-500/10`}
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
          }}
          animate={{
            x: [0, shape.x > 50 ? 100 : -100],
            y: [0, shape.y > 50 ? 50 : -50],
            rotate: [0, 180],
            opacity: [shape.opacity, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Interactive background glow */}
      {!isMobile && (
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* Section header with animated elements */}
          <motion.div
            variants={itemVariants} 
            className="flex items-center mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/50 text-2xl mr-3"
            >
              💼
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Digital Marketing Services</h2>
          </motion.div>

          {/* Animated underline */}
          <motion.div 
            variants={itemVariants}
            className="relative h-1 w-32 bg-blue-600 rounded-full mx-auto mb-8"
          >
            <motion.div
              className="absolute h-1 w-16 bg-blue-400 rounded-full"
              animate={{
                x: [0, 16, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* Service selection tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-12"
          >
            {services.map((service, idx) => (
              <motion.button
                key={service.id}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2 ${
                  activeService === idx 
                    ? "bg-blue-600 text-black shadow-lg shadow-blue-600/30" 
                    : "bg-gray-800/80 text-blue-500 hover:bg-gray-700/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveService(idx)}
              >
                <span>{service.icon}</span>
                <span className="hidden sm:inline">{service.shortName}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Active service detailed card */}
          <motion.div
            key={services[activeService].id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`w-full max-w-5xl p-6 md:p-8 rounded-2xl bg-gradient-to-br ${services[activeService].color} border border-white/10`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-center">
              {/* Service icon with floating animation */}
              <div className="lg:col-span-1 flex justify-center">
                <motion.div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-5xl md:text-6xl relative"
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: [
                      '0 0 0 rgba(59, 130, 246, 0.3)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 0 rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {services[activeService].icon}
                  
                  {/* Floating particles around icon */}
                  {[1, 2, 3].map((num) => (
                    <motion.div
                      key={num}
                      className="absolute w-3 h-3 rounded-full bg-blue-300/80"
                      style={{
                        top: `${30 * num}%`,
                        left: `${80 - 20 * num}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0.3, 0.7],
                        x: [0, 10, 0],
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 2 + num * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  ))}
                </motion.div>
              </div>

              {/* Service information */}
              <div className="lg:col-span-4 text-white">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {services[activeService].title}
                </motion.h3>

                <motion.p 
                  className="text-base md:text-lg text-blue-50/90 mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {services[activeService].description}
                </motion.p>

                {/* Service features with staggered animation */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {services[activeService].features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      className="flex items-center"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
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
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA button with hover animation */}
                <motion.a
                  href={`#contact`}
                  className="inline-block px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-lg shadow-blue-900/20"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  Get Started with {services[activeService].shortName}
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Process steps */}
          <motion.div
  variants={itemVariants}
  className="mt-20 w-full"
>
  <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-12">Our Digital Marketing Process</h3>
  
  {/* Mobile version - vertical layout */}
  <div className="flex md:hidden flex-col max-w-xs mx-auto">
    {['Research', 'Strategy', 'Execute', 'Analyze', 'Optimize'].map((step, idx) => (
      <motion.div
        key={step}
        className="relative flex items-center mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? {
          opacity: 1,
          x: 0,
          transition: { delay: 0.3 + idx * 0.1 }
        } : {}}
      >
        {/* Step number with smaller pulsing animation */}
        <motion.div
          className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(59, 130, 246, 0.7)',
              '0 0 0 5px rgba(59, 130, 246, 0)',
              '0 0 0 0 rgba(59, 130, 246, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: idx * 0.2
          }}
        >
          {idx + 1}
        </motion.div>
        
        {/* Step name */}
        <h4 className="text-lg font-medium text-white ml-4">{step}</h4>
      </motion.div>
    ))}
  </div>
  
  {/* Desktop version - horizontal layout */}
  <div className="hidden md:flex flex-row justify-between max-w-4xl mx-auto">
    {['Research', 'Strategy', 'Execute', 'Analyze', 'Optimize'].map((step, idx) => (
      <motion.div
        key={step}
        className="relative mb-8 md:mb-0"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? {
          opacity: 1,
          y: 0,
          transition: { delay: 0.5 + idx * 0.2 }
        } : {}}
      >
        {/* Step number with pulsing animation */}
        <motion.div
          className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 relative z-10"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(59, 130, 246, 0.7)',
              '0 0 0 10px rgba(59, 130, 246, 0)',
              '0 0 0 0 rgba(59, 130, 246, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: idx * 0.5
          }}
        >
          {idx + 1}
        </motion.div>
        
        {/* Step name */}
        <h4 className="text-lg font-medium text-white text-center">{step}</h4>
        
        {/* Connecting line (except for last item) */}
        {idx < 4 && (
          <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-blue-900">
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 0.5, delay: 1 + idx * 0.2 }}
            />
          </div>
        )}
      </motion.div>
    ))}
  </div>
</motion.div>
       
          
          {/* Bottom decoration */}
          <div className="mt-16 flex justify-center gap-6">
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
      
      {/* Bottom wave */}
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
                "M0,0V46.29c47.79,42.2,103.59,32.17,158,28,70.36-25.37,136.33-23.31,206.8-17.5C438.64,42.43,512.34,33.67,583,72.05c69.27-18,138.3,24.88,209.4,13.08,36.15-16,69.85-27.84,104.45-19.34C989.49,65,1113,-14.29,1200,32.47V0Z",
                "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-14.29,1200,52.47V0Z"
              ]
            }}
            transition={{
              duration: 30,
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