import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ContactSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
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

  // Generate particles with varied sizes
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 10 + 3,
      x: Math.random() * 100, // percentage of screen width
      y: Math.random() * 100, // percentage of screen height
      opacity: Math.random() * 0.3,
      duration: Math.random() * 15 + 20,
    }));
  };

  const particles = generateParticles(10);

  // Contact information
  const contactInfo = [
    { icon: "📍", title: "Address", info: "Trichy" },
    { icon: "📞", title: "Phone", info: "+91 9597530301" },
    { icon: "✉️", title: "Email", info: "valli@blueminetech.com" }
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission - WordPress integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Initialize loading state
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Sending your message...'
      });
      
      // WordPress REST API endpoint for Contact Form 7
      // You'll need to replace with your actual endpoint URL and form ID
      const endpoint = 'https://yourwordpresssite.com/wp-json/contact-form-7/v1/contact-forms/123/feedback';
      
      // Create form data for submission
      const submitData = new FormData();
      submitData.append('your-name', formData.name);
      submitData.append('your-email', formData.email);
      submitData.append('your-phone', formData.phone);
      submitData.append('your-subject', formData.subject);
      submitData.append('your-message', formData.message);
      
      // Send data to WordPress
      const response = await fetch(endpoint, {
        method: 'POST',
        body: submitData
      });
      
      const result = await response.json();
      
      if (result.status === 'mail_sent') {
        // Success case
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you! Your message has been sent successfully.'
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Reset form status after delay
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            error: false,
            message: ''
          });
        }, 5000);
      } else {
        // Error case
        setFormStatus({
          submitted: true,
          error: true,
          message: 'There was an error sending your message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        submitted: true,
        error: true,
        message: 'There was an error connecting to the server. Please try again later.'
      });
    }
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

  const childVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 w-full"
      style={{ 
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
          className="absolute rounded-full bg-blue-500/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity / 2,
          }}
          animate={{
            y: [0, -300],
            opacity: [particle.opacity / 2, 0],
          }}
          transition={{
            duration: particle.duration * 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"
        animate={{
          opacity: [0.4, 0.3, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Radial glow following mouse (disabled on mobile) */}
      {!isMobile && (
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* Contact Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col justify-center py-8 md:py-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-4">Contact Us</h2>
            <div className="relative flex justify-center mt-4">
              <motion.div
                className="h-1 bg-blue-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
              <motion.div
                className="absolute h-1 bg-blue-300 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "40px" }}
                transition={{ 
                  delay: 0.8, 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
            </div>
          </motion.div>

          {/* Contact Content Grid */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info Column */}
            <motion.div 
              className="md:col-span-2"
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Contact Info Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 mb-6">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-6 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <motion.div 
                    className="h-6 w-1 bg-blue-500 mr-3"
                    animate={{
                      height: [24, 28, 24],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  Get In Touch
                </motion.h3>
                
                <p className="text-gray-300 mb-6">
                  Have questions or want to discuss your project? Reach out to us using any of the methods below or fill out the form.
                </p>
                
                {/* Contact Information Cards */}
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-700/30 transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-2xl mr-4 mt-1">{item.icon}</span>
                      <div>
                        <h4 className="text-blue-400 font-medium">{item.title}</h4>
                        <p className="text-gray-300">{item.info}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
             
            </motion.div>
            
            {/* Contact Form Column */}
            <motion.div 
              className="md:col-span-3"
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8">
                <motion.h3 
                  className="text-2xl font-bold text-white mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Send Us a Message
                </motion.h3>
                
                {/* WordPress Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <label htmlFor="name" className="text-blue-300 block">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <label htmlFor="email" className="text-blue-300 block">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <label htmlFor="phone" className="text-blue-300 block">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <label htmlFor="subject" className="text-blue-300 block">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                        required
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <label htmlFor="message" className="text-blue-300 block">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all resize-none"
                      required
                    ></textarea>
                  </motion.div>
                  
                  {/* Form Status Messages */}
                  {formStatus.submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg ${formStatus.error ? 'bg-red-900/30 text-red-300 border border-red-700/50' : 'bg-green-900/30 text-green-300 border border-green-700/50'}`}
                    >
                      {formStatus.message}
                    </motion.div>
                  )}
                  
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.button
                      type="submit"
                      className="px-6 py-3 bg-blue-200 hover:bg-blue-300 text-black font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 8px 20px -4px rgba(59, 130, 246, 0.5)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formStatus.submitted && !formStatus.error}
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
          
          
          
          {/* Business Hours (Optional) */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h3 className="text-xl text-white mb-2">Business Hours</h3>
            <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
            <p className="text-gray-300">Saturday & Sunday: Closed</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}