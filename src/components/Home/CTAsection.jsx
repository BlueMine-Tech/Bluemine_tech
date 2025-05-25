import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CtaSection() {
  const [formState, setFormState] = useState({
    email: '',
    interest: '',
    submitted: false
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formState);
    // Show success message
    setFormState(prev => ({ ...prev, submitted: true }));
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState({
        email: '',
        interest: '',
        submitted: false
      });
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <section 
      className="relative py-16 overflow-hidden" 
      style={{ background: 'linear-gradient(to bottom, #FCFAEE, #ECDFCC)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute right-10 top-10 w-80 h-80 rounded-full blur-3xl" 
          style={{ backgroundColor: '#DA8359', opacity: 0.1 }}
        ></div>
        <div 
          className="absolute left-10 bottom-10 w-80 h-80 rounded-full blur-3xl" 
          style={{ backgroundColor: '#DA8359', opacity: 0.15 }}
        ></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="max-w-4xl mx-auto backdrop-blur-sm rounded-2xl p-8 shadow-xl border"
          style={{ 
            backgroundColor: 'rgba(236, 223, 204, 0.7)',
            borderColor: '#DA8359'
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Left Column - Text */}
            <motion.div className="flex-1" variants={itemVariants}>
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4" 
                style={{ color: '#8B4513' }}
              >
                Ready to <span style={{ color: '#DA8359' }}>Transform</span> Your Business?
              </h2>
              <div 
                className="h-1 w-20 mb-6" 
                style={{ backgroundColor: '#DA8359' }}
              ></div>
              <p 
                className="mb-6" 
                style={{ color: '#6B4423' }}
              >
                Let's start your digital journey together. Get expert advice on how our services can help your business grow.
              </p>
              
              {/* Benefits list */}
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized strategy consultation",
                  "Quick response within 24 hours",
                  "No obligation quote"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="mt-1">
                      <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        style={{ color: '#DA8359' }}
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span style={{ color: '#6B4423' }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Right Column - Quick Contact Form */}
            <motion.div className="flex-1" variants={itemVariants}>
              {formState.submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border rounded-lg p-6 text-center h-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'rgba(218, 131, 89, 0.1)',
                    borderColor: '#DA8359'
                  }}
                >
                  <div>
                    <div 
                      className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: 'rgba(218, 131, 89, 0.2)' }}
                    >
                      <svg 
                        className="w-8 h-8" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        style={{ color: '#DA8359' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 
                      className="text-xl font-bold mb-2" 
                      style={{ color: '#8B4513' }}
                    >
                      Thank You!
                    </h3>
                    <p style={{ color: '#6B4423' }}>
                      We've received your request and will get back to you soon.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div 
                  className="backdrop-blur-sm rounded-lg p-6 border"
                  style={{ 
                    backgroundColor: 'rgba(252, 250, 238, 0.8)',
                    borderColor: '#DA8359'
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-4" 
                    style={{ color: '#8B4513' }}
                  >
                    Get Started Now
                  </h3>
                  
                  <div className="mb-4">
                    <label 
                      htmlFor="email" 
                      className="block mb-2 text-sm" 
                      style={{ color: '#6B4423' }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: '#FCFAEE',
                        borderColor: '#ECDFCC',
                        color: '#8B4513'
                      }}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label 
                      htmlFor="interest" 
                      className="block mb-2 text-sm" 
                      style={{ color: '#6B4423' }}
                    >
                      I'm interested in:
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formState.interest}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: '#FCFAEE',
                        borderColor: '#ECDFCC',
                        color: '#8B4513'
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="social-media">Social Media Management</option>
                      <option value="web-development">Web Development</option>
                      <option value="analytics">Data Analytics</option>
                    </select>
                  </div>
                  
                  <motion.button
                    onClick={handleSubmit}
                    className="w-full py-3 px-6 font-bold rounded-lg transition-colors duration-300 shadow-lg"
                    style={{ 
                      backgroundColor: '#DA8359',
                      color: '#FCFAEE',
                      boxShadow: '0 10px 25px rgba(218, 131, 89, 0.2)'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: '#C27650'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Information
                  </motion.button>
                  
                  <p 
                    className="text-xs mt-3 text-center" 
                    style={{ color: '#8B7355' }}
                  >
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}