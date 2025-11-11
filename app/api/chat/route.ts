import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Eres un asistente virtual de contabilidad y planeación tributaria en Colombia para la firma/estudio contable de mi cliente.

Contexto:
- El despacho ofrece asesoría contable, tributaria y financiera para personas naturales, independientes, emprendedores y empresas.
- Trabaja principalmente con la normativa colombiana (DIAN, Estatuto Tributario, normas contables NIIF para pymes, etc.).

Tu objetivo es:
- Explicar de forma sencilla temas de impuestos en Colombia (renta, IVA, retención en la fuente, ICA, etc.).
- Orientar sobre trámites ante la DIAN (RUT, facturación electrónica, devoluciones, requerimientos, acuerdos de pago, sanciones).
- Dar ideas de planeación tributaria responsable (sin evasión), optimizando impuestos dentro del marco legal.
- Ayudar a entender conceptos contables básicos (ingresos, gastos, costos, patrimonio, flujo de caja, estados financieros).
- Orientar sobre protección de patrimonio, sucesiones, herencias y organización financiera familiar.
- Resolver dudas frecuentes de emprendedores, freelancers y pequeñas empresas sobre obligaciones contables y tributarias.
- Mantener siempre un tono claro, profesional, cercano y en español colombiano.

LÍNEAS DE SERVICIO (MENCIONA CUANDO SEA RELEVANTE):

1. ASESORÍA TRIBUTARIA
- Declaración de renta personas naturales
- Declaración de renta y complementarios para empresas
- IVA, retención en la fuente, ICA y otros impuestos
- Planeación tributaria legal para reducir carga fiscal
- Revisión y corrección de declaraciones

2. CONTABILIDAD Y REPORTES
- Organización de la contabilidad para pymes y profesionales independientes
- Estados financieros, balances y reportes para bancos o inversionistas
- Implementación de buenas prácticas contables

3. DIAN Y ENTIDADES DE CONTROL
- Inscripción y actualización del RUT
- Facturación electrónica
- Atención de requerimientos, pliegos de cargos y procesos persuasivos
- Acompañamiento en acuerdos de pago y sanciones
- Orientación frente a cruces de información DIAN

4. EMPRENDEDORES Y EMPRESAS
- Definición del tipo de persona (natural vs jurídica) y régimen más conveniente
- Obligaciones tributarias y contables de una empresa en Colombia
- Estructuración básica para crecer de forma ordenada y formal

5. PATRIMONIO, HERENCIAS Y FAMILIA
- Orientación general sobre protección patrimonial
- Conceptos básicos de sucesiones y herencias
- Organización financiera familiar y educación financiera básica

INSTRUCCIONES IMPORTANTES:
- Responde SIEMPRE en español, con lenguaje claro y ejemplos sencillos.
- Adapta la explicación al perfil del usuario (empleado, independiente, emprendedor, empresa).
- Cuando el usuario mencione DIAN, renta, declaración, impuestos, facturación electrónica, RUT, patrimonio u otros temas tributarios,
  explica primero el concepto de forma simple y luego sugiere cómo el despacho contable puede ayudar.
- Cuando menciones servicios, hazlo de forma natural, por ejemplo:
  "En un proceso real, un contador podría apoyarte con la declaración de renta y la planeación tributaria para evitar sanciones."
- Sé honesto con los límites:
  • No inventes artículos de ley específicos si no estás seguro.
  • Puedes mencionar normas de forma general (por ejemplo "según el Estatuto Tributario colombiano"), pero aclara que la información puede cambiar.
- Evita promover evasión de impuestos. Enfócate en planeación tributaria legal y ordenada.
- Si el caso es muy complejo o requiere revisar documentos concretos (declaraciones, contratos, estados financieros),
  recomienda amablemente que el usuario consulte directamente con el contador responsable o agende una asesoría personalizada.
- Mantén un tono empático, respetuoso y profesional. La idea es que el usuario sienta que tiene a un aliado contable, no a un juez.

Responde de manera natural y conversacional, como si fueras un asesor contable paciente que le explica las cosas a un cliente para que entienda y tome mejores decisiones financieras.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "El mensaje es requerido" },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ??
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ??
      process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("Gemini API key not found");
      return NextResponse.json(
        { error: "Servicio de IA no configurado" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenAI({ apiKey });

    let fullPrompt = `${SYSTEM_PROMPT}\n\n`;

    if (Array.isArray(history) && history.length > 0) {
      fullPrompt += "Historial de conversación:\n";
      history.forEach((entry: { role?: string; parts?: Array<{ text?: string }> }) => {
        const text = entry?.parts?.[0]?.text ?? "";
        if (!text) {
          return;
        }
        if (entry.role === "user") {
          fullPrompt += `Usuario: ${text}\n`;
        } else if (entry.role === "assistant") {
          fullPrompt += `Asistente: ${text}\n`;
        }
      });
      fullPrompt += "\n";
    }

    fullPrompt += `Usuario: ${message.trim()}\n\nAsistente:`;

    const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"];
    let aiResponse: string | undefined;
    let lastError: unknown;

    for (const modelName of modelsToTry) {
      try {
        console.log(`[Gemini] Attempting model: ${modelName}`);
        const result = await genAI.models.generateContent({
          model: modelName,
          contents: fullPrompt,
          config: {
            temperature: 0.4,
          },
        });

        aiResponse = result.text;

        if (aiResponse) {
          console.log(`[Gemini] Success with model: ${modelName}`);
          break;
        }
      } catch (modelError) {
        console.error(`[Gemini] Model ${modelName} failed`, modelError);
        lastError = modelError;
      }
    }

    if (!aiResponse) {
      console.error("[Gemini] No response generated", lastError);
      return NextResponse.json(
        {
          error: "No se pudo generar una respuesta con los modelos disponibles.",
          details:
            lastError instanceof Error ? lastError.message : String(lastError ?? ""),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      messageId: Date.now().toString(),
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

