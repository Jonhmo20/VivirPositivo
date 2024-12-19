import React, { useState, useEffect } from 'react';
import { 
  Home, 
  MessageCircle, 
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  LucideSquareSplitHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';

// Define the props interface
interface HeaderProps {
  isAdmin: boolean;//indica si el usuario es admin
  onNavigate: (route: NavigationRoute) => void;
}


// Define a type for possible navigation routes
type NavigationRoute = 
  | 'home' 
  | 'preguntas' 
  | 'admin-blogs';

// Define color palette type
interface ColorPalette {
  light: {
    background: string;
    primaryText: string;
    secondaryText: string;
    highlight: string;
};
  dark: {
    background: string;
    primaryText: string;
    secondaryText: string;
    highlight: string;
  }
};

interface NavigationItem {
  route: NavigationRoute;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  customAnimation?: {
    hover?: object;
    tap?: object;
  };
}



const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth(); //obtiene el estado de autenticacion
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [pendingNotifications, setPendingNotifications] = useState(0);

    const colors: ColorPalette = {
      light: {
        background: '#B7DBC8',
        primaryText: '#285D66',
        secondaryText: '#6DA095',
        highlight: '#E1DF66'
      },
      dark: {
        background: '#1E1E1E',
        primaryText: '#E1DF66',
        secondaryText: '#6DA095',
        highlight: '#285D66'
      }
      
     };

     


    // Add mobileMenuVariants inside the component
    const mobileMenuVariants = {
      hidden: {
        x: '100%',
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 0.3
        }
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.3
        }
      }
    };

     //toggle dark mode
     const toggleDarkMode = () => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
     };

     //load dark mode from preferences
     useEffect(() => {
      const savedMode = localStorage.getItem('isDarkMode');
      if (savedMode) {
        setIsDarkMode(JSON.parse(savedMode));
      }
    }, []);

    const currentColors = isDarkMode ? colors.dark : colors.light;


  const handleLogoClick = () => {
    navigate('/create-blog'); // Navega a la página de creación de blogs
  };


  const handleNavigation = (route: NavigationRoute) => {
    console.log('Navegando a:', route); // Depuración
    try {
      onNavigate(route); // Llama a la función proporcionada desde las props
    } catch (error) {
      console.error('Error navigating to route:', error);
    }
  };
   


const handleLogout = () => {
  const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
  if (confirmLogout) {
  logout();
  navigate('/login');
  }
};

// custom SVG Background pattern
const BackgroundPattern: React.FC = () => {
  return (
  <svg
      className='absolute inset-0 h-full w-full opacity-10'
      xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="pattern"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            >
            <circle
              cx="50"
              cy="50"
              r="10"
              fill={currentColors.secondaryText}
              opacity="0.1"
      />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#pattern)"
          />
      </svg>
      );
};

