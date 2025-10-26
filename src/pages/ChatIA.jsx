import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  User,
  Sparkles,
  MoreVertical,
  Copy,
  RotateCcw
} from 'lucide-react'
import Button from '../components/ui/Button'
import { Textarea } from '../components/ui/Input'
import { analyzeUserState } from '../core/core-ai'

export default function ChatIA() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou sua assistente de bem-estar. Como posso ajudar você hoje?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])

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

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Olá! Sou sua assistente de bem-estar. Como posso ajudar você hoje?',
        timestamp: new Date(),
      }
    ])
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#0070F3] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-black dark:text-white">
                  Assistente de Bem-Estar
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Análise de bem-estar com IA
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              title="Nova conversa"
            >
              <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 group"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gray-200 dark:bg-gray-800'
                      : 'bg-[#0070F3]'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-semibold text-black dark:text-white">
                        {message.type === 'user' ? 'Você' : 'Assistente'}
                      </span>
                    </div>
                    
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>

                    {/* AI Response Details */}
                    {message.data && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              Análise
                            </span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-[#0070F3] dark:bg-blue-950 dark:text-blue-400">
                              {message.data.mood}
                            </span>
                            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                              {message.data.level}
                            </span>
                          </div>
                          
                          {message.data.activities && (
                            <div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Atividades sugeridas
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {message.data.activities.map((activity, i) => (
                                  <span
                                    key={i}
                                    className="text-xs px-3 py-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
                                  >
                                    {activity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {message.data.nutrition && (
                            <div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nutrição
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {message.data.nutrition}
                              </p>
                            </div>
                          )}

                          {message.data.exercise && (
                            <div>
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Exercício
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {message.data.exercise}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
                        title="Copiar"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
                        title="Mais opções"
                      >
                        <MoreVertical className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0070F3] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-semibold text-black dark:text-white">
                      Assistente
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mensagem para a assistente..."
              rows={1}
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 rounded-lg resize-none overflow-hidden
                       bg-white dark:bg-black
                       border border-gray-300 dark:border-gray-700
                       text-gray-900 dark:text-white
                       placeholder:text-gray-500 dark:placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[#0070F3] focus:border-transparent
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', maxHeight: '200px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 rounded-lg
                       bg-[#0070F3] hover:bg-[#0761D1]
                       disabled:bg-gray-300 disabled:cursor-not-allowed
                       transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            As conversas são processadas localmente e não são armazenadas
          </p>
        </div>
      </div>
    </div>
  )
}
