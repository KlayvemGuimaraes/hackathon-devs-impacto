// Test script para verificar se as variáveis de ambiente estão sendo carregadas
console.log('🔍 Testando carregamento de variáveis de ambiente...\n')

// Simula o que o Vite faz
import { config } from 'dotenv'
config()

const envVars = {
  OPENAI: process.env.VITE_OPENAI_API_KEY,
  SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_ANON: process.env.VITE_SUPABASE_ANON_KEY
}

console.log('Variáveis encontradas:')
console.log(`- VITE_OPENAI_API_KEY: ${envVars.OPENAI ? '✅ Presente (sk-proj-...)' : '❌ Ausente'}`)
console.log(`- VITE_SUPABASE_URL: ${envVars.SUPABASE_URL ? '✅ ' + envVars.SUPABASE_URL : '❌ Ausente'}`)
console.log(`- VITE_SUPABASE_ANON_KEY: ${envVars.SUPABASE_ANON ? '✅ Presente (eyJhbG...)' : '❌ Ausente'}`)

if (envVars.OPENAI && envVars.SUPABASE_URL && envVars.SUPABASE_ANON) {
  console.log('\n✅ Todas as variáveis estão configuradas corretamente!')
} else {
  console.log('\n⚠️ Algumas variáveis estão ausentes. Verifique o .env')
}
