import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase via variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validação: garante que as variáveis foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ ERRO: Variáveis de ambiente do Supabase não configuradas!\n' +
    'Verifique se o arquivo .env contém:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Salva uma conversa no banco de dados
 */
export async function saveConversation(userId, userMessage, aiResponse) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          user_id: userId,
          user_message: userMessage,
          ai_response: aiResponse, // JSONB já aceita objeto direto
          timestamp: new Date().toISOString(),
        }
      ])

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao salvar conversa:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Busca o histórico de conversas de um usuário
 */
export async function getUserConversations(userId, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Erro ao buscar conversas:', error)
    return { success: false, data: [], error: error.message }
  }
}

/**
 * Salva ou atualiza o perfil do usuário
 */
export async function saveUserProfile(userId, profile) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          user_id: userId,
          name: profile.name,
          health_conditions: profile.health_conditions || [],
          last_analysis: profile.last_analysis || null,
          updated_at: new Date().toISOString(),
        }
      ])

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Busca o perfil de um usuário
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = not found
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Gera um ID único para usuário (pode ser usado em sessão anônima)
 */
export function generateUserId() {
  // Verifica se já existe um ID no localStorage
  let userId = localStorage.getItem('bem_estar_user_id')
  
  if (!userId) {
    // Gera um novo ID único
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('bem_estar_user_id', userId)
  }
  
  return userId
}

/**
 * Salva ou atualiza o resumo médico do usuário
 */
export async function updateMedicalSummary(userId, summary) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        medical_summary: summary,
        summary_updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()

    if (error) throw error
    
    console.log(`✅ Resumo salvo no banco`)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Erro ao atualizar resumo médico:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Busca o resumo médico de um usuário
 */
export async function getMedicalSummary(userId) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('medical_summary, summary_updated_at, name')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: data || null }
  } catch (error) {
    console.error('Erro ao buscar resumo médico:', error)
    return { success: false, data: null, error: error.message }
  }
}

/**
 * Lista todos os resumos médicos (para dashboard de profissionais)
 */
export async function getAllMedicalSummaries(limit = 50) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('user_id, name, medical_summary, summary_updated_at, health_conditions')
      .not('medical_summary', 'is', null)
      .order('summary_updated_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    
    return { success: true, data: data || [] }
  } catch (error) {
    console.error('❌ Erro ao listar resumos:', error)
    return { success: false, data: [], error: error.message }
  }
}

export default {
  supabase,
  saveConversation,
  getUserConversations,
  saveUserProfile,
  getUserProfile,
  generateUserId,
  updateMedicalSummary,
  getMedicalSummary,
  getAllMedicalSummaries,
}

