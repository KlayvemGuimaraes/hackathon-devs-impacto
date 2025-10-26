/**
 * Core de IA - Integração Real com OpenAI
 * Sistema de recomendação de serviços públicos de saúde do Brasil
 */

import OpenAI from 'openai'
import { 
  publicHealthPrograms, 
  conditionToServicesMap,
  activityRecommendations,
  nutritionRecommendations 
} from '../data/public-health-services'
import { 
  saveConversation, 
  getUserProfile, 
  saveUserProfile,
  generateUserId 
} from '../lib/supabase'

// Inicializa OpenAI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Para desenvolvimento - em produção, usar backend
})

/**
 * System prompt para a IA
 */
const SYSTEM_PROMPT = `Você é um assistente de saúde especializado em serviços públicos de saúde do Brasil (SUS).

IMPORTANTE: Você tem acesso ao HISTÓRICO COMPLETO de conversas anteriores com este usuário. Use esse contexto para:
- Lembrar do nome do usuário
- Lembrar de condições de saúde mencionadas
- Acompanhar o progresso dele
- Dar recomendações progressivas

COMPORTAMENTO ESPERADO:
1. Se o usuário apenas cumprimenta ou se apresenta SEM mencionar problemas de saúde:
   - Cumprimente de volta de forma calorosa
   - Se já conversaram antes, mostre que você lembra (ex: "Olá [nome]! Como está o [problema mencionado antes]?")
   - Se é primeira vez, apresente-se e PERGUNTE sobre o que ele precisa
   - NÃO faça suposições sobre condições não mencionadas
   - NÃO recomende serviços sem entender a necessidade

2. Se o usuário pergunta algo relacionado a conversas anteriores:
   - Use o histórico para responder
   - Exemplo: Se ele pergunta "qual meu nome?", busque no histórico onde ele se apresentou
   - Mostre que você lembra do contexto

3. Se o usuário descreve uma situação de saúde específica:
   - Analise a situação dele
   - Considere o histórico para dar recomendações mais precisas
   - Identifique condições, fatores de risco e necessidades
   - Recomende serviços públicos apropriados
   - Crie um roadmap personalizado

PROGRAMAS PÚBLICOS DISPONÍVEIS:
- apoio_psicologico_ubs: Apoio Psicológico na UBS (PRIMEIRA OPÇÃO para ansiedade/tristeza leve)
- cvv: CVV 188 (24h, anônimo, para qualquer momento de tristeza/solidão)
- grupos_comunitarios_saude_mental: Grupos de apoio comunitários (prevenção, socialização)
- nasf: NASF com psicólogo (para casos moderados que precisam acompanhamento)
- caps: CAPS (APENAS casos graves: transtornos severos, crise aguda, risco de suicídio)
- academiadasaude: Programa Academia da Saúde (atividade física comunitária)
- pnan: PNAN (orientação nutricional)
- politicaatividadefisica: Políticas de Atividade Física (programas municipais)
- pnps: PNPS (abordagem integral de promoção da saúde)
- vigitel: VIGITEL (dados epidemiológicos)

IMPORTANTE SOBRE SAÚDE MENTAL:
- Tristeza passageira/estresse/ansiedade leve → apoio_psicologico_ubs, cvv, grupos_comunitarios
- Ansiedade/depressão moderada → nasf, apoio_psicologico_ubs
- Transtorno grave/crise/risco suicídio → caps
- NUNCA recomende CAPS para casos leves! É para situações graves apenas.

FORMATO DE RESPOSTA (JSON):

Para CUMPRIMENTOS/PERGUNTAS SIMPLES (sem problemas de saúde mencionados):
{
  "tipo_resposta": "cumprimento",
  "mensagem_humanizada": "Use o histórico para personalizar. Se já conversaram, mencione isso. Se ele pergunta o nome dele, responda baseado no histórico."
}

Para SITUAÇÕES DE SAÚDE ESPECÍFICAS (com problemas mencionados):
{
  "tipo_resposta": "analise_completa",
  "analise": {
    "condicoes_identificadas": ["array com condições detectadas, considerando histórico"],
    "nivel_urgencia": "baixo|medio|alto",
    "fatores_risco": ["array de fatores de risco"],
    "fatores_protetivos": ["array de fatores positivos"]
  },
  "servicos_recomendados": ["array de IDs dos programas apropriados"],
  "roadmap": {
    "curto_prazo": ["ações para próximas 2 semanas"],
    "medio_prazo": ["ações para próximos 1-3 meses"],
    "longo_prazo": ["ações para próximos 3-6 meses"]
  },
  "recomendacoes": {
    "atividade_fisica": "iniciante_sedentario|moderado|avancado|condicoes_cronicas (ou null)",
    "nutricao": "geral|sobrepeso_obesidade|diabetes|hipertensao|baixa_energia (ou null)",
    "saude_mental": "texto com recomendações (ou null)"
  },
  "mensagem_humanizada": "Mensagem personalizada considerando TODO o histórico anterior"
}

REGRAS CRÍTICAS:
- USE O HISTÓRICO! Se o usuário se apresentou antes, você sabe o nome dele
- NUNCA presuma condições não mencionadas no histórico
- SEMPRE personalize baseado nas conversas anteriores
- Se o usuário pergunta algo do passado (ex: "qual meu nome?"), responda usando o histórico
- Mostre continuidade: "Da última vez você mencionou X, como está isso?"
- Use linguagem acessível, empática e motivadora
- Sempre mencione que os serviços são gratuitos pelo SUS
- Incentive a procura pela UBS como primeiro passo
- Não substitua atendimento médico profissional
`

