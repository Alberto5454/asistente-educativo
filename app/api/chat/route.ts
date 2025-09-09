// Simulated knowledge base - in production this would query a real database
const knowledgeBase = [
  {
    id: "1",
    title: "Ecuaciones de primer grado",
    subject: "Matemáticas",
    grade: "3º ESO",
    content:
      "Una ecuación de primer grado es una igualdad algebraica que contiene una incógnita elevada a la primera potencia. Para resolverla, debemos despejar la incógnita aplicando las propiedades de las igualdades. Pasos: 1) Simplificar ambos miembros, 2) Agrupar términos semejantes, 3) Despejar la incógnita. Ejemplo: 2x + 5 = 13, entonces 2x = 13 - 5 = 8, por lo tanto x = 4.",
  },
  {
    id: "2",
    title: "La fotosíntesis",
    subject: "Ciencias Naturales",
    grade: "4º ESO",
    content:
      "La fotosíntesis es el proceso mediante el cual las plantas verdes y otros organismos transforman la energía lumínica en energía química. Este proceso ocurre en los cloroplastos y consta de dos fases: fase luminosa (en los tilacoides) donde se captura la luz solar y se produce ATP y NADPH, y fase oscura o ciclo de Calvin (en el estroma) donde se fija el CO2 para formar glucosa. Ecuación: 6CO2 + 6H2O + energía lumínica → C6H12O6 + 6O2.",
  },
  {
    id: "3",
    title: "Guerra Civil Española",
    subject: "Historia",
    grade: "2º Bachillerato",
    content:
      "La Guerra Civil Española (1936-1939) fue un conflicto bélico que enfrentó a dos bandos: el bando republicano (gobierno legítimo de la Segunda República) y el bando nacional (sublevados militares liderados por Franco). Causas: crisis política, tensiones sociales, polarización ideológica. Desarrollo: sublevación militar del 18 de julio de 1936, internacionalización del conflicto, batallas clave como Madrid, Guadalajara, Ebro. Consecuencias: victoria franquista, establecimiento de dictadura, exilio republicano.",
  },
  {
    id: "4",
    title: "Números racionales e irracionales",
    subject: "Matemáticas",
    grade: "3º ESO",
    content:
      "Los números racionales son aquellos que pueden expresarse como fracción a/b donde a y b son enteros y b≠0. Incluyen enteros, fracciones y decimales exactos o periódicos. Los números irracionales no pueden expresarse como fracción, tienen infinitas cifras decimales no periódicas. Ejemplos de racionales: 1/2, 0.75, -3. Ejemplos de irracionales: π, √2, e. El conjunto de números reales está formado por la unión de racionales e irracionales.",
  },
  {
    id: "5",
    title: "El Romanticismo",
    subject: "Lengua y Literatura",
    grade: "4º ESO",
    content:
      "El Romanticismo es un movimiento cultural y artístico del siglo XIX que se caracteriza por la exaltación del sentimiento, la imaginación y la individualidad. Características: libertad creativa, subjetivismo, nacionalismo, amor por la naturaleza, medievalismo. Autores españoles destacados: José de Espronceda, Gustavo Adolfo Bécquer, Rosalía de Castro. Temas frecuentes: el amor imposible, la muerte, la naturaleza, la patria, lo sobrenatural.",
  },
  {
    id: "6",
    title: "Reacciones químicas",
    subject: "Química",
    grade: "1º Bachillerato",
    content:
      "Una reacción química es un proceso en el que una o más sustancias (reactivos) se transforman en otras sustancias diferentes (productos). Se representa mediante ecuaciones químicas que deben estar equilibradas. Tipos: síntesis, descomposición, sustitución simple, doble sustitución. Factores que afectan la velocidad: temperatura, concentración, superficie de contacto, catalizadores. Ley de conservación de la masa: la masa total de reactivos es igual a la masa total de productos.",
  },
]

function searchKnowledgeBase(query: string) {
  const queryLower = query.toLowerCase()

  return knowledgeBase
    .filter(
      (item) =>
        item.title.toLowerCase().includes(queryLower) ||
        item.content.toLowerCase().includes(queryLower) ||
        item.subject.toLowerCase().includes(queryLower),
    )
    .slice(0, 3) // Return top 3 most relevant results
}

