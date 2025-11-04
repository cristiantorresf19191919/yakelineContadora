export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  heroImage: string;
  heroImageAlt: string;
  content: string; // Markdown or HTML content
  contentImages?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    fullWidth?: boolean;
  }>;
  seoTitle?: string;
  seoDescription?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "cambia-el-chip-del-gasto-tu-mente-es-tu-mejor-cuenta-de-ahorros",
    title: "Cambia el chip del gasto: tu mente es tu mejor cuenta de ahorros",
    excerpt:
      "¿Te ha pasado que llega el día de pago… y a los pocos días el dinero desaparece como si nunca hubiera existido? No es solo un tema de ingresos, muchas veces es un tema de hábitos, emociones y decisiones automáticas.",
    category: "Finanzas Personales",
    date: "2025-11-04",
    heroImage: "/photo1.jpg",
    heroImageAlt: "Asesora contable profesional",
    seoTitle:
      "Cambia el chip del gasto: tu mente es tu mejor cuenta de ahorros | Yakelin Bustamante",
    seoDescription:
      "Aprende cómo cambiar tus hábitos financieros y ahorrar más cambiando primero tu mente y luego tus números. Guía práctica de una contadora con más de 10 años de experiencia.",
    content: `Por: Yakelin Bustamante – Contadora y asesora financiera

¿Te ha pasado que llega el día de pago… y a los pocos días el dinero desaparece como si nunca hubiera existido? No es solo un tema de ingresos, muchas veces es un tema de hábitos, emociones y decisiones automáticas.

Hoy quiero contarte, como contadora, pero también como ser humano que también ha peleado con sus propios gastos, cómo ahorrar más cambiando primero tu mente y luego tus números.

⸻

## 1. El dinero no se va solo: tú lo estás despidiendo

Suena duro, pero es la verdad: el dinero no "se va", lo mandamos a irse con cada decisión.

• El café diario "inofensivo".
• El domicilio "porque me da pereza cocinar".
• Las compras por impulso "porque estaba en promoción".

Cada uno, solito, parece poco. Pero juntos son como muchas goteras en el techo: al principio no se nota, hasta que un día te das cuenta de que estás empapado de deudas y sin ahorros.

**Cambio de chip:**

Antes de comprar pregúntate:

"¿Quiero esto… o quiero mi tranquilidad financiera dentro de 6 meses?"

No es "no puedo gastar", es:

"Estoy decidiendo a quién le doy prioridad: a este gusto inmediato o a mi yo del futuro".

⸻

## 2. Presupuesto: no es una cárcel, es tu mapa de libertad

Mucha gente cree que hacer presupuesto es vivir amarrado.

En realidad es al revés: el presupuesto te da permiso de gastar sin culpa.

Piensa en el presupuesto como el mapa de Google Maps:

• No te prohíbe viajar.
• Solo te muestra la mejor ruta para llegar sin perderte.

**Tip práctico:**

Divide tu dinero mensual así (porcentajes aproximados, los adaptamos en una asesoría):

• 50–60%: gastos fijos (arriendo, servicios, mercado básico, transporte).
• 10–20%: ahorro e inversión (esto va primero, no al final).
• 10–20%: ocio y gustos (salidas, pedidos, ropa, etc.).
• Lo que quede: deudas y metas específicas (estudios, proyectos, viajes).

Cuando le das a cada peso una "tarea", dejas de preguntar "¿en qué se fue el dinero?" y pasas a "sé exactamente a dónde fue cada peso".

⸻

## 3. Psicología del consumo: ¿estás comprando cosas o emociones?

La mayoría de las veces no compramos objetos, compramos emociones:

• Compras ropa para sentirte más seguro.
• Compras un celular para sentirte actualizado o aceptado.
• Compras comida rápida para sentir alivio después de un día pesado.

El problema no es darse gustos. El problema es cuando esos gustos se vuelven la única forma de sentirte bien, y tu bolsillo paga el precio.

**Ejercicio sencillo:**

La próxima vez que quieras comprar algo, pregúntate honestamente:

1. ¿Qué emoción estoy buscando?
• Alegría, alivio, sentirme valorado, sentirme menos solo, etc.

2. ¿Hay otra forma más barata de sentir eso mismo?
• Llamar a un amigo
• Salir a caminar
• Escuchar música
• Hacer ejercicio
• Prepararte algo rico en casa

Cuando entiendes la emoción detrás del gasto, recuperas el control.

⸻

## 4. El truco del "ahorro invisible": que el dinero se vaya antes de que lo veas

Uno de los mejores tips que aplico con mis clientes es el ahorro automático.

En lugar de pensar:

"Si me sobra algo a fin de mes, lo ahorro"

Cambiamos el orden a:

"Primero ahorro, y luego organizo mi mes con lo que queda"

**¿Cómo se hace?**

• Apenas recibas el pago, programa una transferencia automática a:
• Una cuenta separada de ahorro
• Un CDT
• Un fondo de inversión (según el caso)

La idea es simple:

Si no lo ves todos los días, no lo gastas todos los días.

Es como esconder el chocolate si estás a dieta: no se trata de prohibirte, se trata de no tener la tentación en la mano todo el tiempo.

⸻

## 5. Cambia la frase: de "no me alcanza" a "esto no es prioridad ahora"

El lenguaje que usamos con el dinero moldea nuestra mente.

• "Soy malo con el dinero"
• "Nunca me alcanza"
• "Eso es solo para gente con plata"

Estas frases te bloquean. Te pones una etiqueta encima y tu cerebro actúa como si fuera verdad.

Cambia por:

• "Estoy aprendiendo a manejar mejor mi dinero"
• "Mi prioridad ahora es ahorrar para X"
• "No lo voy a comprar por ahora, porque tengo otra meta más importante"

No es autoayuda vacía: es entrenamiento mental.

Si cambias el discurso, empiezas a cambiar las decisiones.

⸻

## 6. Mini-plan de 30 días para cambiar tu relación con el dinero

Te dejo un reto sencillo, pero muy poderoso:

**Semana 1 – Observa sin juzgar**

• Escribe TODO lo que gastas, sin filtro.
• No te regañes, solo míralo como si fueras un científico revisando datos.

**Semana 2 – Recorta lo que NO te aporta**

• Señala en tu lista los gastos que no te dieron verdadera satisfacción.
• Elimina o reduce esos gastos para la siguiente semana.

**Semana 3 – Ahorro automático**

• Define un monto fijo para ahorro (aunque sea pequeño).
• Programa una transferencia automática al inicio del mes o de la quincena.

**Semana 4 – Recompensa inteligente**

• Elige una pequeña recompensa financiada con el dinero que ahorraste de los gastos absurdos.
• Eso le enseña a tu cerebro: "Ahorrar también trae placer".

⸻

## 7. No necesitas ser millonario para tener paz financiera

La paz financiera no empieza cuando ganas millones.

Empieza cuando sabes:

• Cuánto ganas
• Cuánto gastas
• En qué lo gastas
• Y qué estás construyendo con cada mes que pasa

Tus hábitos valen más que tu sueldo. Un mal hábito se come cualquier ingreso.

Un buen hábito multiplica incluso un salario normal.

⸻

## ¿Te acompañamos a organizar tu mente y tus números?

Si sientes que:

• El dinero se te va sin saber cómo
• Nunca has hecho un presupuesto en serio
• Quieres ahorrar, pero siempre terminas gastando todo
• Te gustaría que alguien te guíe paso a paso

Estoy aquí para ayudarte.

Soy Yakelin Bustamante, contadora y asesora financiera, y mi trabajo es unir números + psicología para que tomes decisiones más conscientes y logres una vida financiera más tranquila y ordenada.

👉 Si quieres asesorías financieras personalizadas, contáctame y empezamos a trabajar en tu plan.

Tu futuro financiero no se arregla solo… pero con un buen plan, sí se hace mucho más fácil.`,
  },
];

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}

export function getAllBlogArticles(): BlogArticle[] {
  return blogArticles.sort((a, b) => {
    // Sort by date descending (newest first)
    return b.date.localeCompare(a.date);
  });
}

export function getSuggestedArticles(
  currentSlug: string,
  count: number = 3
): BlogArticle[] {
  return blogArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, count);
}