/**
 * Analisa o estado do usuário usando OpenAI e recomenda serviços públicos
 * @param {string} userInput - Descrição da situação do usuário
 * @param {Array} conversationHistory - Histórico de conversas (opcional)
 * @param {string} userId - ID do usuário (opcional, será gerado se não fornecido)
 * @returns {Promise<Object>} - Análise e recomendações
 */
export async function analyzeUserState(userInput, conversationHistory = [], userId = null) {
  try {
    // Gera ou recupera ID do usuário
    const currentUserId = userId || generateUserId()
    
    // Busca perfil do usuário no Supabase (se existir)
    const { data: userProfile } = await getUserProfile(currentUserId)
    
    // Adiciona contexto do perfil ao prompt se disponível
    let contextPrompt = ''
    if (userProfile && userProfile.health_conditions && userProfile.health_conditions.length > 0) {
      contextPrompt = `\n\nCONTEXTO DO USUÁRIO (de conversas anteriores):\n`
      contextPrompt += `Nome: ${userProfile.name || 'Não informado'}\n`
      contextPrompt += `Condições conhecidas: ${userProfile.health_conditions.join(', ')}\n`
      contextPrompt += `Use esse contexto para personalizar ainda mais sua resposta.`
    }

    // Prepara o contexto da conversa
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + contextPrompt
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userInput
      }
    ]

    // Chama OpenAI (usando gpt-4o que suporta JSON mode)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    // Parse da resposta
    const aiResponse = JSON.parse(response.choices[0].message.content)

    // Enriquece a resposta com dados dos programas
    const enrichedResponse = enrichWithProgramData(aiResponse)
    
    // Salva a conversa no Supabase
    await saveConversation(currentUserId, userInput, enrichedResponse)
    
    // Atualiza perfil do usuário se for uma análise completa
    if (enrichedResponse.tipo_resposta === 'analise_completa' && enrichedResponse.analise) {
      // Extrai nome do input se mencionado (regex simples)
      const nameMatch = userInput.match(/(?:meu nome (?:é|eh)|me chamo|sou) ([a-záàâãéèêíïóôõöúçñ]+)/i)
      const extractedName = nameMatch ? nameMatch[1] : userProfile?.name || null
      
      await saveUserProfile(currentUserId, {
        name: extractedName,
        health_conditions: enrichedResponse.analise.condicoes_identificadas || [],
        last_analysis: enrichedResponse
      })
    }

    return {
      success: true,
      timestamp: new Date().toISOString(),
      userId: currentUserId,
      ...enrichedResponse
    }

  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error)
    
    // Fallback em caso de erro
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      mensagem_humanizada: 'Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente em alguns instantes.',
      fallback: true
    }
  }
}

/**
 * Enriquece a resposta da IA com dados detalhados dos programas
 */
