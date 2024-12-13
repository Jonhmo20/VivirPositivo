import React from 'react';
import { Home, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';

// Define the props interface
interface HeaderProps {
  onNavigate: (route: NavigationRoute) => void;
}

// Define a type for possible navigation routes
type NavigationRoute = 
  | 'home' 
  | 'preguntas' 
  | 'admin-blogs';

// Define color palette type
interface ColorPalette {
  background: string;
  primaryText: string;
  secondaryText: string;
  highlight: string;
}

const Header: React.FC<HeaderProps> = ({  onNavigate }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); //obtiene el estado de autenticacion
  const colors: ColorPalette = {
    background: '#B7DBC8',
    primaryText: '#285D66',
    secondaryText: '#6DA095',
    highlight: '#E1DF66'
  };

  const handleLogoClick = () => {
    navigate('/create-blog');
  };


  const handleNavigation = (route: NavigationRoute) => {
    onNavigate(route);
  };

  const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate('/login');
};

  return (
    <header 
      className="w-full py-8 px-10 flex justify-between items-center shadow-lg"
      style={{ 
        backgroundColor: colors.background ,
        borderBottom: `3px solid ${colors.highlight}`
      }}
    >
      
      {/* Logo Section */}
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
        <img 
          src="/logo.jpeg" 
          alt="Logo" 
          className="h-24 w-40 object-cover rounded-lg shadow-sm md:shadow-md lg:shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-110"
          style={{
            maxWidth: '250px', // Límite de ancho máximo
            borderRadius: '8px', // Bordes redondeados más pronunciados
            border: `1px solid ${colors.primaryText}` // Borde con color de texto primario
          }}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex items-center space-x-10">
        {[
          { route: 'home', icon: Home, label: 'Inicio' },
          { route: 'preguntas', icon: MessageCircle, label: 'Pregúntanos' }
        ].map(({ route, icon: Icon, label }) => (
          <motion.button 
            key={route}
            onClick={() => handleNavigation(route as NavigationRoute)}
            className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-opacity-30 transition-all duration-300"
            style={{ 
              color: colors.primaryText,
              backgroundColor: `${colors.secondaryText}30`, // Fondo semi-transparente
              borderRadius: '10px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.highlight}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${colors.secondaryText}30`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={24} />
            <span className="font-semibold text-lg">{label}</span>
          </motion.button>
        ))}

        {/* Admin Section - Only visible to admin */}
        {isAuthenticated && (
          <motion.button 
            onClick={() => handleNavigation('admin-blogs')}
            className="flex items-center space-x-3 px-4 py-3 rounded-md bg-[#285D66] bg-opacity-30 hover:bg-opacity-40 transition-all duration-300"
            style={{ 
              color: colors.primaryText,
              borderRadius: '10px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.highlight}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${colors.secondaryText}30`}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
          >
            <User size={24} />
            <span className="font-semibold text-lg">Crear Blogs</span>
          </motion.button>
        )}

        {/* Logout Section - Only visible to authenticated users */}
{isAuthenticated && (
  <motion.button
    onClick={handleLogout}
    className="flex items-center space-x-3 px-4 py-3 rounded-md bg-[#285D66] bg-opacity-30 hover:bg-opacity-40 transition-all duration-300"
    style={{
      color: colors.primaryText,
      borderRadius: '10px',
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.highlight}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${colors.secondaryText}30`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <User size={24} />
    <span className="font-semibold text-lg">Cerrar sesión</span>
  </motion.button>
)}
      </nav>
    </header>
  );
};

export default Header;