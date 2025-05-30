import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function ClientWorkflowSection() {
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
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

  // Auto-rotate steps (only on desktop)
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      if (isInView) {
        setActiveStep(prev => (prev + 1) % workflowSteps.length);
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isInView, isMobile]);

  // Client workflow steps data with updated colors
  const workflowSteps = [
    {
      id: 'discovery',
      icon: '🔍',
      title: 'Discovery & Planning',
      description: 'We start by understanding your business goals, challenges, and requirements through in-depth consultation and research.',
      features: [
        'Business needs assessment',
        'Requirement gathering',
        'Technology stack evaluation',
        'Project timeline planning'
      ],
      color: 'from-[#DA8359] to-[#B5684A]'
    },
    {
      id: 'design',
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Our design team creates intuitive and engaging user interfaces that align with your brand and deliver exceptional user experiences.',
      features: [
        'User research & personas',
        'Wireframing & prototyping',
        'Visual design',
        'Usability testing'
      ],
      color: 'from-[#E5A287] to-[#DA8359]'
    },
    {
      id: 'development',
      icon: '👨‍💻',
      title: 'Development & Integration',
      description: 'Our expert developers build your solution using the latest technologies and best practices while ensuring seamless integration.',
      features: [
        'Agile development methodology',
        'Regular sprint reviews',
        'Quality code standards',
        'System integration'
      ],
      color: 'from-[#B5684A] to-[#9A8778]'
    },
    {
      id: 'testing',
      icon: '🧪',
      title: 'Quality Assurance',
      description: 'Rigorous testing ensures your software is robust, secure, and performs optimally across all intended environments.',
      features: [
        'Functional testing',
        'Performance optimization',
        'Security assessment',
        'Cross-platform compatibility'
      ],
      color: 'from-[#9A8778] to-[#B5684A]'
    },
    {
      id: 'deployment',
      icon: '🚀',
      title: 'Deployment & Training',
      description: 'We handle the deployment process and provide comprehensive training to ensure your team can effectively use the new solution.',
      features: [
        'Smooth deployment strategy',
        'User training sessions',
        'Documentation handover',
        'Knowledge transfer'
      ],
      color: 'from-[#DA8359] to-[#E5A287]'
    },
    {
      id: 'support',
      icon: '🛠️',
      title: 'Ongoing Support',
      description: 'Our relationship continues with dedicated support, maintenance, and regular updates to keep your software running flawlessly.',
      features: [
        'Technical support',
        'Performance monitoring',
        'Regular updates',
        'Continuous improvement'
      ],
      color: 'from-[#E5A287] to-[#DA8359]'
    }
  ];

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
    hidden: { opacity: 0, scale: 0.95 },
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

  const shapes = generateShapes(10);

  return (
    <section 
      id="client-workflow" 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-[#FCFAEE] via-[#ECDFCC] to-[#E5A287]/20 overflow-hidden"
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
          className={`absolute ${shape.shape === 'circle' ? 'rounded-full' : 'rounded-md'} bg-[#DA8359]/10`}
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
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#DA8359]/20 text-2xl mr-3"
            >
              🤝
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6B5A45] via-[#9A8778] to-[#DA8359] bg-clip-text text-transparent">Our Client Workflow</h2>
          </motion.div>

          {/* Enhanced animated double underline */}
          <motion.div 
            variants={itemVariants}
            className="relative h-1.5 w-32 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mx-auto mb-1 shadow-sm"
          >
            <motion.div
              className="absolute h-1.5 w-16 bg-gradient-to-r from-[#E5A287] to-[#DA8359] rounded-full"
              animate={{
                x: [0, 16, 0],
                width: [16, 24, 16]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-[#B5684A] to-[#DA8359] rounded-full mx-auto mb-8 shadow-sm"
          />
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-[#9A8778] text-center max-w-2xl mb-12"
          >
            Our step-by-step approach ensures transparent communication and successful project delivery
          </motion.p>

          {/* Desktop workflow timeline */}
          <div className="hidden lg:block w-full max-w-6xl mb-16">
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#ECDFCC] transform -translate-y-1/2">
                <motion.div 
                  className="absolute h-full bg-gradient-to-r from-[#DA8359] to-[#E5A287]"
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              
              {/* Timeline steps */}
              <div className="flex justify-between">
                {workflowSteps.map((step, idx) => (
                  <motion.div
                    key={step.id}
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? 
                      { opacity: 1, y: 0, transition: { delay: 0.2 + idx * 0.1 } } : 
                      { opacity: 0, y: 20 }
                    }
                  >
                    {/* Step bubble */}
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl relative z-10 mb-3 cursor-pointer border-2 ${idx === activeStep ? 'border-[#6B5A45]' : 'border-transparent'}`}
                      whileHover={{ scale: 1.1 }}
                      animate={idx === activeStep ? 
                        { scale: [1, 1.1, 1], boxShadow: '0 0 20px rgba(218, 131, 89, 0.5)' } : 
                        { scale: 1, boxShadow: '0 0 0px rgba(218, 131, 89, 0)' }
                      }
                      transition={{ duration: 0.5 }}
                      onClick={() => setActiveStep(idx)}
                    >
                      {step.icon}
                      
                      {/* Progress indicator */}
                      {idx < activeStep && (
                        <motion.div 
                          className="absolute inset-0 bg-[#FCFAEE] rounded-full flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-[#DA8359] text-2xl">✓</span>
                        </motion.div>
                      )}
                    </motion.div>
                    
                    {/* Step label */}
                    <motion.div 
                      className={`text-sm font-medium text-center ${idx === activeStep ? 'text-[#6B5A45]' : 'text-[#9A8778]'}`}
                      animate={idx === activeStep ? 
                        { scale: 1.05, color: '#6B5A45' } : 
                        { scale: 1, color: '#9A8778' }
                      }
                    >
                      {idx + 1}. {step.title.split(' ')[0]}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Active step detail */}
            <motion.div
              key={activeStep}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`mt-12 p-6 rounded-2xl bg-gradient-to-br ${workflowSteps[activeStep].color} border border-[#ECDFCC]/20`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-2xl bg-[#FCFAEE]/20 backdrop-blur-sm flex items-center justify-center text-5xl relative"
                    animate={{
                      y: [0, -10, 0],
                      boxShadow: [
                        '0 0 0 rgba(218, 131, 89, 0.3)',
                        '0 0 20px rgba(218, 131, 89, 0.5)',
                        '0 0 0 rgba(218, 131, 89, 0.3)'
                      ]
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    {workflowSteps[activeStep].icon}
                  </motion.div>
                </div>
                
                <div className="md:col-span-3 text-[#FCFAEE]">
                  <h3 className="text-2xl font-bold mb-2">{workflowSteps[activeStep].title}</h3>
                  <p className="text-lg text-[#FCFAEE]/90 mb-4">{workflowSteps[activeStep].description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {workflowSteps[activeStep].features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        className="flex items-center"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-[#FCFAEE] rounded-full mr-2"
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
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Mobile workflow - vertical timeline */}
          <div className="lg:hidden w-full max-w-md">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? 
                  { opacity: 1, x: 0, transition: { delay: 0.2 + idx * 0.1 } } : 
                  { opacity: 0, x: -20 }
                }
              >
                <div className="flex mb-6">
                  {/* Left side: step indicator */}
                  <div className="mr-4 relative">
                    {/* Vertical line */}
                    {idx < workflowSteps.length - 1 && (
                      <div className="absolute top-16 bottom-0 left-1/2 w-1 bg-[#ECDFCC] transform -translate-x-1/2">
                        <motion.div 
                          className="absolute top-0 w-full bg-gradient-to-b from-[#DA8359] to-[#E5A287]"
                          initial={{ height: '0%' }}
                          animate={isInView ? { height: '100%' } : { height: '0%' }}
                          transition={{ duration: 0.5, delay: 0.3 + idx * 0.2 }}
                        />
                      </div>
                    )}
                    
                    {/* Step bubble */}
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xl relative z-10`}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          '0 0 0px rgba(218, 131, 89, 0.3)',
                          '0 0 15px rgba(218, 131, 89, 0.5)',
                          '0 0 0px rgba(218, 131, 89, 0.3)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  
                  {/* Right side: step info */}
                  <div className="flex-1 p-4 bg-[#FCFAEE]/80 backdrop-blur-sm rounded-lg border border-[#ECDFCC]/30">
                    <h3 className="text-xl font-bold text-[#6B5A45] mb-2">{step.title}</h3>
                    <p className="text-sm text-[#9A8778] mb-3">{step.description}</p>
                    
                    <div className="grid grid-cols-1 gap-1">
                      {step.features.slice(0, 2).map((feature, i) => (
                        <motion.div
                          key={feature}
                          className="flex items-center text-sm text-[#6B5A45]"
                          initial={{ opacity: 0, x: 5 }}
                          animate={isInView ? 
                            { opacity: 1, x: 0, transition: { delay: 0.4 + idx * 0.1 + i * 0.05 } } : 
                            { opacity: 0, x: 5 }
                          }
                        >
                          <div className="w-1.5 h-1.5 bg-[#DA8359] rounded-full mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to action */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center"
          >
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6B5A45] to-[#DA8359] bg-clip-text text-transparent text-center mb-6">Ready to Start Your Project?</h3>
            
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-[#DA8359] to-[#B5684A] text-[#FCFAEE] font-bold rounded-lg shadow-lg shadow-[#DA8359]/20"
              style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.6)" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(218, 131, 89, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Consultation
            </motion.a>
          </motion.div>
          
          {/* Bottom decoration */}
          <div className="mt-12 flex justify-center gap-6">
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
    </section>
  );
}