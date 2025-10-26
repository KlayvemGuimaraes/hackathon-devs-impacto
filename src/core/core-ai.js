/**
 * Core de IA - Simulação Local
 * Analisa estado emocional e mental do usuário
 * Retorna sugestões preditivas de bem-estar
 */

// Base de conhecimento mockada
const moodKeywords = {
  ansioso: ['ansioso', 'preocupado', 'nervoso', 'tenso', 'estressado', 'inquieto'],
  triste: ['triste', 'deprimido', 'melancólico', 'desanimado', 'sozinho', 'vazio'],
  cansado: ['cansado', 'exausto', 'fatigado', 'esgotado', 'sem energia'],
  animado: ['feliz', 'animado', 'energético', 'bem', 'ótimo', 'excelente'],
  confuso: ['confuso', 'perdido', 'indeciso', 'incerto', 'dúvida'],
}

const suggestions = {
  ansioso: [
    {
      mood: 'ansioso',
      level: 'moderado',
      suggestion: 'Tente uma caminhada leve de 15 minutos e pratique respiração profunda (4-7-8).',
      activities: ['Caminhada leve', 'Respiração 4-7-8', 'Meditação guiada'],
      nutrition: 'Chá de camomila ou água com limão pode ajudar a acalmar.',
      exercise: 'Yoga ou alongamento suave por 10-15 minutos.',
    },
    {
      mood: 'ansioso',
      level: 'alto',
      suggestion: 'Faça uma pausa. Pratique mindfulness por 5 minutos e considere conversar com alguém de confiança.',
      activities: ['Mindfulness', 'Conversa com amigo', 'Journaling'],
      nutrition: 'Evite cafeína. Opte por alimentos ricos em magnésio (banana, abacate).',
      exercise: 'Exercício aeróbico leve (caminhada rápida) para liberar tensão.',
    },
  ],
  triste: [
    {
      mood: 'triste',
      level: 'moderado',
      suggestion: 'Permita-se sentir, mas também busque conexão. Ligue para um amigo ou faça uma atividade que goste.',
      activities: ['Ouvir música', 'Assistir algo leve', 'Sair de casa'],
      nutrition: 'Alimentos ricos em triptofano (banana, chocolate amargo) podem ajudar.',
      exercise: 'Exercício moderado (30min) aumenta endorfina e serotonina.',
    },
  ],
  cansado: [
    {
      mood: 'cansado',
      level: 'alto',
      suggestion: 'Seu corpo está pedindo descanso. Priorize 7-8h de sono e evite telas 1h antes de dormir.',
      activities: ['Descanso adequado', 'Leitura leve', 'Banho relaxante'],
      nutrition: 'Proteínas magras e carboidratos complexos. Evite açúcar refinado.',
      exercise: 'Apenas alongamento leve hoje. Recuperação é treino também.',
    },
  ],
  animado: [
    {
      mood: 'animado',
      level: 'bom',
      suggestion: 'Ótimo! Aproveite essa energia para fazer algo produtivo ou cuidar de você mesmo.',
      activities: ['Exercício intenso', 'Projeto criativo', 'Socialização'],
      nutrition: 'Mantenha alimentação balanceada para sustentar essa energia.',
      exercise: 'Treino de alta intensidade ou esporte que goste.',
    },
  ],
  confuso: [
    {
      mood: 'confuso',
      level: 'moderado',
      suggestion: 'Organize seus pensamentos. Escreva sobre o que está sentindo ou faça uma lista de prós e contras.',
      activities: ['Journaling', 'Meditação', 'Conversa reflexiva'],
      nutrition: 'Alimentos ricos em ômega-3 (peixes, nozes) ajudam na clareza mental.',
      exercise: 'Caminhada ao ar livre para clarear a mente.',
    },
  ],
}

/**
 * Analisa o prompt do usuário e retorna sugestões de bem-estar
 * @param {string} prompt - Mensagem do usuário
 * @returns {Promise<Object>} - Resposta da IA com sugestões
 */
export async function analyzeUserState(prompt) {
  // Simula delay de API (300-600ms)
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 300))

  const lowerPrompt = prompt.toLowerCase()
  
  // Detecta o humor baseado em keywords
  let detectedMood = 'neutro'
  let maxMatches = 0
  
  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    const matches = keywords.filter(keyword => lowerPrompt.includes(keyword)).length
    if (matches > maxMatches) {
      maxMatches = matches
      detectedMood = mood
    }
  }

  // Retorna sugestão baseada no humor detectado
  if (detectedMood !== 'neutro' && suggestions[detectedMood]) {
    const moodSuggestions = suggestions[detectedMood]
    const randomSuggestion = moodSuggestions[Math.floor(Math.random() * moodSuggestions.length)]
    
    return {
      success: true,
      ...randomSuggestion,
      timestamp: new Date().toISOString(),
      confidence: maxMatches > 0 ? 'alta' : 'média',
    }
  }

  // Resposta genérica se não detectar humor específico
  return {
    success: true,
    mood: 'neutro',
    level: 'normal',
    suggestion: 'Conte-me mais sobre como você está se sentindo. Estou aqui para ajudar você a cuidar do seu bem-estar.',
    activities: ['Reflexão', 'Auto-conhecimento', 'Mindfulness'],
    nutrition: 'Mantenha uma dieta balanceada com frutas, vegetais e proteínas.',
    exercise: 'Busque fazer pelo menos 30 minutos de atividade física moderada.',
    timestamp: new Date().toISOString(),
    confidence: 'média',
  }
}

/**
 * Gera insights baseados em histórico (mock)
 * @param {Array} history - Histórico de conversas
 * @returns {Object} - Insights e padrões identificados
 */
export function generateInsights(history) {
  if (!history || history.length === 0) {
    return {
      patterns: [],
      recommendation: 'Continue compartilhando como você se sente para eu poder ajudar melhor.',
    }
  }

  const moods = history.map(h => h.mood).filter(Boolean)
  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1
    return acc
  }, {})

  const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b
  , '')

  return {
    patterns: [
      `Você tem se sentido predominantemente ${dominantMood} recentemente.`,
      `Identifiquei ${history.length} interações nas últimas conversas.`,
    ],
    recommendation: `Baseado no seu padrão, sugiro manter foco em ${
      dominantMood === 'ansioso' ? 'técnicas de relaxamento' :
      dominantMood === 'triste' ? 'atividades sociais e exercícios' :
      dominantMood === 'cansado' ? 'qualidade do sono e nutrição' :
      'manter o equilíbrio atual'
    }.`,
    dominantMood,
    totalInteractions: history.length,
  }
}

export default {
  analyzeUserState,
  generateInsights,
}

