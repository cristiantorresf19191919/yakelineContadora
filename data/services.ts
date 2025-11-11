export interface Service {
  id: string;
  name: string;
  summary: string;
  whatsappPrompt: string;
  keywords: string[];
}

export const services: Service[] = [
  {
    id: "declaracion-renta-personas",
    name: "Declaración de renta para personas naturales",
    summary:
      "Te acompañamos a revisar ingresos, deducciones y beneficios para presentar tu declaración sin sobresaltos.",
    whatsappPrompt:
      "Hola Yakeline, necesito apoyo con mi declaración de renta personal. Mi situación: {userMessage}. ¿Podemos agendar una asesoría?",
    keywords: [
      "renta",
      "declaración",
      "personas naturales",
      "ingresos",
      "deducciones",
      "retención",
    ],
  },
  {
    id: "planeacion-tributaria",
    name: "Planeación tributaria integral",
    summary:
      "Identificamos oportunidades legales para optimizar tus impuestos y evitar sanciones.",
    whatsappPrompt:
      "Hola Yakeline, me interesa una planeación tributaria integral. Esto es lo que necesito: {userMessage}. ¿Cómo podemos avanzar?",
    keywords: [
      "planeación",
      "impuesto",
      "tributaria",
      "optimizar",
      "beneficios",
      "deducciones",
    ],
  },
  {
    id: "facturacion-electronica",
    name: "Implementación de facturación electrónica",
    summary:
      "Configuramos y resolvemos las dudas sobre el sistema de facturación electrónica ante la DIAN.",
    whatsappPrompt:
      "Hola Yakeline, quiero implementar o mejorar mi facturación electrónica. Contexto: {userMessage}. ¿Me ayudas?",
    keywords: [
      "facturación",
      "electrónica",
      "dian",
      "factura",
      "habilitación",
      "software",
    ],
  },
  {
    id: "contabilidad-pymes",
    name: "Contabilidad completa para pymes",
    summary:
      "Organizamos tus libros, estados financieros y reportes para que tomes decisiones con claridad.",
    whatsappPrompt:
      "Hola Yakeline, busco un servicio de contabilidad para mi empresa. Esto es lo que necesito: {userMessage}.",
    keywords: [
      "contabilidad",
      "pyme",
      "estados financieros",
      "balance",
      "libros",
      "reportes",
    ],
  },
  {
    id: "requerimientos-dian",
    name: "Atención de requerimientos DIAN",
    summary:
      "Te guiamos paso a paso para responder requerimientos, pliegos o acuerdos de pago con la DIAN.",
    whatsappPrompt:
      "Hola Yakeline, recibí un requerimiento de la DIAN. Detalles: {userMessage}. Necesito orientación.",
    keywords: [
      "requerimiento",
      "pliego",
      "acuerdo",
      "dian",
      "sanción",
      "oficio",
    ],
  },
];