function generateEducationalResponse(message: string, relevantContent: any[]) {
  const messageLower = message.toLowerCase()

  // Respuestas específicas basadas en palabras clave
  if (messageLower.includes("ecuación") || messageLower.includes("matemática") || messageLower.includes("resolver")) {
    if (relevantContent.length > 0) {
      const mathContent = relevantContent.find((item) => item.subject === "Matemáticas")
      if (mathContent) {
        return `📚 **${mathContent.title}** (${mathContent.grade})\n\n${mathContent.content}\n\n💡 **Consejo**: Practica con varios ejercicios similares para dominar el método. ¿Necesitas que te explique algún paso específico?`
      }
    }
    return `🔢 **Matemáticas**\n\nPara resolver problemas matemáticos, es importante:\n1. Leer cuidadosamente el enunciado\n2. Identificar los datos conocidos\n3. Determinar qué se pide encontrar\n4. Aplicar las fórmulas correspondientes\n\n¿Podrías ser más específico sobre qué tipo de problema necesitas resolver?`
  }

  if (messageLower.includes("fotosíntesis") || messageLower.includes("planta") || messageLower.includes("biología")) {
    if (relevantContent.length > 0) {
      const bioContent = relevantContent.find((item) => item.subject === "Ciencias Naturales")
      if (bioContent) {
        return `🌱 **${bioContent.title}** (${bioContent.grade})\n\n${bioContent.content}\n\n🔬 **Dato curioso**: Sin la fotosíntesis no existiría vida en la Tierra tal como la conocemos. ¿Te gustaría saber más sobre alguna fase específica?`
      }
    }
  }

  if (messageLower.includes("guerra civil") || messageLower.includes("historia") || messageLower.includes("españa")) {
    if (relevantContent.length > 0) {
      const historyContent = relevantContent.find((item) => item.subject === "Historia")
      if (historyContent) {
        return `📜 **${historyContent.title}** (${historyContent.grade})\n\n${historyContent.content}\n\n📖 **Para estudiar**: Te recomiendo hacer una línea de tiempo con los eventos principales. ¿Necesitas ayuda con algún aspecto específico del conflicto?`
      }
    }
  }

  if (messageLower.includes("número") || messageLower.includes("racional") || messageLower.includes("irracional")) {
    if (relevantContent.length > 0) {
      const mathContent = relevantContent.find((item) => item.title.includes("racionales"))
      if (mathContent) {
        return `🔢 **${mathContent.title}** (${mathContent.grade})\n\n${mathContent.content}\n\n✨ **Truco**: Para identificar si un decimal es racional, fíjate si es exacto o periódico. ¿Quieres practicar con algunos ejemplos?`
      }
    }
  }

  if (
    messageLower.includes("romanticismo") ||
    messageLower.includes("literatura") ||
    messageLower.includes("bécquer")
  ) {
    if (relevantContent.length > 0) {
      const litContent = relevantContent.find((item) => item.subject === "Lengua y Literatura")
      if (litContent) {
        return `📚 **${litContent.title}** (${litContent.grade})\n\n${litContent.content}\n\n🎭 **Actividad**: Lee algunas rimas de Bécquer para entender mejor el estilo romántico. ¿Te interesa algún autor en particular?`
      }
    }
  }

  if (
    messageLower.includes("reacción") ||
    messageLower.includes("química") ||
    messageLower.includes("ecuación química")
  ) {
    if (relevantContent.length > 0) {
      const chemContent = relevantContent.find((item) => item.subject === "Química")
      if (chemContent) {
        return `⚗️ **${chemContent.title}** (${chemContent.grade})\n\n${chemContent.content}\n\n🧪 **Importante**: Siempre equilibra las ecuaciones químicas para cumplir la ley de conservación de la masa. ¿Necesitas ayuda equilibrando alguna ecuación específica?`
      }
    }
  }

  // Respuesta general si hay contenido relevante
  if (relevantContent.length > 0) {
    let response = "📚 **Información de nuestros libros oficiales:**\n\n"
    relevantContent.forEach((item, index) => {
      response += `**${index + 1}. ${item.title}** (${item.subject} - ${item.grade})\n${item.content}\n\n`
    })
    response += "💡 ¿Te gustaría que profundice en algún aspecto específico?"
    return response
  }

  // Respuestas de ayuda general
  const helpResponses = [
    "🤔 No encontré información específica sobre esa consulta en nuestros libros oficiales. ¿Podrías ser más específico sobre qué materia o tema necesitas ayuda?",
    "📖 Para ayudarte mejor, necesito más detalles. ¿Es sobre Matemáticas, Ciencias, Historia, Literatura o alguna otra materia?",
    "🎓 Estoy aquí para ayudarte con tus tareas basándome en los libros del centro. ¿Podrías reformular tu pregunta incluyendo la materia y el tema específico?",
    "💭 Parece que necesitas ayuda con algo específico. Te sugiero que menciones la asignatura y el concepto exacto que no entiendes.",
  ]

  return helpResponses[Math.floor(Math.random() * helpResponses.length)]
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return new Response("Message is required", { status: 400 })
    }

    // Search knowledge base for relevant content
    const relevantContent = searchKnowledgeBase(message)

    const response = generateEducationalResponse(message, relevantContent)

    return Response.json({
      response: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Error interno del servidor", { status: 500 })
  }
}
