import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AboutUsSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  // Track scroll position for scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  // Company values with icons
  const values = [
    { title: "Innovation", icon: "💡", description: "Bringing creative solutions to every challenge" },
    { title: "Excellence", icon: "🏆", description: "Maintaining high standards in all we do" },
    { title: "Integrity", icon: "🤝", description: "Building trust through honest practices" },
    { title: "Customer Focus", icon: "👥", description: "Your success is our priority" }
  ];

  // Team members data
  const teamMembers = [
    { id: 1, name: "Valli", position: "Founder & CEO", image: "/api/placeholder/120/120" },
    { id: 2, name: "Member 1", position: "Lead Developer", image: "/api/placeholder/120/120" },
    { id: 3, name: "Member 2", position: "Marketing Specialist", image: "/api/placeholder/120/120" },
    { id: 4, name: "Member 3", position: "UX Designer", image: "/api/placeholder/120/120" }
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
      id="about" 
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

      {/* About Us Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col justify-center py-8 md:py-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-4">About Us</h2>
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

          {/* Who We Are Section */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 mb-12"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Who We Are
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  BlueMine Technologies is a dynamic digital marketing and software solutions company based in India. We are committed to delivering impactful digital campaigns and robust technology tools that drive real business results across industries.
                </motion.p>
                <motion.div
                  className="flex items-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.div 
                    className="h-8 w-1 bg-blue-500 mr-4"
                    animate={{
                      height: [32, 40, 32],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <p className="text-blue-400 italic text-lg">Transforming ideas into digital success</p>
                </motion.div>
              </div>
              <motion.div 
                className="relative h-64 md:h-80 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 mix-blend-multiply z-10" />
                <motion.div
                  className="absolute inset-0 bg-gray-800 flex items-center justify-center text-7xl md:text-8xl opacity-30"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <span>BlueMine</span>
                </motion.div>
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Team at work" 
                  className="w-full h-full object-cover opacity-70"
                />
                <motion.div
                  className="absolute inset-0 border-2 border-blue-500/50 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Vision Card */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 h-full"
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-2xl mr-4"
                >
                  🔭
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-300">
                To be the go-to partner for businesses aiming for digital excellence through intelligent marketing strategies and tailor-made software solutions.
              </p>
              <motion.div
                className="w-full h-1 bg-gradient-to-r from-blue-500 to-transparent mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 h-full"
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-2xl mr-4"
                >
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-300">
                To empower brands with result-driven marketing and efficient technology that enhances growth and operational success.
              </p>
              <motion.div
                className="w-full h-1 bg-gradient-to-r from-blue-500 to-transparent mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>

          {/* Our Values */}
          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
              variants={childVariants}
            >
              Our Values
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 md:p-6 rounded-lg text-center h-full"
                  variants={childVariants}
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(30, 41, 59, 0.7)",
                    boxShadow: "0 4px 20px -2px rgba(59, 130, 246, 0.2)"
                  }}
                >
                  <motion.div
                    className="text-3xl md:text-4xl mb-3 md:mb-4 mx-auto"
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatDelay: 10
                    }}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className="text-blue-400 font-medium text-lg mb-2">{value.title}</h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
         {/* Team Section */}
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.h3 
    className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
    variants={childVariants}
  >
    Our Team
  </motion.h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {teamMembers.map((member, index) => (
      <motion.div
        key={member.id}
        className={`bg-gray-800/50 backdrop-blur-sm border ${member.id === 1 ? 'border-blue-400/70' : 'border-gray-700/50'} p-4 rounded-lg text-center ${member.id === 1 ? 'relative' : ''}`}
        variants={childVariants}
        whileHover={{ 
          y: -3,
          boxShadow: "0 4px 12px -2px rgba(59, 130, 246, 0.2)"
        }}
      >
        {member.id === 1 && (
          <motion.div 
            className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-md -z-10"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        )}
        <motion.div
          className={`w-24 h-24 rounded-full overflow-hidden ${member.id === 1 ? 'border-3 border-blue-400' : 'border-2 border-blue-500/50'} mx-auto mb-4 ${member.id === 1 ? 'shadow-lg shadow-blue-500/30' : ''}`}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <h4 className={`${member.id === 1 ? 'text-blue-300' : 'text-blue-400'} font-medium text-lg`}>{member.name}</h4>
        <p className="text-gray-400 text-sm">{member.position}</p>
        {member.id === 1 && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full">Founder</span>
          </div>
        )}
      </motion.div>
    ))}
  </div>
</motion.div>

          {/* Alliance Section */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 md:p-8 mt-12"
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Alliances</h3>
            <p className="text-gray-300">
              We believe in collaboration and innovation. Our network of industry experts supports us in delivering comprehensive digital and software solutions, ensuring you get everything your business needs to thrive under one roof.
            </p>
            <motion.div
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[1, 2, 3, 4].map((item) => (
                <motion.div 
                  key={item}
                  className="h-16 bg-gray-700/30 rounded-md flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-400">Partner {item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl text-white mb-6">Ready to transform your digital presence?</h3>
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-blue-200 hover:bg-blue-300 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all inline-block"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us Today
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      
    </section>
  );
}