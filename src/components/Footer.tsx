import React from "react";
import { Mail, Phone, MapPin, ArrowUp, ExternalLink } from "lucide-react";

//Definicion de tipos para las props
type FooterLink = {
    label: string;
    href: string;
    external?: boolean;
};

type FooterSection = {
    title: string;
    links: FooterLink[];
};

type FooterProps = {
    onNewsletterSignup?: (email: string) => void;
};

const Footer: React.FC<FooterProps> = ({ onNewsletterSignup }) => {
    const [email, setEmail] = React.useState("");
    const [showScrollButton, setShowScrollButton] = React.useState(false);

    //Secciones del footer organizadas para facil mantenimiento
    const footerSections: FooterSection[] = [
        {
            title: "Recursos",
            links: [
                { label: "Inicio", href: "/", external: true },
                { label: "Preguntanos", href: "/QAsection", external: true },
                { label: "Assistant", href: "/owlassistant", external: true },
            ]
        },
        {
            title: "Soporte",
            links: [
                { label: "Centro de ayuda", href: "/", external: true },
                { label: "FAQ", href: "/", external: true },
                { label: "Contacto", href: "/", external: true },
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Política de privacidad", href: "/privacidad", external: true },
                { label: "Terminos de uso", href: "/terminos", external: true },
                { label: "Accesibilidad", href: "/acessibilidad", external: true },
            ]
        },
    ];

    //Manejador del scroll to top
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    //Observador del scroll para mostrar/ocultar el boton de scroll
    React.useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //Manejador del formulario de newsletter
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onNewsletterSignup) {
            onNewsletterSignup(email);
        }
        setEmail("");
    };

    return (
        <footer className="bg-gradient-to-b from-white to-[#F5F7FA] dark:from-gray-900 dark:to-gray-800 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Grid principal del footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* Seccion de la organizacion */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#3BACA3] dark:text-[#7FC8A9]">
                            Educacion y Apoyo en ETS
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Comprometidos con la educación, el apoyo y la desestigmatizacion.
                        </p>
                        <div className="space-y-2">
                            <a href="tel:+1234567890"
                                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-[#4A90B6] dark:hover:text-[#7FC8A9] transition-colors">
                                 <Phone className="h-4 w-4 mr-2" />
                                 <span>+1 (234) 567-890</span>  
                                </a>
              <a href="mailto:contacto@ejemplo.com"
                 className="flex items-center text-gray-600 dark:text-gray-300 hover:text-[#4A90B6] dark:hover:text-[#7FC8A9] transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <span>contacto@ejemplo.com</span>
              </a>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Ciudad, País</span>
              </div>
            </div>
          </div>

          {/* Secciones de enlaces */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-[#3BACA3] dark:text-[#7FC8A9] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#4A90B6] dark:hover:text-[#7FC8A9] transition-colors flex items-center"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-3 w-3 ml-1" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter y certificaciones */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-[#3BACA3] dark:text-[#7FC8A9]">
                Recibe nuestras actualizaciones
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-[#4A90B6] dark:focus:ring-[#7FC8A9] focus:border-transparent
                           transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4A90B6] hover:bg-[#3BACA3] dark:bg-[#7FC8A9] 
                           dark:hover:bg-[#3BACA3] text-white rounded-lg transition-colors
                           focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90B6]"
                >
                  Suscribirse
                </button>
              </div>
            </form>
            <div className="flex justify-end space-x-4">
              {/* Aquí puedes agregar certificaciones o badges */}
            </div>
          </div>
        </div>

        {/* Copyright y links finales */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              © {new Date().getFullYear()} VivirPosi+ivo. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 ">
              <a href="/privacidad" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#4A90B6] dark:hover:text-[#7FC8A9] transition-colors">
                Privacidad
              </a>
              <a href="/terminos" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#4A90B6] dark:hover:text-[#7FC8A9] transition-colors">
                Términos
              </a>
              <a href="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#4A90B6] dark:hover:text-[#7FC8A9] transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Botón de scroll to top */}
      {showScrollButton && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 p-2 bg-[#4A90B6] hover:bg-[#3BACA3] 
                   dark:bg-[#7FC8A9] dark:hover:bg-[#3BACA3] text-white rounded-full 
                   shadow-lg transition-all transform hover:scale-110
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90B6]"
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;