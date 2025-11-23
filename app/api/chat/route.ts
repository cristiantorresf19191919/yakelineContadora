import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Eres Yakeline Bot, asistente virtual de contabilidad y planeación tributaria en Colombia. Eres profesional, amable, con humor colombiano de doble sentido (chistoso pero respetuoso) y muy humana.

SERVICIOS: Asesoría tributaria, contabilidad, trámites DIAN, apoyo a emprendedores y pymes, patrimonio y herencias.

TONO Y ESTILO:
- Habla como una amiga contadora colombiana: cercana, empática y con buen humor 😊
- Usa humor de doble sentido colombiano (chistoso pero profesional, nada vulgar) 💜
- Usa emoticones con moderación para darle calidez a tus respuestas (😊 💼 📊 💰 🎯 ✨ 🔥)
- Sé breve y directa. Explica conceptos complejos de forma simple.
- Cuando sea relevante, menciona los servicios del despacho de forma natural.
- Puedes usar UNO que otro dicho o frase chistosa ocasionalmente, pero no abuses.

REGLAS:
- Responde SIEMPRE en español colombiano (pero NO uses "parce" ni expresiones muy callejeras).
- No inventes artículos de ley específicos. Menciona normas en general y aclara que pueden cambiar.
- Si el caso es muy complejo, recomienda agendar asesoría personalizada.
- NUNCA promuevas evasión de impuestos. Solo planeación tributaria legal.
- Mantén el equilibrio: profesional pero con personalidad colombiana cálida y chistosa.

Sé esa contadora que todos quieren tener: que te explica las cosas claras, te hace reír con doble sentido inteligente y te ayuda a no meter la pata con la DIAN 😉💼`;

const getApiKey = () => {
  return (
    process.env.GEMINI_API_KEY ??
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ??
    process.env.GOOGLE_API_KEY ??
    ""
  );
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "El mensaje es requerido." },
        { status: 400 }
      );
    }

    const apiKey = getApiKey();

    if (!apiKey) {
      console.error("Gemini API key not found");
      return NextResponse.json(
        { error: "Servicio de IA no configurado" },
        { status: 500 }
      );
    }

    try {
      // Inicializar Gemini
      const genAI = new GoogleGenAI({ apiKey });

      // Construir prompt completo
      let fullPrompt = `${SYSTEM_PROMPT}\n\n`;

      if (Array.isArray(history) && history.length > 0) {
        fullPrompt += "Historial de conversación:\n";
        history.forEach((msg: { role?: string; parts?: Array<{ text?: string }> }) => {
          const text = msg?.parts?.[0]?.text || "";
          if (!text) {
            return;
          }
          if (msg.role === "user") {
            fullPrompt += `Usuario: ${text}\n`;
          } else if (msg.role === "assistant") {
            fullPrompt += `Asistente: ${text}\n`;
          }
        });
        fullPrompt += "\n";
      }

      fullPrompt += `Usuario: ${message.trim()}\n\nAsistente:`;

      // Usar solo el modelo disponible (gemini-2.0-flash)
      const modelsToTry = ["gemini-2.0-flash"];
      let result;
      let aiResponse = "";

      for (const modelName of modelsToTry) {
        try {
          console.log(`Attempting to use model: ${modelName}`);
          result = await genAI.models.generateContent({
            model: modelName,
            contents: fullPrompt,
          });

          aiResponse = result?.text || "";

          if (aiResponse) {
            console.log(`Successfully generated response using ${modelName}`);
            break;
          }
        } catch (modelError: unknown) {
          const modelErrorMessage =
            (modelError as { message?: string })?.message ?? String(modelError);
          console.log(`Model ${modelName} failed:`, modelErrorMessage);
          if (modelName === modelsToTry[modelsToTry.length - 1]) {
            throw modelError;
          }
          continue;
        }
      }

      if (!aiResponse) {
        throw new Error(
          "No se pudo generar una respuesta con ningún modelo disponible."
        );
      }

      return NextResponse.json({
        response: aiResponse,
        timestamp: new Date().toISOString(),
        messageId: Date.now().toString(),
      });
    } catch (geminiError: unknown) {
      console.error("Gemini API error:", geminiError);
      try {
        console.error("Error details:", JSON.stringify(geminiError, null, 2));
      } catch {
        // Ignore JSON stringify failures
      }

      const errorMessage =
        (geminiError as { message?: string })?.message ||
        String(geminiError) ||
        "Error desconocido";

      return NextResponse.json(
        {
          error: "Error al procesar tu mensaje. Por favor, intenta de nuevo.",
          details: errorMessage,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

