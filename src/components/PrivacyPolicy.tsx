//import React from 'react';
//import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Política de Privacidad
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Última actualización: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Resumen Simple */}
        <div className="p-6 bg-teal-50 dark:bg-teal-900/20 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Resumen Simple
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">
              Este documento explica:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
              <li>Cómo recopilamos y usamos su información personal</li>
              <li>Sus derechos según la Ley 1581 de 2012 de Protección de Datos</li>
              <li>Nuestras medidas de seguridad para proteger sus datos</li>
              <li>Cómo puede contactarnos sobre sus datos personales</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introducción */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              1. Introducción
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              La presente Política de Privacidad establece los términos en que [Nombre de tu Organización] 
              usa y protege la información que es proporcionada por sus usuarios al momento de utilizar 
              su plataforma educativa sobre VIH y enfermedades de transmisión sexual. Esta política 
              cumple con la Ley 1581 de 2012 de Protección de Datos Personales y el Decreto 1377 de 2013.
            </p>
          </div>

          {/* Responsable del Tratamiento */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              2. Responsable del Tratamiento
            </h2>
            <div className="text-gray-600 dark:text-gray-400 space-y-2">
              <p>[Nombre de tu Organización]</p>
              <p>NIT: [Tu NIT]</p>
              <p>Dirección: [Tu dirección]</p>
              <p>Ciudad: [Ciudad], Colombia</p>
              <p>Correo electrónico: [correo]</p>
              <p>Teléfono: [teléfono]</p>
            </div>
          </div>

          {/* Información Recopilada */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              3. Información Recopilada
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <p>Recopilamos información personal que puede incluir:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Nombre completo</li>
                <li>Información de contacto incluyendo correo electrónico</li>
                <li>Información demográfica</li>
                <li>Información médica relevante proporcionada voluntariamente</li>
              </ul>
            </div>
          </div>

          {/* Uso de la Información */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              4. Uso de la Información
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <p>La información recopilada se utiliza para:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Proporcionar servicios educativos personalizados</li>
                <li>Mejorar nuestros servicios y contenidos</li>
                <li>Enviar correos informativos</li>
                <li>Realizar estudios internos sobre salud pública (datos anonimizados)</li>
              </ul>
            </div>
          </div>

          {/* Derechos del Titular */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              5. Derechos del Titular
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <p>De acuerdo con la Ley 1581 de 2012, los usuarios tienen derecho a:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Conocer, actualizar y rectificar sus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Ser informado sobre el uso de sus datos personales</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                <li>Revocar la autorización y/o solicitar la supresión del dato</li>
              </ul>
            </div>
          </div>

          {/* Contacto */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              6. Contacto
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              <p>Para ejercer sus derechos o realizar consultas sobre esta política, puede contactarnos a:</p>
              <div className="mt-4">
                <p>Correo electrónico: [correo de contacto]</p>
                <p>Teléfono: [teléfono de contacto]</p>
                <p>Dirección: [dirección física]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;