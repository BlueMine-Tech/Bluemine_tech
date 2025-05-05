import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const words = [ "Smart", "Strategic", "Innovative"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gray-900 overflow-hidden pt-24 sm:pt-28 md:pt-20 w-full"
      style={{ 
        width: '100vw', 
        maxWidth: '100vw',
        marginLeft: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {/* Background particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/10"
          initial={{
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, Math.random() * -500 - 100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Radial glow following mouse */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col justify-center min-h-[calc(100vh-120px)] sm:h-[calc(100vh-80px)] text-center">
          {/* Animated Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 sm:mt-0"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Empowering Businesses Through
              <br />
              <span className="relative inline-block mt-2">
                <motion.span
                  key={currentWordIndex}
                  className="text-blue-400 absolute left-0 right-0"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {words[currentWordIndex]}
                </motion.span>
                <span className="invisible">{words[0]}</span>
              </span>
              <br />
              Digital Solutions
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At BlueMine Technologies, we specialize in driving business growth through
            strategic digital marketing and advanced software solutions.
          </motion.p>

          {/* Underline animation */}
          <motion.div
            className="h-1 bg-blue-500 mt-8 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />

          {/* Call to Action Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.a
              href="#services"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Our Services
            </motion.a>

            <motion.a
              href="#contact"
              className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-medium rounded-lg"
              whileHover={{
                scale: 1.05,
                borderColor: "#60a5fa",
                color: "#60a5fa"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
            </motion.a>
          </motion.div>

          {/* Features */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {[
              { title: "Digital Marketing", icon: "💼" },
              { title: "Software Solutions", icon: "💻" },
              { title: "24/7 Support", icon: "🔧" },
              { title: "Data Analytics", icon: "📊" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -5, backgroundColor: "rgba(30, 41, 59, 0.7)" }}
              >
                <motion.div
                  className="text-2xl sm:text-3xl mb-2"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: 2 + index * 0.5,
                    repeat: Infinity,
                    repeatDelay: 7
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-medium text-blue-400 text-sm sm:text-base">{feature.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              delay: 2,
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}