function enrichWithProgramData(aiResponse) {
  const enriched = { ...aiResponse }

  // Se for apenas cumprimento, não precisa enriquecer
  if (aiResponse.tipo_resposta === 'cumprimento') {
    return enriched
  }

  // Adiciona detalhes completos dos serviços recomendados
  if (aiResponse.servicos_recomendados && aiResponse.servicos_recomendados.length > 0) {
    enriched.servicos_detalhados = aiResponse.servicos_recomendados
      .map(serviceId => publicHealthPrograms[serviceId])
      .filter(Boolean)
  }

  // Adiciona recomendações detalhadas de atividade física
  if (aiResponse.recomendacoes?.atividade_fisica && aiResponse.recomendacoes.atividade_fisica !== 'null') {
    const activityProfile = activityRecommendations[aiResponse.recomendacoes.atividade_fisica]
    if (activityProfile) {
      enriched.recomendacoes.atividade_fisica_detalhada = activityProfile
    }
  }

  // Adiciona recomendações detalhadas de nutrição
  if (aiResponse.recomendacoes?.nutricao && aiResponse.recomendacoes.nutricao !== 'null') {
    const nutritionProfile = nutritionRecommendations[aiResponse.recomendacoes.nutricao]
    if (nutritionProfile) {
      enriched.recomendacoes.nutricao_detalhada = nutritionProfile
    }
  }

  return enriched
}

/**
 * Gera insights baseados em histórico de conversas
 */
export function generateInsights(history) {
  if (!history || history.length === 0) {
    return {
      patterns: [],
      recommendation: 'Continue compartilhando como você se sente para eu poder ajudar melhor com recomendações personalizadas de serviços públicos.',
    }
  }

  // Analisa padrões nas condições identificadas
  const allConditions = history
    .flatMap(h => h.analise?.condicoes_identificadas || [])
    .filter(Boolean)

  const conditionCounts = allConditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1
    return acc
  }, {})

  // Identifica serviços mais recomendados
  const allServices = history
    .flatMap(h => h.servicos_recomendados || [])
    .filter(Boolean)

  const serviceCounts = allServices.reduce((acc, service) => {
    acc[service] = (acc[service] || 0) + 1
    return acc
  }, {})

  const topService = Object.keys(serviceCounts).reduce((a, b) => 
    serviceCounts[a] > serviceCounts[b] ? a : b
  , '')

  const topServiceData = publicHealthPrograms[topService]

  return {
    patterns: [
      `Identifiquei ${history.length} interações recentes.`,
      allConditions.length > 0 ? `Principais questões: ${Object.keys(conditionCounts).slice(0, 3).join(', ')}` : '',
      topServiceData ? `Serviço mais recomendado: ${topServiceData.name}` : ''
    ].filter(Boolean),
    recommendation: topServiceData 
      ? `Baseado no seu perfil, sugiro priorizar o acesso ao ${topServiceData.name}. ${topServiceData.howToAccess}`
      : 'Continue compartilhando suas necessidades para recomendações mais precisas.',
    topService: topServiceData,
    totalInteractions: history.length,
  }
}

/**
 * Busca serviços públicos por condição
 */
export function findServicesByCondition(condition) {
  const serviceIds = conditionToServicesMap[condition] || []
  return serviceIds.map(id => publicHealthPrograms[id]).filter(Boolean)
}

/**
 * Busca serviço por categoria
 */
export function findServicesByCategory(category) {
  return Object.values(publicHealthPrograms).filter(
    program => program.category === category
  )
}

/**
 * Obtém todos os serviços disponíveis
 */
export function getAllServices() {
  return Object.values(publicHealthPrograms)
}

/**
 * Gera um resumo médico consolidado para dashboard profissional
 * @param {string} userId - ID do usuário
 * @param {Array} recentConversations - Últimas conversas
 * @returns {Promise<Object>} - Resumo médico estruturado
 */
