import React, { useState } from 'react';
//import { Card } from "@/components/ui/card";

const TerminosUso = () => {
  const [activeVersion, setActiveVersion] = useState<string | null>(null);

  const toggleVersion = (version: string) => {
    if (activeVersion === version) {
      setActiveVersion(null);
    } else {
      setActiveVersion(version);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-8">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Resumen en Lenguaje Simple */}
          <div className="p-6 bg-teal-50 dark:bg-teal-900/20">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Resumen Simple
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400">
                Este documento explica:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                <li>Cómo puede usar nuestra plataforma</li>
                <li>Cómo protegemos sus datos personales según la Ley 1581 de 2012</li>
                <li>Sus derechos y responsabilidades como usuario</li>
                <li>Nuestras responsabilidades como prestadores del servicio</li>
              </ul>
            </div>
          </div>

          {/* Introducción */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              1. Introducción
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Este acuerdo se rige por las leyes de la República de Colombia, especialmente por la Ley 1581 de 2012 (Protección de Datos Personales), la Ley 23 de 1982 (Derechos de Autor) y la Ley 1266 de 2008 (Habeas Data).
            </p>
          </div>

          {/* Privacidad y Datos */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              2. Privacidad y Protección de Datos
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                <li>Tiene derecho a conocer, actualizar y rectificar sus datos personales</li>
                <li>Puede solicitar prueba de la autorización otorgada para el tratamiento de datos</li>
                <li>Será informado sobre el uso que se le da a sus datos personales</li>
                <li>Puede revocar la autorización y/o solicitar la supresión de sus datos</li>
              </ul>
            </div>
          </div>

          {/* Propiedad Intelectual */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              3. Propiedad Intelectual
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Según la Ley 23 de 1982 sobre Derechos de Autor y Decisión 486 de la CAN:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                <li>Todo el contenido de la plataforma está protegido por derechos de autor</li>
                <li>Las marcas, logos y nombres comerciales son propiedad de VivirPosi+ivo</li>
                <li>El uso no autorizado del contenido está prohibido y puede resultar en acciones legales</li>
                <li>Los usuarios mantienen los derechos de autor de su contenido original</li>
              </ul>
            </div>
          </div>

          {/* Historial de Versiones */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Historial de Versiones
            </h2>
            <div className="space-y-2">
              {/* Versión 1.0 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => toggleVersion('v1.0')}
                >
                  <span>Versión 1.0 (Enero 2025)</span>
                  <span className="transform transition-transform duration-200" 
                        style={{ transform: activeVersion === 'v1.0' ? 'rotate(180deg)' : '' }}>
                    ▼
                  </span>
                </button>
                {activeVersion === 'v1.0' && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                      <li>Versión inicial de los términos y condiciones</li>
                      <li>Implementación de políticas de privacidad según Ley 1581 de 2012</li>
                      <li>Inclusión de sección de propiedad intelectual</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Versión 1.1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex justify-between items-center"
                  onClick={() => toggleVersion('v1.1')}
                >
                  <span>Versión 1.1 (Actual)</span>
                  <span className="transform transition-transform duration-200"
                        style={{ transform: activeVersion === 'v1.1' ? 'rotate(180deg)' : '' }}>
                    ▼
                  </span>
                </button>
                {activeVersion === 'v1.1' && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                      <li>Actualización de políticas de tratamiento de datos</li>
                      <li>Clarificación de derechos de propiedad intelectual</li>
                      <li>Adición de resumen en lenguaje simple</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pie de página con contacto */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Para ejercer sus derechos de protección de datos personales o resolver dudas sobre estos términos, contáctenos en:
            </p>
            <a 
              href="mailto:contacto@ejemplo.com" 
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              contacto@ejemplo.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosUso;