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
  LucideSquareSplitHorizontal,
  LucideIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Define the props interface
interface HeaderProps {
  isAdmin: boolean;//indica si el usuario es admin
  onNavigate: (route: NavigationRoute) => void;
}


// Define a type for possible navigation routes
type NavigationRoute = 'home' | 'preguntas' | 'admin-blogs';


interface NavigationItem {
  route: NavigationRoute;
  icon: LucideIcon
  label: string;
  description?: string;
  }


const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth(); //obtiene el estado de autenticacion
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [pendingNotifications, setPendingNotifications] = useState(0);
     

     //load dark mode from preferences
     useEffect(() => {
      const savedMode = localStorage.getItem('isDarkMode');
      if (savedMode) {
        setIsDarkMode(JSON.parse(savedMode));
      }
    }, []);

    const navigationItems: NavigationItem[] = [
      { 
        route: 'home', 
        icon: Home,
        label: 'Inicio',
        description: 'ir a la página de principal'
      },
      { 
        route: 'preguntas', 
        icon: MessageCircle,
        label: 'Pregúntanos',
        description: 'Accede a nuestra seccion de preguntas y respuestas'
        }
    ];

    //toggle dark mode
    const toggleDarkMode = () => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
     };

     const handleLogout = () => {
  const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
  if (confirmLogout) {
  logout();
  navigate('/login');
  }
};

  return (
    <header 
      className="relative w-full bg-primary shadow-lg z-50 "
      role="banner"
    >
    <div className='w-full px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between py-4'>
        {/* Logo Section */}
        <motion.div
        whileHover={{ scale: 1.08, translateY: -2 }}
        whileTap={{ scale: 0.96 }}
        className='flex-shrink-0 mr-auto cursor-pointer'
        onClick={() => navigate('/create-blog')}
        >

          <img 
          src="/logo.jpeg"
          alt="Logo de la plataforma medica edicativa"
          className='h-12 w-24 
               sm:h-16 sm:w-28 
               md:h-20 md:w-32 
               lg:h-20 lg:w-36 
               xl:h-20 xl:w-40 
               2xl:h-20 2xl:w-44 
               rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.25)] transition-shadow duration-300 object-cover'
          />
        </motion.div>

        {/* Desktop Navigation Menu */}
        <nav 
        className="hidden md:flex items-center gap-x-4 ml-auto"
        role='navigation'
        aria-label='Navegación principal'
        >
          {navigationItems.map(({ route, icon: Icon, label, description }) => (
            <motion.button
              key={route}
              onClick={() => onNavigate(route)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 rounded-md text-white hover:bg-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              aria-label={description || label}
              >
                 <Icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{label}</span>
              </motion.button>
            ))}

            {/* Admin Actions */}
            {isAuthenticated && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('admin-blogs')}
                  className="flex items-center px-4 py-2 rounded-md text-white 
                    hover:bg-primary-hover transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  aria-label="Crear nuevo blog"
                >
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-medium">Crear Blogs</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-md text-white 
                    hover:bg-primary-hover transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span className="font-medium">Cerrar sesión</span>
                </motion.button>
              </>
            )}
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center ml-4">
            {/* Dark Mode Toggle */}
            {/*<motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-primary-hover transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </motion.button>

            {/* Notifications */}
            {/*{isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full hover:bg-primary-hover 
                  transition-colors duration-200 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-accent"
                aria-label={`Notificaciones: ${pendingNotifications} sin leer`}
              >
                <Bell className="w-5 h-5 text-white" />
                {pendingNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-support text-white 
                    text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingNotifications}
                  </span>
                )}
              </motion.button>
            )}*/}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-primary-hover 
                transition-colors duration-200 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-accent"
              aria-expanded={isMobileMenuOpen}
              aria-label="Menú principal"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-hover"
            role="dialog"
            aria-label="Menú móvil"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigationItems.map(({ route, icon: Icon, label }) => (
                <motion.button
                  key={route}
                  onClick={() => {
                    onNavigate(route);
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ x: 10 }}
                  className="flex items-center w-full px-4 py-2 text-white 
                    hover:bg-primary transition-colors duration-200 rounded-md"
                >
                  <Icon size={20} className=" mr-2" />
                  <span className="font-medium">{label}</span>
                </motion.button>
              ))}

              {isAuthenticated && (
                <>
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      onNavigate('admin-blogs');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-white 
                      hover:bg-primary transition-colors duration-200 rounded-md"
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span className="font-medium">Crear Blogs</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-white 
                      hover:bg-primary transition-colors duration-200 rounded-md"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="font-medium">Cerrar sesión</span>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;