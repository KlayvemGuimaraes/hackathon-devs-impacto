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
  AlertCircle
} from 'lucide-react'
import Button from '../components/ui/Button'
import { Textarea } from '../components/ui/Input'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { analyzeUserState, generateInsights } from '../core/core-ai'

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
  const messagesEndRef = useRef(null)
  const [showInsights, setShowInsights] = useState(false)

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
      // Chama a IA mockada
      const response = await analyzeUserState(input)

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: response.suggestion,
        data: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente.',
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
    'Estou me sentindo ansioso',
    'Preciso de motivação para treinar',
    'O que comer para ter mais energia?',
    'Como melhorar meu sono?',
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

                            {/* AI Response Details */}
                            {message.data && (
                              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="lime" className="text-xs">
                                    {message.data.mood}
                                  </Badge>
                                  <Badge variant="default" className="text-xs">
                                    Nível: {message.data.level}
                                  </Badge>
                                </div>
                                
                                {message.data.activities && (
                                  <div className="mt-2">
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                                      Atividades sugeridas:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {message.data.activities.map((activity, i) => (
                                        <span
                                          key={i}
                                          className="text-xs px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                                        >
                                          {activity}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {message.data.nutrition && (
                                  <div className="mt-2">
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                      💚 Nutrição: <span className="font-normal">{message.data.nutrition}</span>
                                    </p>
                                  </div>
                                )}

                                {message.data.exercise && (
                                  <div className="mt-1">
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                      💪 Exercício: <span className="font-normal">{message.data.exercise}</span>
                                    </p>
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
        </div>
      </div>
    </div>
  )
}

