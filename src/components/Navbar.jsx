import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'About Us', url: '/about' },
    { title: 'Services', url: '/services' },
    { title: 'Team', url: '/team' },
    { title: 'Contact', url: '/contact' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 w-full z-50 ${
          scrolled 
            ? 'bg-gray-900 shadow-lg' 
            : 'bg-gradient-to-r from-gray-900 to-blue-900/90 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#home" className="flex items-center">
                <motion.span 
                  className="text-white font-bold text-xl sm:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Blue<motion.span 
                    className="text-blue-400"
                    animate={{ 
                      color: ["#60a5fa", "#3b82f6", "#2563eb", "#60a5fa"],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >Mine</motion.span>
                  <motion.span className="text-white">Tech</motion.span>
                </motion.span>
              </a>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.title}
                    href={link.url}
                    className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
                    whileHover={{ scale: 1.1, color: "#60a5fa" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    {link.title}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full"
                      transition={{ duration: 0.3 }}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Contact Button - Desktop */}
            <motion.div
              className="hidden lg:flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="#contact"
                className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
            
            {/* Hamburger Button */}
            <motion.div 
              className="lg:hidden flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 relative">
                  <motion.span
                    className="absolute h-0.5 w-full bg-current transform transition-all rounded-lg"
                    animate={{
                      top: isOpen ? "9px" : "5px",
                      rotate: isOpen ? "45deg" : "0deg",
                    }}
                  />
                  <motion.span
                    className="absolute h-0.5 bg-current transform transition-all rounded-lg"
                    style={{ top: "9px" }}
                    animate={{
                      width: isOpen ? "100%" : "80%",
                      opacity: isOpen ? 0 : 1
                    }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-full bg-current transform transition-all rounded-lg"
                    animate={{
                      top: isOpen ? "9px" : "13px",
                      rotate: isOpen ? "-45deg" : "0deg",
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden bg-gray-900 overflow-hidden border-t border-gray-800"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.title}
                    href={link.url}
                    className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium border-l-4 border-transparent hover:border-blue-400 transition-all"
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 5, borderColor: "#60a5fa" }}
                  >
                    {link.title}
                  </motion.a>
                ))}
              </div>
              <motion.div 
                className="pt-4 pb-3 border-t border-gray-700 bg-gray-800/50"
                variants={itemVariants}
              >
                <div className="flex items-center px-5">
                  <div className="ml-3">
                    <div className="text-base font-medium text-blue-400">Contact Us</div>
                    <div className="text-sm font-medium text-gray-400">valli@blueminetech.com</div>
                    <div className="text-sm font-medium text-gray-400">+91 95975 30301</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* This div creates space for the fixed navbar so content doesn't hide behind it */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
}