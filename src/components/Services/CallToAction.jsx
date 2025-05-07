import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function CallToActionSection() {
  const [isInView, setIsInView] = useState(false);
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

  // Generate floating shapes for background
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

  const shapes = generateShapes(12);

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
              📞
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
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
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-300 text-center max-w-2xl mb-12"
          >
            Ready to take your business to the next level? Reach out to BlueMine Technologies today and discover how our digital marketing expertise and innovative software solutions can drive your success.
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
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-purple-700/30 rounded-lg p-2 mr-4">
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
                      <h4 className="text-purple-300 font-medium">Email Us</h4>
                      <a href="mailto:valli@blueminetech.com" className="text-white hover:text-purple-300 transition-colors">valli@blueminetech.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-700/30 rounded-lg p-2 mr-4">
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
                      <h4 className="text-purple-300 font-medium">Call Us</h4>
                      <a href="tel:+919597530301" className="text-white hover:text-purple-300 transition-colors">+91 95975 30301</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-700/30 rounded-lg p-2 mr-4">
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
                      <h4 className="text-purple-300 font-medium">Visit Us</h4>
                      <p className="text-white">Trichy, Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Why Choose Us Card */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Why Choose BlueMine Tech?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full mr-3"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0
                      }}
                    />
                    <p className="text-gray-200">End-to-end digital solutions under one roof</p>
                  </div>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full mr-3"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                    <p className="text-gray-200">Tailored strategies for your specific industry</p>
                  </div>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full mr-3"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1
                      }}
                    />
                    <p className="text-gray-200">Expert team with proven track record</p>
                  </div>
                  
                  <div className="flex items-center">
                    <motion.div 
                      className="w-2 h-2 bg-purple-400 rounded-full mr-3"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1.5
                      }}
                    />
                    <p className="text-gray-200">24/7 technical support & assistance</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.div 
                    className="flex items-center justify-center bg-white/10 rounded-lg p-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-3xl mr-3">🚀</div>
                    <p className="text-white text-sm md:text-base">Schedule a free 30-minute consultation to discuss your business needs!</p>
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
                  className="w-10 h-10 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center text-white"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center text-white"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center text-white"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                
               
                
                <motion.a 
                  href="#" 
                  className="w-10 h-10 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full flex items-center justify-center text-white"
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
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-purple-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Request More Information</h3>
              
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-6 text-center"
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      backgroundColor: [
                        'rgba(34, 197, 94, 0.2)',
                        'rgba(34, 197, 94, 0.4)',
                        'rgba(34, 197, 94, 0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-3xl">✓</span>
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                  <p className="text-gray-300">Your message has been sent successfully. Our team will get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name <span className="text-purple-400">*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address <span className="text-purple-400">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Interested In <span className="text-purple-400">*</span></label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      >
                        {services.map(service => (
                          <option key={service.value} value={service.value}>{service.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message <span className="text-purple400">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="w-4 h-4 text-purple-600 border-gray-500 rounded focus:ring-purple-500"
                      required
                    />
                    <label htmlFor="privacy" className="ml-2 text-sm text-gray-300">
                      I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a> and consent to being contacted.
                    </label>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-purple-600/20 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-purple-900/10">
          <path d="M0,0 C280,180 720,180 1440,0 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>
  );
}