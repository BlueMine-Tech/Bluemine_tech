import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import sheik from '../assets/sheik.jpeg'; // Adjust the path as necessary

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

  // Color theme matching navbar
  const colors = {
    primary: '#ECDFCC',    // Light beige - primary background
    secondary: '#FCFAEE',  // Off-white - secondary background
    accent: '#DA8359',     // Terracotta - accent color
    accentDark: '#B5684A', // Darker terracotta for accents
    accentLight: '#E5A287', // Lighter terracotta for hover states
    neutral: '#9A8778',    // Neutral brown that complements the palette
    text: '#6B5A45'        // Brown text that works with the earth tones
  };
  
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
      size: Math.random() * 12 + 4,
      x: Math.random() * 100, // percentage of screen width
      y: Math.random() * 100, // percentage of screen height
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 18 + 25,
    }));
  };

  const particles = generateParticles(12);

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
      className="relative min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 w-full"
      style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`,
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
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            background: `radial-gradient(circle, ${colors.accent}40, ${colors.accentLight}20)`,
          }}
          animate={{
            y: [0, -400],
            opacity: [particle.opacity, 0],
            scale: [0.8, 1.2, 0.8],
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
          background: `radial-gradient(ellipse at center, ${colors.accent}15 0%, transparent 70%)`
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
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
            background: `radial-gradient(circle, ${colors.accent}20, transparent 70%)`,
            filter: 'blur(60px)'
          }}
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
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: colors.accent }}
            >
              Contact Us
            </h2>
            <div className="relative flex justify-center mt-4">
              <motion.div
                className="h-1 rounded-full mx-auto"
                style={{ backgroundColor: colors.accent }}
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
              <motion.div
                className="absolute h-1 rounded-full mx-auto"
                style={{ backgroundColor: colors.accentLight }}
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
              <div 
                className="backdrop-blur-sm border rounded-xl p-6 md:p-8 mb-6 shadow-lg"
                style={{ 
                  backgroundColor: `${colors.secondary}90`,
                  borderColor: `${colors.accent}30`
                }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-6 flex items-center"
                  style={{ color: colors.text }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <motion.div 
                    className="h-6 w-1 mr-3"
                    style={{ backgroundColor: colors.accent }}
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
                
                <p className="mb-6" style={{ color: colors.neutral }}>
                  Have questions or want to discuss your project? Reach out to us using any of the methods below or fill out the form.
                </p>
                
                {/* Contact Information Cards */}
              <div className="space-y-4">
  {contactInfo.map((item, index) => (
    <motion.div 
      key={item.title}
      className="flex items-start p-3 rounded-lg transition-all"
      style={{
        ':hover': {
          backgroundColor: `${colors.accent}10`
        }
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
      whileHover={{ 
        x: 5,
        backgroundColor: `${colors.accent}10`
      }}
    >
      <span className="text-2xl mr-4 mt-1">{item.icon}</span>
      <div>
        <h4 className="font-medium" style={{ color: colors.accent }}>
          {item.title}
        </h4>
        <p style={{ color: colors.text }}>
          {item.info}
        </p>
      </div>
    </motion.div>
  ))}
</div>

{/* Person Image with Designation */}
<motion.div 
  className="mt-6 text-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
>
  <div className="relative inline-block">
    <motion.div
      className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 shadow-lg"
      style={{ borderColor: colors.accent }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={sheik} // Replace with your image path
        alt="Contact Person"
        className="w-full h-full object-cover"
      />
    </motion.div>
    {/* Online status indicator */}
    <motion.div
      className="absolute bottom-3 right-0 w-6 h-6 rounded-full border-2"
      style={{ 
        backgroundColor: '#10B981', // Green for online
        borderColor: colors.secondary 
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </div>
  <h4 className="font-semibold text-lg" style={{ color: colors.accent }}>
    SHIEK MOHAMMAD KASIM
  </h4>
  <p className="text-sm" style={{ color: colors.neutral }}>
    Business Development Manager
  </p>
  <p className="text-xs mt-1" style={{ color: colors.neutral }}>
    Available to help you
  </p>
</motion.div>
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
              <div 
                className="backdrop-blur-sm border rounded-xl p-6 md:p-8 shadow-lg"
                style={{ 
                  backgroundColor: `${colors.secondary}90`,
                  borderColor: `${colors.accent}30`
                }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-6"
                  style={{ color: colors.text }}
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
                      <label 
                        htmlFor="name" 
                        className="block font-medium"
                        style={{ color: colors.accent }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none transition-all"
                        style={{
                          backgroundColor: `${colors.primary}50`,
                          borderColor: colors.neutral,
                          color: colors.text,
                          ':focus': {
                            borderColor: colors.accent,
                            boxShadow: `0 0 0 1px ${colors.accent}`
                          }
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.accent;
                          e.target.style.boxShadow = `0 0 0 1px ${colors.accent}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.neutral;
                          e.target.style.boxShadow = 'none';
                        }}
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <label 
                        htmlFor="email" 
                        className="block font-medium"
                        style={{ color: colors.accent }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none transition-all"
                        style={{
                          backgroundColor: `${colors.primary}50`,
                          borderColor: colors.neutral,
                          color: colors.text
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.accent;
                          e.target.style.boxShadow = `0 0 0 1px ${colors.accent}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.neutral;
                          e.target.style.boxShadow = 'none';
                        }}
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
                      <label 
                        htmlFor="phone" 
                        className="block font-medium"
                        style={{ color: colors.accent }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none transition-all"
                        style={{
                          backgroundColor: `${colors.primary}50`,
                          borderColor: colors.neutral,
                          color: colors.text
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.accent;
                          e.target.style.boxShadow = `0 0 0 1px ${colors.accent}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.neutral;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <label 
                        htmlFor="subject" 
                        className="block font-medium"
                        style={{ color: colors.accent }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none transition-all"
                        style={{
                          backgroundColor: `${colors.primary}50`,
                          borderColor: colors.neutral,
                          color: colors.text
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = colors.accent;
                          e.target.style.boxShadow = `0 0 0 1px ${colors.accent}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = colors.neutral;
                          e.target.style.boxShadow = 'none';
                        }}
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
                    <label 
                      htmlFor="message" 
                      className="block font-medium"
                      style={{ color: colors.accent }}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full border rounded-lg p-3 outline-none transition-all resize-none"
                      style={{
                        backgroundColor: `${colors.primary}50`,
                        borderColor: colors.neutral,
                        color: colors.text
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.accent;
                        e.target.style.boxShadow = `0 0 0 1px ${colors.accent}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = colors.neutral;
                        e.target.style.boxShadow = 'none';
                      }}
                      required
                    ></textarea>
                  </motion.div>
                  
                  {/* Form Status Messages */}
                  {formStatus.submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg border ${
                        formStatus.error 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}
                      style={{
                        color: formStatus.error ? '#dc2626' : '#16a34a',
                        backgroundColor: formStatus.error ? '#fef2f2' : '#f0fdf4'
                      }}
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
                      className="px-6 py-3 font-medium rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.secondary,
                        boxShadow: `0 4px 14px -4px ${colors.accent}40`
                      }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: colors.accentDark,
                        boxShadow: `0 8px 20px -4px ${colors.accent}60`
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
          
          {/* Business Hours */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h3 className="text-xl mb-2" style={{ color: colors.text }}>
              Business Hours
            </h3>
            <p style={{ color: colors.neutral }}>
              Monday - Friday: 9:00 AM - 6:00 PM IST
            </p>
            <p style={{ color: colors.neutral }}>
              Saturday & Sunday: Closed
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}