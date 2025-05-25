import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', url: 'https://instagram.com' },
    { name: 'Facebook', icon: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z', url: 'https://facebook.com' },
    { name: 'LinkedIn', icon: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z', url: 'https://linkedin.com' },
  ];

  const navigationLinks = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Services', url: '/services' },
    { name: 'Contact', url: '/contact' },
  ];

  // Using the same harmonized color theme as navbar
  const colors = {
    primary: '#ECDFCC',    // Light beige - primary background
    secondary: '#FCFAEE',  // Off-white - secondary background
    accent: '#DA8359',     // Terracotta - accent color
    accentDark: '#B5684A', // Darker terracotta for accents
    accentLight: '#E5A287', // Lighter terracotta for hover states
    neutral: '#9A8778',    // Neutral brown that complements the palette
    text: '#6B5A45'        // Brown text that works with the earth tones
  };

  return (
    <footer className="w-full bg-[#ECDFCC] text-[#6B5A45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section with Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-[#9A8778]/30">
          {/* Logo - matching navbar logo exactly */}
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold">
              <motion.span 
                className="text-[#DA8359]"
              >
                Blue
              </motion.span>
              <motion.span 
                className="text-[#B5684A]"
                animate={{ 
                  color: ["#B5684A", "#DA8359", "#E5A287", "#B5684A"],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Mine
              </motion.span>
              <motion.span className="text-[#6B5A45]">Tech</motion.span>
            </span>
          </motion.div>
          
          {/* Navigation Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {navigationLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="text-[#6B5A45] hover:text-[#DA8359] transition-colors relative group no-underline"
                whileHover={{ scale: 1.05, color: "#DA8359" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.2, duration: 0.3 }}
              >
                {link.name}
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DA8359] group-hover:w-full"
                  transition={{ duration: 0.3 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A8778] hover:text-[#DA8359] transition-colors"
                whileHover={{ scale: 1.2, color: "#DA8359" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4, duration: 0.3 }}
                aria-label={social.name}
              >
                <svg 
                  className="w-6 h-6 fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d={social.icon} />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        {/* Middle Section with Contact Info */}
        <motion.div 
          className="py-8 text-center border-b border-[#9A8778]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#DA8359] mb-2">Contact Us</h3>
              <p className="text-[#9A8778]">valli@blueminetech.com</p>
              <p className="text-[#9A8778]">+91 95975 30301</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#DA8359] mb-2">Connect With Us</h3>
              <p className="text-[#9A8778]">Follow us on social media for updates</p>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom Section with Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8">
          <motion.p 
            className="text-sm mb-4 md:mb-0 text-[#9A8778]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            © {new Date().getFullYear()} BlueMine Technologies. All rights reserved.
          </motion.p>
          
          <motion.div
            className="text-sm text-[#9A8778]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Made with ❤️ in India
          </motion.div>
        </div>
      </div>
      
      {/* Animated wave footer with harmonized colors */}
      <div className="relative h-16 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-[#B5684A] to-[#DA8359]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        >
          <svg 
            className="absolute bottom-0" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320"
          >
            <motion.path 
              fill="#9A8778" 
              fillOpacity="0.7" 
              d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,202.7C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,229.3C96,235,192,245,288,240C384,235,480,213,576,197.3C672,181,768,171,864,186.7C960,203,1056,245,1152,245.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
      </div>
    </footer>
  );
}