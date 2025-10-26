import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Sparkles, 
  User, 
  Brain,
  Lightbulb,
  TrendingUp,
  Clock,
  AlertCircle,
  Building2
} from 'lucide-react'
import Button from '../components/ui/Button'
import { Textarea } from '../components/ui/Input'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { analyzeUserState, generateInsights } from '../core/core-ai'
import { 
  ServiceCard, 
  RoadmapCard, 
  AnalysisCard, 
  RecommendationsCard 
} from '../components/ui/HealthServiceComponents'

export default function ChatIA() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! 👋 Sou sua assistente de bem-estar. Como você está se sentindo hoje?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [userId, setUserId] = useState(null)
  const messagesEndRef = useRef(null)

  // Carrega histórico do banco ao montar componente
  useEffect(() => {
    const loadHistory = async () => {
      const { generateUserId, getUserConversations, getUserProfile } = await import('../lib/supabase')
      const currentUserId = generateUserId()
      setUserId(currentUserId)
      
      // Busca histórico de conversas
      const { data: conversations } = await getUserConversations(currentUserId, 20)
      
      if (conversations && conversations.length > 0) {
        // Busca perfil do usuário
        const { data: profile } = await getUserProfile(currentUserId)
        
        // Adiciona mensagem de boas-vindas personalizada se tiver perfil
        if (profile && profile.name) {
          setMessages([{
            id: 0,
            type: 'ai',
            content: `Olá ${profile.name}! 👋 Bem-vindo de volta! Vi que já conversamos antes. Como posso te ajudar hoje?`,
            timestamp: new Date(),
          }])
        }
        
        console.log(`📚 Histórico carregado: ${conversations.length} conversas anteriores`)
        console.log('👤 Perfil:', profile)
      }
    }
    
    loadHistory()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepara histórico COMPLETO incluindo do banco de dados
      const { getUserConversations } = await import('../lib/supabase')
      const { data: pastConversations } = await getUserConversations(userId, 10)
      
      // Cria histórico combinado: conversas antigas + conversa atual
      const conversationHistory = []
      
      // Adiciona conversas antigas do banco
      if (pastConversations && pastConversations.length > 0) {
        pastConversations.reverse().forEach(conv => {
          conversationHistory.push({
            role: 'user',
            content: conv.user_message
          })
          conversationHistory.push({
            role: 'assistant',
            content: conv.ai_response.mensagem_humanizada || JSON.stringify(conv.ai_response)
          })
        })
      }
      
      // Adiciona mensagens da sessão atual
      messages
        .filter(m => m.type !== 'system' && m.id !== 1) // Ignora mensagem inicial
        .forEach(m => {
          conversationHistory.push({
            role: m.type === 'user' ? 'user' : 'assistant',
            content: m.type === 'user' ? m.content : m.data?.mensagem_humanizada || m.content
          })
        })

      console.log(`🧠 Enviando ${conversationHistory.length} mensagens de contexto para IA`)

      // Chama a IA real com OpenAI e histórico completo
      const response = await analyzeUserState(input, conversationHistory, userId)

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: response.mensagem_humanizada || 'Analisando sua situação...',
        data: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Gerar e atualizar resumo médico após cada conversa
      setTimeout(async () => {
        try {
          const { generateMedicalSummary } = await import('../core/core-ai')
          const { updateMedicalSummary } = await import('../lib/supabase')
          
          // Busca conversas recentes para gerar resumo
          const { data: recentConvs, error: fetchError } = await getUserConversations(userId, 20)
          
          if (!fetchError && recentConvs && recentConvs.length > 0) {
            const { success, summary } = await generateMedicalSummary(userId, recentConvs)
            
            if (success) {
              await updateMedicalSummary(userId, summary)
              console.log('✅ Dashboard atualizado! Recarregue para ver mudanças.')
            }
          }
        } catch (error) {
          console.error('❌ Erro ao atualizar resumo:', error)
        }
      }, 2000) // 2 segundos após a resposta
    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente em alguns instantes.',
        timestamp: new Date(),
        error: true,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getInsights = () => {
    const aiMessages = messages.filter(m => m.type === 'ai' && m.data)
    return generateInsights(aiMessages.map(m => m.data))
  }

  const quickPrompts = [
    'Estou sedentário e com sobrepeso, preciso de ajuda',
    'Tenho diabetes e não sei como começar a me exercitar',
    'Estou ansioso e com dificuldade para dormir',
    'Quero melhorar minha alimentação mas não sei por onde começar',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-lime-500 rounded-2xl mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold mb-2 text-gray-900 dark:text-white">
              Chat com IA de Bem-Estar
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Compartilhe como você está se sentindo e receba orientações personalizadas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="flex flex-col" style={{ height: '600px' }}>
                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {/* Avatar */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' 
                              ? 'bg-primary-100 dark:bg-primary-900'
                              : 'bg-gradient-to-br from-primary-500 to-lime-500'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            ) : (
                              <Sparkles className="w-5 h-5 text-white" />
                            )}
                          </div>

                          {/* Message Content */}
                          <div className={`rounded-2xl p-4 ${
                            message.type === 'user'
                              ? 'bg-primary-600 text-white'
                              : message.error
                              ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <p className={`text-sm ${
                              message.type === 'user' 
                                ? 'text-white' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {message.content}
                            </p>

                            {/* AI Response Details - New Format */}
                            {message.data && !message.data.fallback && (
                              <div className="mt-4 space-y-4">
                                {/* Analysis Summary */}
                                {message.data.analise && (
                                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Building2 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        Análise da Situação
                                      </p>
                                    </div>
                                    {message.data.analise.condicoes_identificadas && message.data.analise.condicoes_identificadas.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {message.data.analise.condicoes_identificadas.map((condition, i) => (
                                          <Badge key={i} variant="default" className="text-xs">
                                            {condition}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Recommended Services */}
                                {message.data.servicos_detalhados && message.data.servicos_detalhados.length > 0 && (
                                  <div className="p-3 bg-lime-50 dark:bg-lime-950 rounded-lg border border-lime-200 dark:border-lime-800">
                                    <p className="text-xs font-semibold text-lime-900 dark:text-lime-100 mb-2">
                                      🏥 {message.data.servicos_detalhados.length} Serviço(s) Público(s) Recomendado(s)
                                    </p>
                                    <div className="space-y-2">
                                      {message.data.servicos_detalhados.slice(0, 2).map((service, i) => (
                                        <div key={i} className="text-xs text-lime-800 dark:text-lime-200">
                                          <strong>• {service.name}</strong>
                                          <p className="text-xs text-lime-700 dark:text-lime-300 ml-2 mt-1">
                                            {service.description}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    {message.data.servicos_detalhados.length > 2 && (
                                      <p className="text-xs text-lime-600 dark:text-lime-400 mt-2">
                                        +{message.data.servicos_detalhados.length - 2} outros serviços recomendados
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Quick Roadmap Preview */}
                                {message.data.roadmap && (
                                  <div className="p-3 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
                                    <p className="text-xs font-semibold text-primary-900 dark:text-primary-100 mb-2">
                                      🗺️ Próximos Passos
                                    </p>
                                    {message.data.roadmap.curto_prazo && message.data.roadmap.curto_prazo.length > 0 && (
                                      <ul className="space-y-1">
                                        {message.data.roadmap.curto_prazo.slice(0, 2).map((item, i) => (
                                          <li key={i} className="text-xs text-primary-800 dark:text-primary-200 flex items-start">
                                            <span className="mr-2">✓</span>
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            <p className="text-xs mt-2 opacity-60">
                              {message.timestamp.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-lime-500 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite como você está se sentindo..."
                      rows={2}
                      className="flex-1 resize-none"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="self-end"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Quick Prompts */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(prompt)}
                        className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Info Card */}
              {userId && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-5 h-5 text-primary-600" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Seu Perfil</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-300">
                        <strong>ID:</strong> {userId.substring(0, 20)}...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        💾 Suas conversas são salvas automaticamente e a IA lembra de tudo que você já contou!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Info Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-lime-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Dicas</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="mr-2">✨</span>
                      <span>Seja específico sobre seus sentimentos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">💭</span>
                      <span>Compartilhe o contexto do que aconteceu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🎯</span>
                      <span>Pergunte sobre nutrição, exercícios ou emoções</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Insights Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Insights</h3>
                    </div>
                    <button
                      onClick={() => setShowInsights(!showInsights)}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {showInsights ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </CardHeader>
                {showInsights && (
                  <CardContent>
                    {messages.filter(m => m.type === 'ai' && m.data).length > 0 ? (
                      <div className="space-y-3 text-sm">
                        {(() => {
                          const insights = getInsights()
                          return (
                            <>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                                  Padrões identificados:
                                </p>
                                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                                  {insights.patterns.map((pattern, i) => (
                                    <li key={i} className="text-xs">• {pattern}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                                  Recomendação:
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                  {insights.recommendation}
                                </p>
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Continue conversando para gerar insights
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Privacy Notice */}
              <Card className="bg-primary-50 dark:bg-primary-950 border-primary-200 dark:border-primary-800">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-primary-900 dark:text-primary-100 mb-1">
                        100% Privado e Seguro
                      </p>
                      <p className="text-xs text-primary-700 dark:text-primary-300">
                        Suas conversas são processadas localmente e nunca compartilhadas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{messages.length} mensagens nesta sessão</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Analysis Section - Shows after AI response */}
          {messages.length > 1 && messages[messages.length - 1].type === 'ai' && messages[messages.length - 1].data && !messages[messages.length - 1].data.fallback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                📋 Análise Detalhada e Recomendações
              </h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Analysis Card */}
                {messages[messages.length - 1].data.analise && (
                  <AnalysisCard analise={messages[messages.length - 1].data.analise} />
                )}

                {/* Roadmap Card */}
                {messages[messages.length - 1].data.roadmap && (
                  <RoadmapCard roadmap={messages[messages.length - 1].data.roadmap} />
                )}

                {/* Recommendations Card */}
                {messages[messages.length - 1].data.recomendacoes && (
                  <div className="lg:col-span-2">
                    <RecommendationsCard recomendacoes={messages[messages.length - 1].data.recomendacoes} />
                  </div>
                )}

                {/* Services Cards */}
                {messages[messages.length - 1].data.servicos_detalhados && messages[messages.length - 1].data.servicos_detalhados.length > 0 && (
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      🏥 Serviços Públicos Recomendados para Você
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {messages[messages.length - 1].data.servicos_detalhados.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

