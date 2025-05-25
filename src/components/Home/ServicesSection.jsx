import { useState, useEffect } from 'react';

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Services data with warm theme colors
  const services = [
    {
      id: 1,
      title: "Digital Marketing",
      icon: "📱",
      description: "SEO, SMO, Meta & Google Ads, Influencer Marketing",
      color: "primary",
      features: ["Search Engine Optimization", "Social Media Campaigns", "PPC Management", "Analytics & Insights"]
    },
    {
      id: 2,
      title: "Social Media Management",
      icon: "💬",
      description: "Facebook, Instagram, WhatsApp, YouTube - complete handling",
      color: "secondary", 
      features: ["Content Creation", "Community Management", "Growth Strategy", "Brand Engagement"]
    },
    {
      id: 3,
      title: "Web Development",
      icon: "🌐",
      description: "Custom websites, E-commerce solutions, maintenance",
      color: "accent",
      features: ["Responsive Design", "E-commerce Solutions", "CMS Integration", "Performance Optimization"]
    },
    {
      id: 4,
      title: "Business Growth",
      icon: "📈",
      description: "Data analytics, tech support, research & telecaller services",
      color: "tertiary",
      features: ["Market Research", "Data Analysis", "Growth Strategy", "Support Services"]
    }
  ];

  // Enhanced color system with warm earth tones
  const getColorClasses = (color, isHovered) => {
    const colors = {
      primary: {
        bg: isHovered ? "bg-orange-500" : "bg-orange-400/20",
        lightBg: "bg-orange-100/10", 
        border: "border-orange-400",
        shadowColor: "rgba(218, 131, 89, 0.4)",
        text: "text-orange-400",
        darkText: "text-orange-600",
        glow: "bg-orange-400/30",
        gradientFrom: "from-orange-500",
        gradientTo: "to-orange-300"
      },
      secondary: {
        bg: isHovered ? "bg-amber-600" : "bg-amber-500/20",
        lightBg: "bg-amber-100/10",
        border: "border-amber-400", 
        shadowColor: "rgba(245, 158, 11, 0.4)",
        text: "text-amber-400",
        darkText: "text-amber-600",
        glow: "bg-amber-400/30",
        gradientFrom: "from-amber-500",
        gradientTo: "to-amber-300"
      },
      accent: {
        bg: isHovered ? "bg-yellow-600" : "bg-yellow-500/20",
        lightBg: "bg-yellow-100/10",
        border: "border-yellow-400",
        shadowColor: "rgba(234, 179, 8, 0.4)", 
        text: "text-yellow-400",
        darkText: "text-yellow-600",
        glow: "bg-yellow-400/30",
        gradientFrom: "from-yellow-500",
        gradientTo: "to-yellow-300"
      },
      tertiary: {
        bg: isHovered ? "bg-stone-600" : "bg-stone-500/20",
        lightBg: "bg-stone-100/10",
        border: "border-stone-400",
        shadowColor: "rgba(120, 113, 108, 0.4)",
        text: "text-stone-400", 
        darkText: "text-stone-600",
        glow: "bg-stone-400/30",
        gradientFrom: "from-stone-500",
        gradientTo: "to-stone-300"
      }
    };
    
    return colors[color];
  };

  // Generate floating particles with organic movement
  const generateParticles = (count, color) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
      color,
      direction: Math.random() * 360
    }));
  };

  // Organic floating animation keyframes
  const floatingAnimation = {
    animation: 'float 6s ease-in-out infinite'
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes organic-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes leaf-dance {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(10deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-25px) rotate(15deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .organic-pulse {
          animation: organic-pulse 4s ease-in-out infinite;
        }
        
        .leaf-dance {
          animation: leaf-dance 8s ease-in-out infinite;
        }
      `}</style>

      <section
        id="services"
        className="relative py-20 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #FCFAEE 0%, #ECDFCC 50%, #FCFAEE 100%)',
        }}
        onMouseEnter={() => setIsInView(true)}
      >
        {/* Enhanced organic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large organic shapes with parallax */}
          <div 
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(218, 131, 89, 0.3) 0%, transparent 70%)',
              right: `${30 - mousePosition.x * 0.1}%`,
              top: `${20 - mousePosition.y * 0.05}%`,
              transform: 'translate3d(0,0,0)',
              transition: 'all 0.3s ease-out'
            }}
          />
          
          <div 
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
              left: `${10 + mousePosition.x * 0.08}%`,
              bottom: `${15 + mousePosition.y * 0.03}%`,
              transform: 'translate3d(0,0,0)',
              transition: 'all 0.2s ease-out'
            }}
          />

          {/* Floating organic elements */}
          <div className="absolute inset-0">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full opacity-20 leaf-dance"
                style={{
                  background: i % 3 === 0 ? '#DA8359' : i % 3 === 1 ? '#F59E0B' : '#EAB308',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Animated connector */}
        <div className="relative">
          <div 
            className="absolute left-1/2 -top-20 transform -translate-x-1/2 w-1 h-20 opacity-50"
            style={{ 
              background: 'linear-gradient(to bottom, transparent, #DA8359, transparent)' 
            }}
          />
          <div 
            className="absolute left-1/2 -top-5 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center organic-pulse"
            style={{ 
              borderColor: '#DA8359',
              backgroundColor: 'rgba(218, 131, 89, 0.1)'
            }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: '#DA8359' }}
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced section heading */}
          <div className="text-center mb-16">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ 
                color: '#8B4513',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Our{' '}
              <span 
                className="inline-block"
                style={{ 
                  background: 'linear-gradient(135deg, #DA8359, #F59E0B, #EAB308)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'float 4s ease-in-out infinite'
                }}
              >
                Services
              </span>
            </h2>
            
            <p 
              className="max-w-3xl mx-auto text-lg"
              style={{ color: '#6B5B47' }}
            >
              Empowering your business with innovative digital solutions that grow naturally
            </p>
          </div>

          {/* Enhanced services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color, hoveredService === service.id);
              const particles = generateParticles(10, service.color);
              
              return (
                <div
                  key={service.id}
                  className="relative rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 overflow-hidden cursor-pointer group"
                  style={{
                    backgroundColor: hoveredService === service.id ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
                    boxShadow: hoveredService === service.id 
                      ? `0 20px 40px -10px ${colorClasses.shadowColor}, 0 0 0 1px rgba(218, 131, 89, 0.2)` 
                      : '0 5px 15px rgba(0,0,0,0.1)',
                    transform: hoveredService === service.id ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                    border: `2px solid ${hoveredService === service.id ? colorClasses.border.replace('border-', '') : 'transparent'}`
                  }}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Enhanced background glow */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${colorClasses.shadowColor} 0%, transparent 70%)`,
                      opacity: hoveredService === service.id ? 0.6 : 0
                    }}
                  />
                  
                  {/* Enhanced animated particles */}
                  {hoveredService === service.id && particles.map(particle => (
                    <div
                      key={`particle-${service.id}-${particle.id}`}
                      className="absolute rounded-full opacity-0"
                      style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        backgroundColor: colorClasses.shadowColor.match(/rgba\(([^)]+)\)/)[1].split(',').slice(0,3).join(','),
                        animation: `
                          ${particle.duration / 4}s ease-in-out infinite,
                          leafDance 0s ${particle.delay}s forwards,
                          fadeInOut ${particle.duration / 3}s ${particle.delay}s infinite
                        `
                      }}
                    />
                  ))}
                  
                  <div className="relative z-10">
                    {/* Enhanced icon with organic animations */}
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      {/* Multiple orbital rings */}
                      <div
                        className="absolute inset-0 rounded-full border-2 opacity-40"
                        style={{ 
                          borderColor: colorClasses.border.replace('border-', ''),
                          borderStyle: 'dashed',
                          animation: hoveredService === service.id ? 'spin 12s linear infinite' : 'none'
                        }}
                      />
                      
                      <div
                        className="absolute inset-2 rounded-full border border-dotted opacity-30"
                        style={{ 
                          borderColor: colorClasses.border.replace('border-', ''),
                          animation: hoveredService === service.id ? 'spin 8s linear infinite reverse' : 'none'
                        }}
                      />

                      {/* Floating orbital elements */}
                      {hoveredService === service.id && (
                        <>
                          {Array.from({ length: 4 }, (_, i) => (
                            <div
                              key={i}
                              className="absolute w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: colorClasses.shadowColor.match(/rgba\(([^)]+)\)/)[1].split(',').slice(0,3).join(','),
                                top: '50%',
                                left: '50%',
                                transformOrigin: `${20 + i * 5}px 0`,
                                animation: `spin ${6 + i * 2}s linear infinite`,
                                animationDelay: `${i * 0.5}s`
                              }}
                            />
                          ))}
                        </>
                      )}

                      {/* Enhanced icon background */}
                      <div 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
                        style={{
                          backgroundColor: hoveredService === service.id ? colorClasses.bg.replace('bg-', '') : colorClasses.lightBg.replace('bg-', ''),
                          boxShadow: hoveredService === service.id ? `0 0 30px ${colorClasses.shadowColor}` : 'none',
                          animation: hoveredService === service.id ? 'float 3s ease-in-out infinite' : 'none'
                        }}
                      >
                        <span className="text-4xl relative z-10 transition-transform duration-300" 
                              style={{ transform: hoveredService === service.id ? 'scale(1.2)' : 'scale(1)' }}>
                          {service.icon}
                        </span>
                      </div>
                    </div>
                    
                    {/* Enhanced service title */}
                    <div className="text-center mb-6">
                      <h3 
                        className="text-2xl font-bold mb-2 transition-colors duration-300"
                        style={{ 
                          color: hoveredService === service.id ? colorClasses.darkText.replace('text-', '') : '#8B4513'
                        }}
                      >
                        {service.title}
                      </h3>
                      
                      {/* Animated organic underline */}
                      <div 
                        className="h-1 mx-auto rounded-full transition-all duration-500 overflow-hidden"
                        style={{ 
                          width: hoveredService === service.id ? '90%' : '0%',
                          backgroundColor: colorClasses.border.replace('border-', '')
                        }}
                      >
                        <div 
                          className="h-full w-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${colorClasses.shadowColor}, transparent)`,
                            animation: hoveredService === service.id ? 'shimmer 2s ease-in-out infinite' : 'none'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced description */}
                    <p 
                      className="text-center mb-4 transition-colors duration-300"
                      style={{ color: '#6B5B47' }}
                    >
                      {service.description}
                    </p>
                    
                    {/* Enhanced features list */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ 
                        maxHeight: hoveredService === service.id ? '200px' : '0px',
                        opacity: hoveredService === service.id ? 1 : 0
                      }}
                    >
                      <ul className="space-y-2 text-sm" style={{ color: '#6B5B47' }}>
                        {service.features.map((feature, i) => (
                          <li 
                            key={i}
                            className="flex items-center transition-all duration-300"
                            style={{
                              transform: hoveredService === service.id ? 'translateX(0)' : 'translateX(-20px)',
                              transitionDelay: `${i * 100}ms`
                            }}
                          >
                            <div 
                              className="mr-3 w-2 h-2 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: colorClasses.border.replace('border-', ''),
                                transform: hoveredService === service.id ? 'scale(1.5)' : 'scale(1)',
                                animation: hoveredService === service.id ? `pulse 2s ease-in-out infinite ${i * 0.2}s` : 'none'
                              }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Enhanced corner accents */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div 
                      className="absolute top-0 left-0 w-12 h-12 border-t-3 border-l-3 rounded-tl-2xl transition-all duration-300"
                      style={{
                        borderColor: colorClasses.border.replace('border-', ''),
                        opacity: hoveredService === service.id ? 1 : 0,
                        transform: hoveredService === service.id ? 'scale(1)' : 'scale(0.5)'
                      }}
                    />
                    <div 
                      className="absolute bottom-0 right-0 w-12 h-12 border-b-3 border-r-3 rounded-br-2xl transition-all duration-300"
                      style={{
                        borderColor: colorClasses.border.replace('border-', ''),
                        opacity: hoveredService === service.id ? 1 : 0,
                        transform: hoveredService === service.id ? 'scale(1)' : 'scale(0.5)'
                      }}
                    />
                  </div>
                  
                  {/* Enhanced "Learn more" button */}
                  <div 
                    className="absolute bottom-6 left-0 right-0 flex justify-center transition-all duration-300"
                    style={{
                      opacity: hoveredService === service.id ? 1 : 0,
                      transform: hoveredService === service.id ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
              
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced call to action */}
          <div className="mt-20 text-center">
            <a
              href="#contact"  
              className="relative inline-block px-12 py-4 font-bold text-lg rounded-full shadow-xl overflow-hidden group transition-all duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #DA8359, #F59E0B)',
                color: '#FCFAEE'
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #EAB308)'
                }}
              />
              
              {/* Ripple effect */}
              <div
                className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-1000"
                style={{
                  backgroundColor: '#FCFAEE',
                  transform: 'translate(-50%, -50%) scale(0)',
                  animation: 'ripple 2s ease-out infinite'
                }}
              />
              
              <span className="relative z-10">Get Started Today</span>
            </a>
            
            {/* Pulsing glow effect */}
            <div
              className="w-full h-6 mt-2 mx-auto rounded-full opacity-30"
              style={{
                background: 'radial-gradient(ellipse, rgba(218, 131, 89, 0.6) 0%, transparent 70%)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Enhanced scroll indicator */}
          <div className="flex justify-center mt-16">
            <a
              href="#portfolio"
              className="flex flex-col items-center transition-all duration-300 hover:scale-110"
              style={{ color: '#DA8359' }}
            >
              <div className="relative w-10 h-10">
                <div
                  className="absolute inset-0 rounded-full border-2 opacity-30"
                  style={{ 
                    borderColor: '#DA8359',
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                  }}
                />
                <div
                  className="absolute inset-1 rounded-full border-2 opacity-60"
                  style={{ 
                    borderColor: '#DA8359',
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s'
                  }}
                />
                <svg 
                  className="w-10 h-10 transition-transform duration-300"
                  style={{ 
                    color: '#DA8359',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path 
                    d="M7 13L12 18L17 13" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M7 7L12 12L17 7" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeOpacity="0.5"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes ripple {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(0) rotate(0deg); }
            50% { opacity: 0.7; transform: translateY(-30px) rotate(180deg); }
          }
          
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
        `}</style>
      </section>
    </>
  );
}