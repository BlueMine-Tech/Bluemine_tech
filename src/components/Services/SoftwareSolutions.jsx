import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function SoftwareSolutionsSection() {
  const [activeSolution, setActiveSolution] = useState(0);
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

  // Software solutions data
  const solutions = [
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      shortName: 'Custom Software',
      icon: '💻',
      description: 'Develop tailored offline & online applications designed specifically for your business needs and operational requirements.',
      features: ['Requirement Analysis', 'UI/UX Design', 'Development & Testing', 'Deployment & Support'],
      color: 'from-purple-600 to-purple-700'
    },
    {
      id: 'it-services',
      title: 'End-to-End IT Services',
      shortName: 'IT Services',
      icon: '🛠️',
      description: 'Comprehensive IT solutions covering everything from initial development to final deployment and ongoing maintenance.',
      features: ['Project Planning', 'Implementation', 'Training', 'Technical Support'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'scalable-design',
      title: 'Scalable & Intuitive Design',
      shortName: 'UI/UX Design',
      icon: '✨',
      description: 'Create future-proof software solutions with intuitive interfaces that grow with your business and enhance user experience.',
      features: ['Responsive Design', 'User Research', 'Prototype Testing', 'Visual Identity'],
      color: 'from-indigo-400 to-purple-600'
    },
    {
      id: 'erp-crm',
      title: 'ERP & CRM Solutions',
      shortName: 'ERP & CRM',
      icon: '📊',
      description: 'Implement industry-specific Enterprise Resource Planning and Customer Relationship Management systems tailored to your workflow.',
      features: ['Industry Customization', 'Process Integration', 'Data Management', 'Reporting Tools'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'automation',
      title: 'Business Process Automation',
      shortName: 'Automation',
      icon: '⚙️',
      description: 'Streamline operations by automating repetitive tasks and workflows, increasing efficiency and reducing human error.',
      features: ['Workflow Analysis', 'Custom Automation', 'Integration Services', 'Performance Metrics'],
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  // Auto-rotate solution display (stop on mobile)
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      if (isInView) {
        setActiveSolution(prev => (prev + 1) % solutions.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView, isMobile, solutions.length]);

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
      id="software-solutions" 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
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
          className={`absolute ${shape.shape === 'circle' ? 'rounded-full' : 'rounded-md'} bg-purple-500/10`}
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
          className="absolute w-64 h-64 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
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
              className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-900/50 text-2xl mr-3"
            >
              🖥️
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Software Solutions</h2>
          </motion.div>

          {/* Animated underline */}
          <motion.div 
            variants={itemVariants}
            className="relative h-1 w-32 bg-purple-600 rounded-full mx-auto mb-8"
          >
            <motion.div
              className="absolute h-1 w-16 bg-purple-400 rounded-full"
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

          {/* Solution selection tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-12"
          >
            {solutions.map((solution, idx) => (
              <motion.button
                key={solution.id}
                className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium transition-all flex items-center gap-2 ${
                  activeSolution === idx 
                    ? "bg-purple-600 text-black shadow-lg shadow-purple-600/30" 
                    : "bg-gray-800/80 text-purple-400 hover:bg-gray-700/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSolution(idx)}
              >
                <span>{solution.icon}</span>
                <span className="hidden sm:inline">{solution.shortName}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Active solution detailed card */}
          <motion.div
            key={solutions[activeSolution].id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`w-full max-w-5xl p-6 md:p-8 rounded-2xl bg-gradient-to-br ${solutions[activeSolution].color} border border-white/10`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-center">
              {/* Solution icon with floating animation */}
              <div className="lg:col-span-1 flex justify-center">
                <motion.div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-5xl md:text-6xl relative"
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: [
                      '0 0 0 rgba(147, 51, 234, 0.3)',
                      '0 0 20px rgba(147, 51, 234, 0.5)',
                      '0 0 0 rgba(147, 51, 234, 0.3)'
                    ]
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {solutions[activeSolution].icon}
                  
                  {/* Floating particles around icon */}
                  {[1, 2, 3].map((num) => (
                    <motion.div
                      key={num}
                      className="absolute w-3 h-3 rounded-full bg-purple-300/80"
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

              {/* Solution information */}
              <div className="lg:col-span-4 text-white">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {solutions[activeSolution].title}
                </motion.h3>

                <motion.p 
                  className="text-base md:text-lg text-purple-50/90 mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {solutions[activeSolution].description}
                </motion.p>

                {/* Solution features with staggered animation */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {solutions[activeSolution].features.map((feature, idx) => (
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
                  className="inline-block px-6 py-3 bg-white text-purple-700 font-bold rounded-lg shadow-lg shadow-purple-900/20"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  Get Started with {solutions[activeSolution].shortName}
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Development process steps */}
          <motion.div
            variants={itemVariants}
            className="mt-20 w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-12">Our Software Development Process</h3>
            
            {/* Mobile version - vertical layout */}
            <div className="flex md:hidden flex-col max-w-xs mx-auto">
              {['Discovery', 'Design', 'Development', 'Testing', 'Deployment'].map((step, idx) => (
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
                    className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(147, 51, 234, 0.7)',
                        '0 0 0 5px rgba(147, 51, 234, 0)',
                        '0 0 0 0 rgba(147, 51, 234, 0)'
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
              {['Discovery', 'Design', 'Development', 'Testing', 'Deployment'].map((step, idx) => (
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
                    className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 relative z-10"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(147, 51, 234, 0.7)',
                        '0 0 0 10px rgba(147, 51, 234, 0)',
                        '0 0 0 0 rgba(147, 51, 234, 0)'
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
                    <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-purple-900">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-purple-500"
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
          
          {/* Industry solutions section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 w-full"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Industry-Specific Solutions</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Retail', icon: '🛍️' },
                { name: 'Healthcare', icon: '🏥' },
                { name: 'Education', icon: '🎓' },
                { name: 'Manufacturing', icon: '🏭' },
                { name: 'Finance', icon: '💰' }
              ].map((industry, idx) => (
                <motion.div
                  key={industry.name}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center border border-purple-500/20 hover:border-purple-500/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2 + idx * 0.1 }
                  } : {}}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.2)"
                  }}
                >
                  <motion.div
                    className="text-4xl mb-2"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3
                    }}
                  >
                    {industry.icon}
                  </motion.div>
                  <h4 className="text-lg font-medium text-white text-center">{industry.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Bottom decoration */}
          <div className="mt-16 flex justify-center gap-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-500"
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
      

      
    </section>
  );
}