export async function generateMedicalSummary(userId, recentConversations) {
  try {
    console.log(`📋 Gerando resumo para ${userId} com ${recentConversations.length} conversas`)
    
    // Prepara contexto das conversas
    const conversationsText = recentConversations
      .map(conv => `Paciente: ${conv.user_message}\nIA: ${conv.ai_response.mensagem_humanizada || ''}`)
      .join('\n\n')

    const summaryPrompt = `Você é um assistente médico. Analise as conversas abaixo e gere um RESUMO MÉDICO CONSOLIDADO para dashboard profissional.

⚠️ CRÍTICO: Este resumo reflete o ESTADO ATUAL (MAIS RECENTE) do paciente. 

REGRA DE PRIORIZAÇÃO:
- A ÚLTIMA mensagem tem PESO MÁXIMO
- Se a última mensagem indica piora → ATUALIZAR risco para moderado/alto
- Se a última mensagem indica melhora → REDUZIR risco para baixo/moderado
- NUNCA mantenha risco antigo se a situação mudou

ATENÇÃO ESPECIAL - RISCO DE SUICÍDIO:
- Se qualquer mensagem menciona suicídio/morte/desistir da vida → nivel_risco_geral: "alto"
- Se última mensagem indica "muito pior"/"piorando" → nivel_risco_geral: mínimo "moderado"
- Se última mensagem indica "melhor"/"feliz"/"bem" → nivel_risco_geral: "baixo"

CONVERSAS DO PACIENTE (da mais antiga para a mais recente):
${conversationsText}

Gere um resumo em JSON com:
{
  "paciente": {
    "nome": "Nome se mencionado, ou 'Não informado'",
    "idade_estimada": "Se mencionado, ou null"
  },
  "condicoes_identificadas": ["array de condições de saúde mencionadas"],
  "sintomas_relatados": ["array de sintomas DA ÚLTIMA MENSAGEM - estado atual!"],
  "medicamentos": ["se mencionou algum"],
  "nivel_risco_geral": "baixo|moderado|alto",
  "areas_atencao": {
    "fisica": "Resumo da situação física ATUAL (1 frase)",
    "nutricional": "Resumo da situação nutricional ATUAL (1 frase)",
    "mental": "Resumo do estado mental NA ÚLTIMA MENSAGEM (1 frase)"
  },
  "servicos_recomendados": ["IDs dos serviços - use cvv e caps se risco de suicídio"],
  "progresso": "Descreva MUDANÇAS observadas entre primeira e última mensagem",
  "alertas": ["Array de alertas ATUAIS - SE MENCIONOU SUICÍDIO, ALERTA CRÍTICO!"],
  "proximas_acoes": ["Array das 3 ações mais importantes AGORA"],
  "ultima_interacao": "Resumo EXATO da última mensagem em 1 frase"
}

EXEMPLOS DE NÍVEL DE RISCO:

"baixo": Paciente relata estar bem, feliz, melhorando
"moderado": Paciente relata tristeza, estresse, ansiedade, mas sem ideação suicida
"alto": Paciente menciona suicídio, morte, desistir, piora grave, crise

REGRAS CRÍTICAS:
- PRIORIZE ABSOLUTA A ÚLTIMA MENSAGEM para determinar risco
- Se última msg = suicídio → "alto" (sempre!)
- Se última msg = muito pior/piorando → mínimo "moderado"  
- Se última msg = melhor/feliz → "baixo"
- Use linguagem técnica clara
- Seja PRECISO no nível de risco - vidas dependem disso!`

    console.log(`🤖 [generateMedicalSummary] Chamando OpenAI para gerar resumo...`)

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é um assistente médico especializado em resumos clínicos.' },
        { role: 'user', content: summaryPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'json_object' }
    })
    
    const summary = JSON.parse(response.choices[0].message.content)
    
    // VALIDAÇÃO CRÍTICA DE RISCO - Garante classificação correta
    const textoCompleto = conversationsText.toLowerCase()
    
    // Palavras-chave por nível de risco
    const altaGravidade = ['suicid', 'me matar', 'quero morrer', 'desistir da vida', 'não quero mais viver', 'acabar com tudo']
    const moderadaGravidade = ['ansied', 'ansiosa', 'ansioso', 'deprim', 'depressão', 'pânico', 'não aguento', 'insônia', 'não durmo', 'muito triste', 'pior', 'piorando', 'difícil', 'sofrendo']
    const baixaGravidade = ['bem', 'melhor', 'feliz', 'satisfeito', 'ótimo', 'bom']
    
    console.log(`🔎 Checando palavras-chave em: "${textoCompleto.substring(0, 100)}..."`)
    
    const temRiscoAlto = altaGravidade.some(palavra => {
      const found = textoCompleto.includes(palavra)
      if (found) console.log(`   ✓ Encontrado: "${palavra}"`)
      return found
    })
    const temRiscoModerado = moderadaGravidade.some(palavra => textoCompleto.includes(palavra))
    const temMelhora = baixaGravidade.some(palavra => textoCompleto.includes(palavra))
    
    // Pega última mensagem para priorização
    const ultimaMensagem = recentConversations[recentConversations.length - 1]?.user_message?.toLowerCase() || ''
    const ultimaMsgTemAlto = altaGravidade.some(p => ultimaMensagem.includes(p))
    const ultimaMsgTemModerado = moderadaGravidade.some(p => ultimaMensagem.includes(p))
    const ultimaMsgTemBaixo = baixaGravidade.some(p => ultimaMensagem.includes(p))
    
    // DEBUG: Log da última mensagem e detecções
    console.log(`🔍 Última mensagem: "${ultimaMensagem.substring(0, 50)}..."`)
    console.log(`   Alto? ${ultimaMsgTemAlto} | Moderado? ${ultimaMsgTemModerado} | Baixo? ${ultimaMsgTemBaixo}`)
    
    // Lógica de validação e correção
    let riscoCorrigido = summary.nivel_risco_geral
    console.log(`📊 Risco inicial da IA: ${riscoCorrigido}`)
    
    // PRIORIDADE 1: Última mensagem tem peso máximo
    if (ultimaMsgTemAlto) {
      riscoCorrigido = 'alto'
      console.log('⚠️ Última mensagem indica ALTO RISCO')
    } else if (ultimaMsgTemModerado && (riscoCorrigido === 'baixo' || riscoCorrigido === 'alto')) {
      riscoCorrigido = 'moderado'
      console.log('⚠️ Última mensagem indica risco MODERADO')
    } else if (ultimaMsgTemBaixo && riscoCorrigido !== 'baixo') {
      // Permite redução de risco se última mensagem é positiva
      riscoCorrigido = 'baixo'
      console.log('✅ Última mensagem indica MELHORA - reduzindo risco')
    }
    
    // PRIORIDADE 2: Se alguma conversa menciona alto risco, adiciona flag histórico
    const historicoSuicidio = temRiscoAlto && !ultimaMsgTemAlto
    if (historicoSuicidio) {
      console.log('📋 Histórico de risco suicídio detectado (mantido em alerta)')
    }
    
    // PRIORIDADE 3: Se tem sintomas moderados e está marcado como baixo (sem melhora recente), corrige
    if (temRiscoModerado && riscoCorrigido === 'baixo' && !ultimaMsgTemBaixo) {
      riscoCorrigido = 'moderado'
      console.log('⚠️ Sintomas moderados detectados → MODERADO')
    }
    
    // Aplica correção se necessário
    if (riscoCorrigido !== summary.nivel_risco_geral) {
      console.log(`🔧 Corrigindo risco: ${summary.nivel_risco_geral} → ${riscoCorrigido}`)
      summary.nivel_risco_geral = riscoCorrigido
    }
    
    // Adiciona alertas apropriados
    if (!summary.alertas) summary.alertas = []
    
    // Alerta crítico para risco alto atual
    if (riscoCorrigido === 'alto' && !summary.alertas.some(a => a.toLowerCase().includes('crítico'))) {
      summary.alertas.unshift('🚨 ALERTA CRÍTICO: Ideação suicida ou sofrimento intenso - atendimento urgente necessário')
    }
    
    // Alerta de histórico de suicídio (mesmo que risco tenha diminuído)
    if (historicoSuicidio && !summary.alertas.some(a => a.toLowerCase().includes('histórico'))) {
      summary.alertas.push('⚠️ Histórico de ideação suicida - manter monitoramento e acompanhamento')
    }
    
    // Alerta para risco moderado
    if (riscoCorrigido === 'moderado' && !summary.alertas.some(a => a.toLowerCase().includes('acompanhamento'))) {
      summary.alertas.push('⚠️ Recomendado acompanhamento psicológico regular')
    }
    
    // Garante serviços apropriados ao nível de risco
    if (!summary.servicos_recomendados) summary.servicos_recomendados = []
    
    if (riscoCorrigido === 'alto') {
      if (!summary.servicos_recomendados.includes('caps')) {
        summary.servicos_recomendados.unshift('caps')
      }
      if (!summary.servicos_recomendados.includes('cvv')) {
        summary.servicos_recomendados.unshift('cvv')
      }
    }
    
    if (riscoCorrigido === 'moderado') {
      if (!summary.servicos_recomendados.includes('nasf')) {
        summary.servicos_recomendados.unshift('nasf')
      }
      if (!summary.servicos_recomendados.includes('apoio_psicologico_ubs')) {
        summary.servicos_recomendados.unshift('apoio_psicologico_ubs')
      }
    }
    
    console.log(`✅ Resumo validado: ${riscoCorrigido.toUpperCase()}`)

    return {
      success: true,
      summary: {
        ...summary,
        gerado_em: new Date().toISOString(),
        total_conversas: recentConversations.length
      }
    }

  } catch (error) {
    console.error('❌ [generateMedicalSummary] Erro ao gerar resumo médico:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
