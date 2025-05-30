import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function CallToActionSection() {
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      
      // Reset form after submission
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1500);
  };

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

  // Generate floating particles (matching services banner)
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

  // Services offered
  const services = [
    { value: '', label: 'Select a Service' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'seo', label: 'Search Engine Optimization (SEO)' },
    { value: 'social-media', label: 'Social Media Management' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'software-development', label: 'Custom Software Development' },
    { value: 'crm-erp', label: 'CRM & ERP Solutions' },
    { value: 'automation', label: 'Business Process Automation' },
    { value: 'other', label: 'Other Services' }
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-[#FCFAEE] via-[#ECDFCC] to-[#E5A287]/20 overflow-hidden"
      style={{ 
        width: '100vw', 
        maxWidth: '100%',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Background particles (matching services banner) */}
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

      {/* Dynamic glow effect */}
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
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ECDFCC] to-[#FCFAEE] text-2xl mr-3 border-2 border-[#DA8359]/20 shadow-lg"
            >
              📞
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#6B5A45] via-[#9A8778] to-[#DA8359] bg-clip-text text-transparent">Get In Touch</h2>
          </motion.div>

          {/* Enhanced animated double underline (matching services banner) */}
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
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[#9A8778] text-center max-w-2xl mb-12 leading-relaxed"
          >
            Ready to take your business to the next level? Reach out to BlueMine Technologies today and discover how our 
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
              digital expertise
            </motion.span> 
            and innovative software solutions can drive your success.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl">
            {/* Left side: Contact Information */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Contact Info Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#FCFAEE]/95 via-[#ECDFCC]/80 to-[#E5A287]/10 backdrop-blur-md p-6 rounded-2xl border border-[#ECDFCC]/60 shadow-2xl shadow-[#DA8359]/10"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(218,131,89,0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6B5A45] to-[#DA8359] bg-clip-text text-transparent mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-[#ECDFCC] to-[#FCFAEE] rounded-lg p-2 mr-4 border border-[#DA8359]/20">
                      <motion.div
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        ✉️
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-[#DA8359] font-medium">Email Us</h4>
                      <a href="mailto:valli@blueminetech.com" className="text-[#6B5A45] hover:text-[#DA8359] transition-colors">valli@blueminetech.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-[#ECDFCC] to-[#FCFAEE] rounded-lg p-2 mr-4 border border-[#DA8359]/20">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        📱
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-[#DA8359] font-medium">Call Us</h4>
                      <a href="tel:+919597530301" className="text-[#6B5A45] hover:text-[#DA8359] transition-colors">+91 95975 30301</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-[#ECDFCC] to-[#FCFAEE] rounded-lg p-2 mr-4 border border-[#DA8359]/20">
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        📍
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-[#DA8359] font-medium">Visit Us</h4>
                      <p className="text-[#6B5A45]">Trichy, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Why Choose Us Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-[#E5A287]/20 via-[#ECDFCC]/60 to-[#FCFAEE]/80 backdrop-blur-md p-6 rounded-2xl border border-[#DA8359]/30 shadow-2xl shadow-[#DA8359]/10"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(218,131,89,0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6B5A45] to-[#DA8359] bg-clip-text text-transparent mb-4">Why Choose BlueMine Tech?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-3 h-3 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mr-3"
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
                        delay: 0
                      }}
                    />
                    <p className="text-[#6B5A45]">End-to-end digital solutions under one roof</p>
                  </div>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="w-3 h-3 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mr-3"
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
                        delay: 0.5
                      }}
                    />
                    <p className="text-[#6B5A45]">Tailored strategies for your specific industry</p>
                  </div>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="w-3 h-3 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mr-3"
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
                        delay: 1
                      }}
                    />
                    <p className="text-[#6B5A45]">Expert team with proven track record</p>
                  </div>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="w-3 h-3 bg-gradient-to-r from-[#DA8359] to-[#E5A287] rounded-full mr-3"
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
                        delay: 1.5
                      }}
                    />
                    <p className="text-[#6B5A45]">24/7 technical support & assistance</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.div 
                    className="flex items-center justify-center bg-gradient-to-br from-[#FCFAEE]/50 to-[#ECDFCC]/30 rounded-lg p-4 border border-[#DA8359]/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl mr-3">🚀</div>
                    <p className="text-[#6B5A45] text-sm md:text-base">Schedule a free 30-minute consultation to discuss your business needs!</p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Social Media */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center md:justify-start space-x-4"
              >
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-[#DA8359] to-[#B5684A] rounded-full flex items-center justify-center text-[#FCFAEE] shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-[#DA8359] to-[#B5684A] rounded-full flex items-center justify-center text-[#FCFAEE] shadow-lg"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-[#DA8359] to-[#B5684A] rounded-full flex items-center justify-center text-[#FCFAEE] shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-[#DA8359] to-[#B5684A] rounded-full flex items-center justify-center text-[#FCFAEE] shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>
            
            {/* Right side: Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-[#FCFAEE]/95 via-[#ECDFCC]/80 to-[#E5A287]/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-[#ECDFCC]/60 shadow-2xl shadow-[#DA8359]/10"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6B5A45] to-[#DA8359] bg-clip-text text-transparent mb-6">Request More Information</h3>
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-[#DA8359] mb-2">Thank You!</h4>
                  <p className="text-[#6B5A45]">Your message has been sent successfully. We'll get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[#6B5A45] font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#FCFAEE]/70 border border-[#ECDFCC] rounded-lg focus:ring-2 focus:ring-[#DA8359] focus:border-transparent transition-all duration-300 text-[#6B5A45] placeholder-[#9A8778]"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-[#6B5A45] font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#FCFAEE]/70 border border-[#ECDFCC] rounded-lg focus:ring-2 focus:ring-[#DA8359] focus:border-transparent transition-all duration-300 text-[#6B5A45] placeholder-[#9A8778]"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-[#6B5A45] font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCFAEE]/70 border border-[#ECDFCC] rounded-lg focus:ring-2 focus:ring-[#DA8359] focus:border-transparent transition-all duration-300 text-[#6B5A45] placeholder-[#9A8778]"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-[#6B5A45] font-medium mb-2">Service Interested In</label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#FCFAEE]/70 border border-[#ECDFCC] rounded-lg focus:ring-2 focus:ring-[#DA8359] focus:border-transparent transition-all duration-300 text-[#6B5A45]"
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[#6B5A45] font-medium mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-[#FCFAEE]/70 border border-[#ECDFCC] rounded-lg focus:ring-2 focus:ring-[#DA8359] focus:border-transparent transition-all duration-300 text-[#6B5A45] placeholder-[#9A8778] resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-gradient-to-r from-[#DA8359] to-[#B5684A] text-[#FCFAEE] font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: formLoading ? 1 : 1.02 }}
                    whileTap={{ scale: formLoading ? 1 : 0.98 }}
                  >
                    {formLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-[#FCFAEE] border-t-transparent rounded-full mr-2"
                        />
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-2"
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                  
                  <p className="text-sm text-[#9A8778] text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
          
          {/* Bottom CTA Banner */}
          <motion.div
            variants={itemVariants}
            className="mt-16 w-full max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-gradient-to-r from-[#DA8359] via-[#E5A287] to-[#DA8359] p-8 rounded-2xl text-center shadow-2xl border border-[#B5684A]/30"
              whileHover={{ scale: 1.02 }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                backgroundPosition: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-4xl md:text-5xl mb-4"
              >
                🎯
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#FCFAEE] mb-4">
                Ready to Transform Your Business?
              </h3>
              
              <p className="text-lg text-[#FCFAEE]/90 mb-6 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have revolutionized their digital presence with BlueMine Technologies. 
                Let's discuss how we can accelerate your growth!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="tel:+919597530301"
                  className="bg-[#FCFAEE] text-[#DA8359] font-bold py-3 px-8 rounded-lg hover:bg-[#ECDFCC] transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞 Call Now: +91 95975 30301
                </motion.a>
                
                <motion.a
                  href="mailto:valli@blueminetech.com"
                  className="bg-transparent border-2 border-[#FCFAEE] text-[#FCFAEE] font-bold py-3 px-8 rounded-lg hover:bg-[#FCFAEE] hover:text-[#DA8359] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✉️ Email Us
                </motion.a>
              </div>
              
              <div className="mt-6 flex items-center justify-center text-[#FCFAEE]/80">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="mr-2"
                >
                  ⚡
                </motion.div>
                <span className="text-sm">Free consultation • No commitment required • Quick response guaranteed</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}