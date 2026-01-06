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
  {
    slug: "consejos-de-financiamiento-para-emprendedores",
    title: "Consejos de Financiamiento para Emprendedores",
    excerpt:
      "Descubre las mejores estrategias para financiar tu emprendimiento y llevar tu negocio al siguiente nivel. Aprende a elegir la opción adecuada para ti.",
    category: "Finanzas Empresariales",
    date: "2026-01-06",
    heroImage: "/photo2.jpg",
    heroImageAlt: "Estrategias de financiamiento",
    seoTitle:
      "Consejos de Financiamiento para Emprendedores | Yakelin Bustamante",
    seoDescription:
      "Guía práctica sobre financiamiento para emprendedores. Conoce tus opciones y aprende a gestionar los recursos de tu negocio con Yakelin Bustamante.",
    content: `Por: Yakelin Bustamante – Contadora y asesora financiera

Iniciar y hacer crecer un negocio requiere más que una buena idea; requiere recursos. El financiamiento es el combustible que permite que tu motor empresarial siga funcionando y acelerando. Pero, ¿cómo saber cuál es la mejor opción para ti?

Aquí te comparto algunos consejos clave para navegar el mundo del financiamiento empresarial.

⸻

## 1. Conoce tus Necesidades Reales

Antes de buscar dinero, define exactamente para qué lo necesitas.

*   ¿Es para capital de trabajo (operación diaria)?
*   ¿Para comprar activos fijos (maquinaria, equipos)?
*   ¿Para expansión o marketing?

Tener claridad sobre el destino de los fondos te ayudará a elegir el tipo de financiamiento adecuado y a convencer a posibles inversionistas o entidades financieras.

⸻

## 2. Explora Diversas Fuentes de Financiamiento

No te quedes con la primera opción. Existen múltiples alternativas:

*   **Bootstrapping:** Financiarte con tus propios ahorros y los ingresos del negocio. Ideal para etapas tempranas para mantener el control total.
*   **Préstamos Bancarios:** Tradicionales, pero requieren historial crediticio y garantías.
*   **Capital de Riesgo (Venture Capital):** Para startups con alto potencial de crecimiento, a cambio de una participación en la empresa.
*   **Ángeles Inversionistas:** Personas que invierten su propio dinero en etapas iniciales.
*   **Crowdfunding:** Recaudar pequeñas cantidades de muchas personas a través de internet.

Cada una tiene sus ventajas y costos. Investiga cuál se alinea mejor con tu etapa y modelo de negocio.

⸻

## 3. Mantén tu Contabilidad en Orden

Nadie prestará dinero a un negocio desorganizado.

Tener tus estados financieros al día (Balance General, Estado de Resultados, Flujo de Caja) es NO NEGOCIABLE. Esto demuestra profesionalismo, transparencia y capacidad de gestión. Como contadora, te digo: los números hablan por ti.

⸻

## 4. Cuida tu Historial Crediticio

Tanto el tuyo personal como el de tu empresa. Paga tus deudas a tiempo. Un buen puntaje de crédito te abre puertas a mejores tasas de interés y condiciones más favorables.

⸻

## 5. Ten un Plan de Negocios Sólido

Un plan de negocios no es solo un documento académico. Es tu hoja de ruta. Debe mostrar:

*   Tu modelo de ingresos.
*   Tu mercado objetivo.
*   Tu ventaja competitiva.
*   **Proyecciones financieras realistas.**

Demuestra cómo generarás el dinero para pagar el préstamo o dar retorno a la inversión.

⸻

## Conclusión

El financiamiento no es un fin en sí mismo, es un medio para alcanzar tus metas empresariales. Tómate el tiempo de analizar, comparar y preparar tu negocio para recibir esa inyección de capital.

¿Necesitas ayuda para organizar tus números y presentar un perfil financiero sólido? ¡Contáctame y trabajemos juntos en el crecimiento de tu empresa!`,
  },
  {
    slug: "dian-mas-fiel-que-tu-pareja",
    title: "Por qué la DIAN es más fiel que tu pareja (y otros secretos prohibidos)",
    excerpt:
      "Olvídate de revisar el celular de tu novio. Si quieres saber la verdad, revisa tu reporte de información exógena. Una dosis de realidad financiera con un toque de picante.",
    category: "Humor Financiero",
    date: "2026-01-07",
    heroImage: "/photo3.png",
    heroImageAlt: "Mujer de negocios sonriendo con picardía",
    seoTitle:
      "Por qué la DIAN es más fiel que tu pareja | Humor Financiero y Contable",
    seoDescription:
      "Un artículo diferente sobre impuestos. Descubre por qué el ente fiscal sabe más de tus 'movimientos' que nadie más y cómo evitar que esa relación se vuelva tóxica.",
    content: `Por: Yakelin Bustamante – Tu contadora de confianza (y confidente)

Seamos brutalmente honestos por un minuto. Todos buscamos lealtad, compromiso y alguien que recuerde las fechas importantes. Bueno, tengo noticias: **Esa persona no es tu pareja, es la DIAN.**

Sí, así como lo lees. Mientras tu "cuchurrumí" olvida vuestro aniversario, la administración de impuestos tiene marcadas en rojo sangre las fechas de tus vencimientos. Y créeme, si se te olvida a ti, ellos te lo recordarán. Con intereses.

Aquí van tres verdades incómodas (y un poco picantes) sobre tu vida financiera que quizás no querías leer, pero necesitas saber.

⸻

## 1. El mito de "Nadie se va a dar cuenta"

Ay, ternurita.

¿Recuerdas esa transferencia que hiciste a las 2:00 a.m. un sábado? ¿Ese "gasto de representación" que en realidad fue una escapada de fin de semana?

La DIAN lo sabe. La facturación electrónica no es solo para ahorrar papel; es el *Big Brother* fiscal. Saben qué comes, dónde duermes y con quién viajas (bueno, quizás no con quién, pero sí cuánto te costó).

**Moraleja:** No intentes esconderle cosas a quien tiene acceso a tus extractos bancarios. Es como intentar mentirle a tu mamá: inútil y peligroso.

⸻

## 2. Los recibos son las cartas de amor que no debes quemar

Está de moda el minimalismo, lo sé. "Suelta lo que te pesa", dicen los gurús.

Pero por el amor de Dios, **¡no sueltes los soportes de tus costos!**

Tirar una factura válida es como borrar los mensajes bonitos de tu ex: cuando te sientas solo (o en el caso fiscal, cuando te requieran), vas a desear tener pruebas de que eso realmente sucedió.

Sin soporte, no hay deducción. Y sin deducción, terminas pagando impuestos sobre dinero que ya te gastaste. Y eso, querido lector, duele más que un "tenemos que hablar".

⸻

## 3. La evasión es seductora, pero el divorcio sale caro

La idea de pagar menos "bajo cuerda" siempre coquetea. Es esa tentación de lo prohibido.

Pero como en toda aventura ilícita, el problema no es el placer momentáneo del ahorro, sino las consecuencias. Una sanción por inexactitud puede costarte hasta el 200% del impuesto.

¿Vale la pena arriesgar tu patrimonio (y tu paz mental) por una noche de pasión evasora? **Spoiler: No.**

⸻

## Una propuesta indecente

No te estoy pidiendo que ames pagar impuestos. Eso sería masoquismo, y aquí no juzgamos fetiches, pero mantengamos lo profesional.

Lo que te propongo es una relación abierta... y transparente.

1.  **Organiza tus papeles:** Que no te pillen mal parqueado.
2.  **Planea con anticipación:** El foreplay financiero es clave. No esperes al último día.
3.  **Busca una buena pareja:** Y por pareja, me refiero a una contadora que sepa qué hacer cuando las cosas se ponen calientes (fiscalmente hablando).

Si quieres que tu relación con el dinero pase de ser un "tóxico drama" a una "sólida historia de éxito", llámame.

Yo me encargo de los números sucios, para que tú disfrutes de las ganancias limpias. 😉`,
  },
  {
    slug: "el-dinero-nos-hizo-o-nosotros-al-dinero",
    title: "¿El dinero nos creó o nosotros a él? (Y por qué debería importarte)",
    excerpt:
      "La economía no es solo gente aburrida en trajes hablando de tasas de interés. Es la historia de cómo pasamos de buscar bayas a pedir taxis desde un reloj inteligente.",
    category: "Economía para No Economistas",
    date: "2026-01-08",
    heroImage: "/photo4.png",
    heroImageAlt: "Concepto abstracto de economía global",
    seoTitle:
      "Historia Económica del Mundo (Versión Picante) | Yakelin Bustamante",
    seoDescription:
      "5 lecciones de historia económica que explican por qué tu vida es como es. Especialización, innovación y por qué ser mamá sale tan caro.",
    content: `Por: Yakelin Bustamante – Traduciendo a "economista" al español real (basado en ideas de Andrew Leigh)

La economía tiene mala fama. Suena a señores aburridos en oficinas grises decidiendo por qué el tomate subió de precio.

Pero la verdad es que la economía decide **todo**: desde qué estudias, hasta con quién te casas (estadísticamente hablando) y cuánto tiempo vives. Es un baile eterno: la economía nos moldea y nosotros, con nuestros inventos locos y desesperación, la moldeamos a ella.

Aquí te dejo 5 "bocados" de realidad económica que explican el mundo, sin dormirte en el intento.

⸻

## 1. La Especialización: El síndrome de la Navaja Suiza inútil

Seamos honestos: la mayoría de nosotros no sabría ni coser un botón si nuestra vida dependiera de ello, mucho menos construir un iPhone o cultivar uvas para vino.

Y está bien. Porque si intentaras ser "más o menos bueno" en todo, terminarías siendo la versión humana de una navaja suiza barata: con unas tijeras que no cortan y un destornillador que no sirve.

La magia moderna es la **especialización**. Tú haces una cosa genial, yo hago otra cosa genial, y comerciamos.

¿Tu Boeing 787? Tiene piezas de Japón, Italia, Francia, Suecia... Es un rompecabezas global. Los países ricos no son los que "hacen todo", son los que hacen *lo que mejor saben hacer* y compran el resto.

⸻

## 2. Innovación: Cuando la luz era un lujo de millonarios

Dato para volar la cabeza: En la antigüedad, para tener **una hora** de luz artificial, tenías que trabajar **58 horas** recolectando leña.

Hoy, trabajas **menos de un segundo** para pagar esa misma hora de luz LED.

¿El resultado? Dejamos las luces prendidas porque es insultantemente barato. La tecnología no es solo "gadgets nuevos"; es lo que nos permitió dejar de morirnos por una muela infectada y empezar a vivir en rascacielos con aire acondicionado.

Si quieres culpar a alguien de tu comodidad, culpa a los innovadores.

⸻

## 3. Desigualdad: La escalera a la que le faltan peldaños

Aquí se pone seria la cosa (pero solo un poco).

Imagina una escalera. Si los peldaños están cerquita, es fácil subir. Si los peldaños están a dos metros uno del otro, buena suerte intentando trepar.

Eso es la desigualdad. En países como los escandinavos, la escalera es amigable; no importa mucho dónde naces, puedes subir. En lugares con brechas gigantes (hola, Latinoamérica y EE.UU.), si naces abajo, necesitas ser Spiderman para llegar arriba.

Y ojo: cuando los de arriba tienen demasiada torta, empiezan a comprar las reglas del juego (aka, influir en la política). No es envidia, es que una sociedad estática es una sociedad aburrida y peligrosa.

⸻

## 4. Los Mercados: El secreto de los 18 valientes

En 1978, en un pueblito de China llamado Xiaogang, 18 agricultores firmaron un contrato secreto. Bajo el comunismo de Mao, todos ganaban lo mismo trabajaran o no. Resultado: hambre. Nadie se esforzaba porque, ¿para qué?

Su pacto secreto fue simple: "Si trabajamos nuestra propia parcela, nos quedamos con lo que sobre después de la cuota".

¿Qué pasó? Produjeron en un año lo que antes producían en cinco. Los descubrieron, claro, pero en lugar de castigarlos, el gobierno (inteligentemente) dijo: "Oye, esto funciona". Y boom, China empezó a salir de la pobreza.

El mercado no es perfecto (a veces ignora al necesitado), pero como motor para producir cosas, es una bestia imparable.

⸻

## 5. Género: El impuesto a la maternidad

Las mujeres ganan menos. "Es que estudian menos", decían antes. Falso. Hoy las mujeres estudian más.

¿Entonces?

El problema real son los "trabajos codiciosos" (Greedy Jobs). Esos puestos de CEO o abogado top que te exigen estar disponible 24/7.

Cuando llegan los hijos, adivina quién suele dar un paso atrás. Exacto. La carrera de los hombres (sin hijos o con ellos) sigue recto hacia arriba. La de las mujeres madres se estanca o cae.

Esto no se arregla con discursos bonitos. Se arregla reestructurando el trabajo para que cuidar a un ser humano no sea un suicidio profesional.

⸻

**Resumen:** La economía no es solo dinero. Es cómo organizamos nuestra vida, nuestro tiempo y nuestro futuro. ¿Tú controlas tu economía o ella te controla a ti?`,
  },
  {
    slug: "lo-que-la-escuela-no-me-enseno-sobre-el-dinero",
    title: "Lo que la escuela NO me enseñó sobre el dinero (pero la vida sí)",
    excerpt:
      "Aprendí que la mitocondria es la central de energía de la célula, pero nadie me dijo qué hacer cuando llega la factura de la tarjeta de crédito. Hablemos de lo que debimos aprender en clase.",
    category: "Educación Financiera Real",
    date: "2026-01-09",
    heroImage: "/photo5.png",
    heroImageAlt: "Estudiante confundido con libros y dinero",
    seoTitle:
      "Lo que la escuela no me enseñó sobre el dinero | Yakelin Bustamante",
    seoDescription:
      "Presupuestos, crédito e inversión: las materias que faltaron en tu boletín de notas. Descubre las lecciones financieras que la vida te enseña a las malas.",
    content: `Por: Yakelin Bustamante – Tu profesora de finanzas (la que sí necesitabas)

Cuando pienso en mis años de colegio, recuerdo muchas cosas: cómo despejar la X, la fecha de la batalla de Boyacá y cómo escribir ensayos de cinco párrafos sobre el Renacimiento.

Pero hubo una materia que brilló por su ausencia. Una pequeña cosita sin importancia llamada: **¿CÓMO NO MORIR DE HAMBRE SIENDO ADULTO?** (o sea, Finanzas Personales).

Nunca tuve una clase de presupuestos. Nadie me explicó que las tarjetas de crédito no son dinero mágico de Monopoly. ¿Planificación para el retiro? Ja. Por favor.

Salí al mundo real perfectamente capacitada para analizar un poema, pero totalmente inútil para manejar mi propia billetera. Y sé que no estoy sola. He visto gente brillante, con posgrados y doctorados, que tiemblan ante un extracto bancario.

No es que no nos interesara. Es que nadie nos dio el mapa.

⸻

## Lo que la vida me enseñó (a punta de golpes)

Cuando empecé a trabajar y las facturas empezaron a llegar con mi nombre (qué miedo), me di cuenta de que la alfabetización financiera es más importante que saberse la tabla periódica. Aquí van mis lecciones aprendidas:

### 1. El Presupuesto es Libertad, no Cárcel

Mucha gente cree que hacer un presupuesto es ponerse a dieta de dinero. "No puedo comprar esto, no puedo ir allá".

¡Falso!

Saber a dónde se va tu dinero te da el superpoder de gastar **sin culpa**. Cuando sabes que ya cubriste lo importante, ese café o ese viaje se disfrutan el doble porque sabes que puedes pagarlos. Es tomar el control en lugar de dejar que el dinero te controle a ti.

### 2. El Crédito: Herramienta o Arma Mortal

El crédito no es un número abstracto para presumir. Es una llave.

Si la usas bien, te abre puertas (casa, carro, negocios). Si la usas mal (pagando el mínimo, comprando cosas que no necesitas), te cierra las puertas en la cara y te deja los dedos atrapados. Entender cómo funciona el interés es la diferencia entre que el banco trabaje para ti o tú trabajes para el banco.

### 3. Invertir no es solo para el Lobo de Wall Street

Nos vendieron la idea de que invertir es para gente con traje y millones en Suiza.

Mentira. Invertir es simplemente hacer que tu dinero tenga hijitos. Y entre más temprano empieces (así sea con poquito), más tiempo tienen esos hijitos para crecer. El interés compuesto es la octava maravilla del mundo, y no necesitas ser un genio para usarlo.

### 4. No se trata de cuánto ganas

Conozco gente que gana millones y está quebrada. Conozco gente que gana el mínimo y vive tranquila.

La planificación financiera no se trata de tener una bóveda llena de oro como Tío Rico McPato. Se trata de **hacer más con lo que tienes**. Necesitas mentalidad y estrategia, no un salario de seis cifras.

⸻

## ¿Por qué no nos enseñaron esto?

Sigo haciéndome esa pregunta. Quizás porque el dinero sigue siendo tabú. O porque el sistema educativo avanza a velocidad de tortuga coja.

Pero estamos en el mundo real. Y aquí, cada decisión financiera cuenta.

**Mi consejo:** Si te sientes perdido, no te preocupes. No vas tarde, solo estás empezando. La educación financiera es un viaje. Pregunta, lee, busca mentores. Nunca es tarde para reescribir tu historia con el dinero.

Y si necesitas ayuda para empezar, aquí estoy. Hagamos que el conocimiento financiero deje de ser un privilegio de pocos y sea un derecho de todos.`,
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

