import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from "lucide-react";
import shanmu from '../assets/shanmugapriya.png'
import director from '../assets/director.jpg'
import jagadesh from '../assets/jagadish.jpg'
import jafar from '../assets/jafar.jpeg'
import asiq from '../assets/asiq.png'
import praveen from '../assets/praveen.png'
import founder from '../assets/founder.png'
import divya from '../assets/divya.jpeg'
import profile from "../assets/profile.jpg"



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
      size: Math.random() * 8 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 20 + 25,
    }));
  };

  const particles = generateParticles(12);

  // Company values with icons
  const values = [
    { title: "Innovation", icon: "💡", description: "Bringing creative solutions to every challenge" },
    { title: "Excellence", icon: "🏆", description: "Maintaining high standards in all we do" },
    { title: "Integrity", icon: "🤝", description: "Building trust through honest practices" },
    { title: "Customer Focus", icon: "👥", description: "Your success is our priority" }
  ];

  // Team members data
  const teamMembers = [
    // First row (with descriptions)
    { 
      id: 1, 
      name: "Vallimyle Sevanoo", 
      position: "Founder & CEO", 
      image: founder,
      description: "As the visionary Founder and CEO, Valli leads the company with innovative strategies and forward-thinking perspectives. With extensive industry experience, they drive the company's mission and ensure alignment across all departments to achieve ambitious goals.",
      hasDescription: true
    },
    { 
      id: 2, 
      name: "Mr. Sampath Kumar", 
      position: "Director of Business Development", 
      image: director,
      description: "Our director leads the charge in finding new business opportunities, building partnerships, and growing the company's client base. They focus on strategy, networking, and sealing deals that push the company forward.",
      hasDescription: true
    },
    { 
      id: 3, 
      name: "JAGADISH B RAO", 
      position: "Regional Representative & Executive President", 
      image: jagadesh,
      description: "A dynamic result-oriented entrepreneur and consultant with a diverse background and cross-industry expertise spanning Events, FMCG, Tourism, Paint, Green Logistics, and Media Networks. Armed with a solid academic foundation, Jagadish has consistently delivered impactful business development and innovative cross-sector consulting. Jagadish is known for driving strategic growth and innovative solutions. With extensive global travel experience, Jagadish brings a rich understanding of diverse cultures, enhancing his ability to navigate complex markets and build meaningful international relationships. In the film industry, Jagadish is highly experienced in location scouting, budgeting, and on-ground coordination, with a strong track record of efficiently managing bureaucratic processes to facilitate smooth film shooting and production. Jagadish also brings valuable experience in handling regional industrial and Tourism associations and is well-versed in travel planning and logistical coordination at both domestic and international levels. As our regional representative, he serves as a key liaison for expanding our presence across diverse markets.",
      hasDescription: true
    },
    { 
      id: 4, 
      name: "S.Jaffer sadiq", 
      position: "Regional Project Director", 
      image: jafar,
      description: `Regional Project Director –S. Jaffer Sadiq brings a wealth of marketing and strategic leadership expertise, with extensive international experience spanning Asia Pacific, Europe, and the Middle East.
He has business expansion initiatives in key regions, including:
Vietnam & Saudi Arabia – spearheading strategic growth and regional expansion.
UAE – overseeing operations across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and Umm Al Quwain. Global Experience Includes: Southeast Asia: Singapore, Malaysia – Kuala Lumpur, Langkawi, Malacca, Sabah, Thailand – Bangkok, Pattaya, Phuket, Vietnam – Hanoi, Halong Bay, Ho Chi Minh City, Indonesia – Bali, Jakarta, Yogyakarta, nearby islands, Brunei
South Asia: Sri Lanka – Colombo, Kandy, Nuwara Eliya, Negombo, Jaffna, Trincomalee Nepal – Kathmandu, Pokhara, Chitwan
Middle East:
Saudi Arabia – Mecca, Medina, Jeddah, Kuwait, Jordan
East Asia: China – Beijing, Guangzhou, Shanghai
Central Asia: Kazakhstan – Almaty
Australia: Melbourne, Sydney, Adelaide, Perth, Gold Coast
Europe (Schengen Region): Greece
Other Regions: Israel, Egypt (Cairo)
His deep understanding of cross-cultural markets and software-driven business growth makes him a key asset to Bluemine Technologies' global outreach`,
      hasDescription: true
    },
    // Second row (without descriptions)
    { 
      id: 5, 
      name: "Mohamed Asiq" ,
      position: "Project Manager", 
      image: asiq,
      hasDescription: false
    },
    { 
      id: 6, 
      name: "Shanmuga priya", 
      position:"Developer Lead", 
      image: shanmu,
      hasDescription: false
    },
    { 
      id: 7, 
      name: "Praveen Kumar", 
      position: "SEO Strategist", 
      image: praveen,
      hasDescription: false
    },
    { 
      id: 8, 
      name: "Ashwin", 
      position: "Visual Art Lead", 
      image: profile,
      hasDescription: false
    },
    { 
      id: 9, 
      name: "Abi kumar", 
      position: "SMO Strategist Lead", 
      image: profile,
      hasDescription: false
    },
    { 
      id: 10, 
      name: "DivyaBharathi", 
      position: "Dubbing Coordinator", 
      image: divya,
      hasDescription: false
    }
  ];
  
  const [expandedMemberId, setExpandedMemberId] = useState(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const descriptionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const toggleDescription = (id) => {
    if (expandedMemberId === id) {
      setExpandedMemberId(null);
    } else {
      setExpandedMemberId(id);
    }
  };

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Split members into first and second row
  const firstRowMembers = teamMembers.slice(0, 4);
  const secondRowMembers = teamMembers.slice(4);

  return (
    <section 
      id="about" 
      className="relative min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 w-full"
      style={{ 
        background: 'linear-gradient(135deg, #FCFAEE 0%, #ECDFCC 50%, #FCFAEE 100%)',
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
            background: 'linear-gradient(45deg, #DA8359, #ECDFCC)',
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity * 0.3,
          }}
          animate={{
            y: [0, -400],
            opacity: [particle.opacity * 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(218, 131, 89, 0.1) 0%, transparent 70%)'
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
          className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(218, 131, 89, 0.15) 0%, transparent 70%)'
          }}
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">About Us</h2>
            <div className="relative flex justify-center mt-4">
              <motion.div
                className="h-1 rounded-full mx-auto"
                style={{ backgroundColor: '#DA8359' }}
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
              <motion.div
                className="absolute h-1 rounded-full mx-auto"
                style={{ backgroundColor: '#ECDFCC' }}
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
            className="backdrop-blur-sm border rounded-xl p-6 md:p-8 mb-12 shadow-lg"
            style={{
              backgroundColor: 'rgba(252, 250, 238, 0.8)',
              borderColor: 'rgba(218, 131, 89, 0.2)'
            }}
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Who We Are
                </motion.h3>
                <motion.p 
                  className="text-gray-700 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  BlueMine Technologies is a dynamic software solutions and digital marketing company based in India. We are committed to delivering impactful digital campaigns and robust technology tools that drive real business results across industries.
                </motion.p>
                <motion.div
                  className="flex items-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.div 
                    className="h-8 w-1 mr-4"
                    style={{ backgroundColor: '#DA8359' }}
                    animate={{
                      height: [32, 40, 32],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <p className="text-gray-600 italic text-lg font-medium">Transforming ideas into digital success</p>
                </motion.div>
              </div>
              <motion.div 
                className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="absolute inset-0 mix-blend-multiply z-10"
                  style={{ backgroundColor: 'rgba(218, 131, 89, 0.1)' }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl font-bold text-gray-200"
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
                  src=""
                  alt="Team at work" 
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 border-2 z-20"
                  style={{ borderColor: 'rgba(218, 131, 89, 0.3)' }}
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
              className="backdrop-blur-sm border rounded-xl p-6 md:p-8 h-full shadow-lg"
              style={{
                backgroundColor: 'rgba(236, 223, 204, 0.6)',
                borderColor: 'rgba(218, 131, 89, 0.2)'
              }}
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 35px -5px rgba(218, 131, 89, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4"
                  style={{ backgroundColor: 'rgba(218, 131, 89, 0.2)' }}
                >
                  🔭
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                To be the go-to partner for businesses aiming for digital excellence through intelligent marketing strategies and tailor-made software solutions.
              </p>
              <motion.div
                className="w-full h-1 mt-6 rounded-full"
                style={{ background: 'linear-gradient(90deg, #DA8359, transparent)' }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              className="backdrop-blur-sm border rounded-xl p-6 md:p-8 h-full shadow-lg"
              style={{
                backgroundColor: 'rgba(236, 223, 204, 0.6)',
                borderColor: 'rgba(218, 131, 89, 0.2)'
              }}
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 35px -5px rgba(218, 131, 89, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4"
                  style={{ backgroundColor: 'rgba(218, 131, 89, 0.2)' }}
                >
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To empower brands with result-driven marketing and efficient technology that enhances growth and operational success.
              </p>
              <motion.div
                className="w-full h-1 mt-6 rounded-full"
                style={{ background: 'linear-gradient(90deg, #DA8359, transparent)' }}
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
              className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8"
              variants={childVariants}
            >
              Our Values
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="backdrop-blur-sm border p-4 md:p-6 rounded-lg text-center h-full shadow-lg"
                  style={{
                    backgroundColor: 'rgba(252, 250, 238, 0.8)',
                    borderColor: 'rgba(218, 131, 89, 0.2)'
                  }}
                  variants={childVariants}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: "rgba(236, 223, 204, 0.8)",
                    boxShadow: "0 10px 25px -5px rgba(218, 131, 89, 0.2)"
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
                  <h4 className="font-medium text-lg mb-2" style={{ color: '#DA8359' }}>{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative py-12">
            <div className="container mx-auto px-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8"
                  variants={childVariants}
                >
                  Our Team
                </motion.h3>
                
                {/* First row - 4 cards with descriptions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {firstRowMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      className="backdrop-blur-sm border p-4 rounded-lg text-center shadow-lg"
                      style={{
                        backgroundColor: 'rgba(252, 250, 238, 0.8)',
                        borderColor: 'rgba(218, 131, 89, 0.2)'
                      }}
                      variants={childVariants}
                      whileHover={{
                        y: -3,
                        boxShadow: "0 8px 20px -4px rgba(218, 131, 89, 0.2)"
                      }}
                    >
                      <motion.div
                        className="w-24 h-24 rounded-full overflow-hidden border-2 mx-auto mb-4"
                        style={{ borderColor: 'rgba(218, 131, 89, 0.4)' }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <h4 className="font-medium text-lg" style={{ color: '#DA8359' }}>
                        {member.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{member.position}</p>
                      
                      {/* Description section */}
                      <motion.div
                        className="overflow-hidden"
                        initial="hidden"
                        animate={expandedMemberId === member.id ? "visible" : "hidden"}
                        variants={descriptionVariants}
                      >
                        <div className="mt-4 pt-3 border-t" style={{ borderColor: 'rgba(218, 131, 89, 0.2)' }}>
                          <p className="text-gray-700 text-sm text-left">
                            {member.description}
                          </p>
                        </div>
                      </motion.div>
                      
                      <div className="mt-3">
                        <button 
                          onClick={() => toggleDescription(member.id)}
                          className="text-xs transition-colors duration-300 cursor-pointer hover:underline"
                          style={{ color: '#DA8359' }}
                        >
                          {expandedMemberId === member.id ? "Read less" : "Read more"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Second row - Team section */}
                <section className="py-16">
                  <div className="container mx-auto px-4">
                    {/* Title Section */}
                    <div className="text-center mb-12">
                      <motion.h2 
                        className="text-3xl md:text-4xl font-bold mb-3"
                        style={{ color: '#DA8359' }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        At the heart of BlueMine Tech
                      </motion.h2>
                      <motion.p 
                        className="text-xl md:text-2xl text-gray-700 font-light"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        The team that turns ambition into action
                      </motion.p>
                    </div>

                    {/* Team Grid */}
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto gap-4 md:gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible" 
                    >
                      {secondRowMembers.map((member) => (
                        <motion.div
                          key={member.id}
                          className="backdrop-blur-sm border p-4 rounded-lg text-center shadow-lg"
                          style={{
                            backgroundColor: 'rgba(252, 250, 238, 0.8)',
                            borderColor: 'rgba(218, 131, 89, 0.2)'
                          }}
                          variants={childVariants}
                          whileHover={{
                            y: -3,
                            boxShadow: "0 8px 20px -4px rgba(218, 131, 89, 0.2)"
                          }}
                        >
                          <motion.div
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 mx-auto mb-4"
                            style={{ borderColor: 'rgba(218, 131, 89, 0.4)' }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <h4 className="font-medium text-lg" style={{ color: '#DA8359' }}>
                            {member.name}
                          </h4>
                          <p className="text-gray-600 text-sm">{member.position}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </section>
              </motion.div>
            </div>
          </div>
         
          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl text-gray-800 mb-6 font-semibold">Ready to transform your digital presence?</h3>
            <motion.a
              href="/contact"
              className="px-8 py-3 text-white font-bold rounded-lg shadow-lg transition-all inline-block"
              style={{ 
                backgroundColor: '#DA8359',
                boxShadow: '0 4px 15px rgba(218, 131, 89, 0.3)'
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(218, 131, 89, 0.4)",
                backgroundColor: '#C67A52'
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