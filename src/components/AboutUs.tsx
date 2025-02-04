import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-3xl font-extrabold text-[#3BACA3] sm:text-4xl">
          Sobre Nosotros
        </h2>

        {/* Introducción */}
        <p className="mt-4 text-lg text-gray-600">
          En <strong>Vivir Positivo</strong>, nos dedicamos a proporcionar una plataforma digital accesible y confiable que ofrezca información, apoyo psicológico y herramientas educativas a personas que viven con VIH, otras enfermedades de transmisión sexual, o están en riesgo de contraerlas.
        </p>

        {/* Misión */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-[#4A90B6]">Nuestra Misión</h3>
          <p className="mt-2 text-gray-600">
            Nuestra misión es reducir el estigma, promover la prevención y mejorar la calidad de vida de nuestros usuarios a través de contenido profesional, asesoramiento especializado y una comunidad de apoyo.
          </p>
        </div>

        {/* Visión */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-[#4A90B6]">Nuestra Visión</h3>
          <p className="mt-2 text-gray-600">
            Ser reconocidos como un recurso esencial en la lucha contra el VIH y otras enfermedades de transmisión sexual en América Latina, contribuyendo al objetivo global de la OMS de erradicar el VIH como una amenaza de salud pública para 2030.
          </p>
        </div>

        {/* Objetivos */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-[#4A90B6]">Nuestros Objetivos</h3>
          <ul className="mt-2 text-gray-600 list-disc list-inside text-left max-w-2xl mx-auto">
            <li>
              <strong>Concientización y Educación:</strong> Crear blogs y cápsulas informativas que aborden temas clave sobre la prevención, tratamiento y manejo del VIH y otras ETS.
            </li>
            <li>
              <strong>Apoyo Psicológico:</strong> Implementar un sistema de preguntas y respuestas con psicólogos especializados.
            </li>
            <li>
              <strong>Innovación Tecnológica:</strong> Desarrollar una plataforma interactiva con las mejores prácticas de UX/UI.
            </li>
            <li>
              <strong>Interdisciplinariedad:</strong> Involucrar a profesionales de diversas disciplinas para ofrecer un enfoque integral.
            </li>
            <li>
              <strong>Alineación con Metas Globales:</strong> Contribuir a la meta de la OMS de erradicar el VIH como amenaza para 2030.
            </li>
          </ul>
        </div>

        {/* Justificación */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-[#4A90B6]">¿Por qué este proyecto?</h3>
          <p className="mt-2 text-gray-600">
            El VIH y otras ETS siguen siendo un desafío global, especialmente en regiones con acceso limitado a información y apoyo. <strong>Vivir Positivo</strong> aborda esta necesidad crítica al proporcionar un recurso confiable y accesible para quienes más lo necesitan, ayudando a reducir el estigma y promoviendo la aceptación.
          </p>
        </div>

        {/* Llamado a la acción */}
        <div className="mt-10">
          <p className="text-lg text-gray-600">
            Únete a nosotros en esta misión. Explora nuestra información, comparte nuestro contenido y ayúdanos a crear un mundo más informado.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#3BACA3] hover:bg-[#4A90B6] transition-colors duration-300"
            >
              Explora más
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;