const navigationItems: NavigationItem[] = [
  { 
    route: 'home', 
    icon: (props) => <Home {...props} />,
    label: 'Inicio',
    customAnimation: {
      hover: { rotate: 15 },
      tap: { scale: 0.9 }
    }
  },
  { 
    route: 'preguntas', 
    icon: (props) => <MessageCircle {...props} />,
    label: 'Pregúntanos',
    customAnimation: {
      hover: { rotate: -15 },
      tap: { scale: 0.9 }
    }
  }
];

  return (
    <header 
      className="relative w-full py-4 px-6 md:px-10 flex justify-between items-center shadow-lg z-50 transition-all duration-500"
      style={{ 
        backgroundColor: currentColors.background ,
        borderBottom: `3px solid ${currentColors.highlight}`
      }}
    >
    <div className='absolute inset-0 overflow-hidden'>
      <BackgroundPattern />
      </div>

      {/* Dark Mode Toggle */}
      <motion.button 
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Cambiar al modo claro' : 'Cambiar al modo oscuro'}
        className="absolute top-4 right-20 md:right-20 right-12 z-[110]"        
        whileHover={{ rotate: 360, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? (
            <Sun color={currentColors.primaryText} />
          ) : (
            <Moon color={currentColors.primaryText} />
          )}
          </motion.button>

          {/* Notifications Badge */}
          {isAuthenticated &&  (
            <motion.div
              className="absolute top-4 md:right-32 right-24 z-[110] flex items-center space-x-2" >

                {/* Notifications Bell Icon */}
                <motion.div
                  className="relative cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    navigate('/create-blog'); // Navega a la página de creación de blogs
                  }}
                  >
                  <Bell color={currentColors.primaryText} />
                  {pendingNotifications > 0 && (
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: currentColors.highlight,
                        color: currentColors.primaryText
                      }}
                    >
                    {pendingNotifications }
                </div>
          )}
                </motion.div>

                {/*<motion.div
                  className=" cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    console.log('Switching layout view');
                  }}
                  >
                  <LucideSquareSplitHorizontal color={currentColors.primaryText} />
                </motion.div>*/}
                </motion.div>
          )}

        {/*Sección del logotipo */}
        <div className="flex items-center cursor-pointer" 
        onClick={handleLogoClick}>
        <img 
        src="/logo.jpeg" 
        alt="Logotipo" 
        className="h-24 w-40 object-cover rounded-lg shadow-sm md:shadow-md lg:shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-110 
        hover:scale-105 active:scale-95
        hover:bg-opacity-50
        transform"
        style={{
        maxWidth: '250px', // Límite de ancho máximo
        borderRadius: '8px', // Bordes redondeados más pronunciados
        border: '1px solid ${colors.primaryText}' // Borde con color de texto primario
        }}
        />
        </div>               
      

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 ">
        {navigationItems.map(({ route, icon: Icon, label }) => (
          <div 
            key={route}
            onClick={() => handleNavigation(route as NavigationRoute)}
            className="flex items-center space-x-3 px-4 py-2 rounded-md  transition-all duration-300 cursor-pointer
            hover:scale-105 active:scale-95 
            hover:bg-opacity-50 
            transform"
            style={{ 
              color: currentColors.primaryText,
              backgroundColor: `${currentColors.secondaryText}30`, // Fondo semi-transparente
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.highlight} // Hover
            
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  `${currentColors.secondaryText}30`} // Restaura a semi-transparente 
            >
            <Icon 
            size={20} 
            color={currentColors.primaryText} />
            <span className="font-semibold text-base transition-colors duration-300">{label}</span>
          </div>
        ))}

        {/* Admin Section - Only visible to admin */}
        {isAuthenticated &&  (
          <>
          <div
            onClick={() => handleNavigation('admin-blogs')}
            className="flex items-center space-x-3 px-4 py-2 rounded-md transition-all duration-300 cursor-pointer
            hover:scale-105 active:scale-95 
            hover:bg-opacity-50 
            transform"
            style={{ 
              color: currentColors.primaryText,
              backgroundColor: `${currentColors.secondaryText}30`, // Fondo semi-transparente
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.highlight} // Hover
            
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  `${currentColors.secondaryText}30`} // Restaura a semi-transparente 
          >
            <User size={20} />
            <span className="font-semibold text-base">Crear Blogs</span>
          </div>

          <div 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 rounded-md transition-all duration-300 cursor-pointer
            hover:scale-105 active:scale-95 
            hover:bg-opacity-50 
            transform"
            style={{ 
              color: currentColors.primaryText,
              backgroundColor: `${currentColors.secondaryText}30`, // Fondo semi-transparente
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.highlight} // Hover
            
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  `${currentColors.secondaryText}30`} // Restaura a semi-transparente 
            >
                <LogOut size={20} />
                <span className="font-semibold text-base">Cerrar sesión</span>
              </div>  
              </>
        )}
        </nav>

        {/* Mobile Menu toggle */}
        <div
          className="md:hidden fixed top-3 right-2 z-[110] cursor-pointer
          hover:scale-105 active:scale-95
          transform transition-transform duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={32} color={currentColors.primaryText} />
            ) : (
              <Menu size={32} color={currentColors.primaryText} />
            )}
            </div>

        {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 h-full w-64 bg-[#B7DBC8] shadow-2xl z-50 md:hidden tranform transition-transform duration-300"
            >

              <div className="flex flex-col h-full p-6 space-y-4 mt-16">
                {navigationItems.map(({ route, icon: Icon, label, }) => (
                  <div
                    key={route}
                    onClick={() => {
                      handleNavigation(route as NavigationRoute);
                      setIsMobileMenuOpen(false); // Cierra el menú al hacer clic
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 cursor-pointer 
                    hover:scale-105 active:scale-95 
                    hover:bg-opacity-50 
                    transform"
                    style={{ 
                      color: currentColors.primaryText,
                      backgroundColor: `${currentColors.secondaryText}30`, // Fondo semi-transparente
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.highlight} // Hover
            
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  `${currentColors.secondaryText}30`} // Restaura a semi-transparente
                    >
                    <Icon size={24} />
                    <span className="font-semibold text-base">{label}</span>
                  </div>
                  ))}

                  {isAuthenticated &&  (
                    <>
                    <div 
                      onClick={() => {
                        handleNavigation('admin-blogs');
                        setIsMobileMenuOpen(false);
                      } }
                      className="flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 cursor-pointer
                      hover:scale-105 active:scale-95 
                      hover:bg-opacity-50 
                      transform"
                      style={{ 
                        color: currentColors.primaryText,
                        backgroundColor: `${currentColors.secondaryText}30`, // Fondo semi-transparente
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.highlight} // Hover
            
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  `${currentColors.secondaryText}30`} // Restaura a semi-transparente
                      
                        >
                          <User size={24} />
                          <span className="font-semibold text-lg">Crear Blogs</span>
                        </div>

                        <div
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-300 cursor-pointer
                          hover:scale-105 active:scale-95 
                          hover:bg-opacity-50 
                          transform"
                          style={{ 
                            color: currentColors.primaryText,
                            backgroundColor: `${currentColors.secondaryText}30`, // Fondo semi-transparente
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.highlight} // Hover
            
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor =  `${currentColors.secondaryText}30`} // Restaura a semi-transparente
                          
                            >
                              <LogOut size={24} />
                              <span className="font-semibold text-lg">Cerrar sesión</span>
                            </div>
                    </>
                  )}

                </div>
              </motion.div>
            )}
                  
    </header>
  );
};

export default Header;