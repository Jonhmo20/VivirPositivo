//import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#3BACA3] mb-8">
        Política de Privacidad
      </h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            1. Introducción
          </h2>
          <p>
            La presente Política de Privacidad establece los términos en que [Nombre de tu Organización] 
            usa y protege la información que es proporcionada por sus usuarios al momento de utilizar 
            su plataforma educativa sobre VIH y enfermedades de transmisión sexual. Esta política 
            cumple con la Ley 1581 de 2012 de Protección de Datos Personales y el Decreto 1377 de 2013.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            2. Responsable del Tratamiento
          </h2>
          <p>
            [Nombre de tu Organización]<br />
            NIT: [Tu NIT]<br />
            Dirección: [Tu dirección]<br />
            Ciudad: [Ciudad], Colombia<br />
            Correo electrónico: [correo]<br />
            Teléfono: [teléfono]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            3. Información Recopilada
          </h2>
          <p>
            Recopilamos información personal que puede incluir:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Nombre completo</li>
            <li>Información de contacto incluyendo correo electrónico</li>
            <li>Información demográfica</li>
            <li>Información médica relevante proporcionada voluntariamente</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            4. Uso de la Información
          </h2>
          <p>
            La información recopilada se utiliza para:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Proporcionar servicios educativos personalizados</li>
            <li>Mejorar nuestros servicios y contenidos</li>
            <li>Enviar correos informativos</li>
            <li>Realizar estudios internos sobre salud pública (datos anonimizados)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            5. Derechos del Titular
          </h2>
          <p>
            De acuerdo con la Ley 1581 de 2012, los usuarios tienen derecho a:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Conocer, actualizar y rectificar sus datos personales</li>
            <li>Solicitar prueba de la autorización otorgada</li>
            <li>Ser informado sobre el uso de sus datos personales</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
            <li>Revocar la autorización y/o solicitar la supresión del dato</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            6. Seguridad de la Información
          </h2>
          <p>
            Estamos comprometidos con la seguridad de la información de nuestros usuarios. 
            Seguimos estándares de la industria para proteger la información personal, 
            incluyendo encriptación de datos sensibles y protocolos de seguridad SSL.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            7. Menores de Edad
          </h2>
          <p>
            El tratamiento de datos personales de menores de edad se realiza respetando 
            sus derechos fundamentales y únicamente con el consentimiento de sus 
            representantes legales, de acuerdo con la normativa vigente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            8. Cambios en la Política
          </h2>
          <p>
            Nos reservamos el derecho de modificar esta política en cualquier momento. 
            Cualquier cambio será informado y publicado en esta página.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#4A90B6] mb-4">
            9. Contacto
          </h2>
          <p>
            Para ejercer sus derechos o realizar consultas sobre esta política, puede contactarnos a:
          </p>
          <p className="mt-2">
            Correo electrónico: [correo de contacto]<br />
            Teléfono: [teléfono de contacto]<br />
            Dirección: [dirección física]
          </p>
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <p>
            Última actualización: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;