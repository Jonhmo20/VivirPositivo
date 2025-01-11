//import React from 'react';

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Declaración de Accesibilidad
          </h1>
          <p className="text-gray-300">
            Última actualización: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Compromiso General */}
        <div className="p-6 bg-gray-800/50 rounded-lg mb-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              Nos comprometemos a garantizar la accesibilidad digital para personas con 
              discapacidades. Estamos continuamente mejorando la experiencia del usuario 
              para todos y aplicando los estándares de accesibilidad relevantes.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Nivel de Accesibilidad */}
          <section className="p-6 bg-gray-800/30 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Nivel de Accesibilidad
            </h2>
            <p className="text-gray-300">
              Este sitio web se esfuerza por cumplir con el nivel AA de las Pautas de 
              Accesibilidad para el Contenido Web (WCAG) 2.1.
            </p>
          </section>

          {/* Características */}
          <section className="p-6 bg-gray-800/30 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Características de Accesibilidad
            </h2>
            <ul className="space-y-3">
              {[
                "Navegación completa por teclado",
                "Compatibilidad con lectores de pantalla",
                "Textos alternativos para imágenes",
                "Contraste de color suficiente",
                "Textos redimensionables",
                "Estructuración clara del contenido"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"/>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tecnologías */}
          <section className="p-6 bg-gray-800/30 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Tecnologías de Asistencia Soportadas
            </h2>
            <ul className="space-y-3">
              {[
                "NVDA (Acceso a Escritorio No Visual)",
                "JAWS (Acceso al trabajo con voz)",
                "Voz en off",
                "Hablar"
              ].map((tech, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"/>
                  <span className="text-gray-300">{tech}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Problemas */}
          <section className="p-6 bg-gray-800/30 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              ¿Encontró un Problema?
            </h2>
            <p className="text-gray-300 mb-4">
              Si encuentra alguna dificultad para acceder a cualquier contenido de este sitio web, 
              por favor contáctenos usando alguno de los siguientes métodos:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>Correo electrónico: [correo de contacto]</p>
              <p>Teléfono: [teléfono de contacto]</p>
              <p>Formulario de contacto: [enlace al formulario]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;