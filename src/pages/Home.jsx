import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Apple, 
  Dumbbell, 
  Brain, 
  Sparkles, 
  TrendingUp,
  Users,
  Clock,
  Heart,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useEffect, useState } from 'react'

export default function Home() {
  const [stats, setStats] = useState(null)
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    // Simula fetch do JSON Server
    fetch('/mock/db.json')
      .then(res => res.json())
      .then(data => {
        setStats(data.stats)
        setTestimonials(data.testimonials)
      })
      .catch(() => {
        // Fallback se JSON Server não estiver rodando
        setStats({
          totalUsers: 15420,
          habitsCompleted: 234567,
          hoursOfExercise: 45890,
          mealsTracked: 123456,
        })
        setTestimonials([
          {
            id: 1,
            name: 'Ana Paula',
            role: 'Professora',
            text: 'O hub mudou minha rotina. Consegui reduzir minha ansiedade em 60% com as práticas diárias.',
            avatar: 'https://ui-avatars.com/api/?name=Ana+Paula&background=667eea&color=fff',
          },
          {
            id: 2,
            name: 'Carlos Eduardo',
            role: 'Desenvolvedor',
            text: 'A IA identificou padrões no meu sono e sugeriu mudanças que funcionaram!',
            avatar: 'https://ui-avatars.com/api/?name=Carlos+Eduardo&background=f093fb&color=fff',
          },
          {
            id: 3,
            name: 'Juliana Costa',
            role: 'Estudante',
            text: 'Cuidar da saúde mental nunca foi tão acessível. Uso todos os dias!',
            avatar: 'https://ui-avatars.com/api/?name=Juliana+Costa&background=a0d911&color=fff',
          },
        ])
      })
  }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="primary" className="mb-6 animate-pulse-slow">
              <Sparkles className="w-3 h-3 mr-1" />
              Alimentado por IA Preditiva
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-600 to-lime-600 dark:from-white dark:via-primary-400 dark:to-lime-400 bg-clip-text text-transparent leading-tight">
              Seu bem-estar começa aqui
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Transforme sua saúde com <strong>IA inteligente</strong>, acompanhamento personalizado em <strong>nutrição, fitness e saúde mental</strong>. Prevenção é o melhor remédio.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat">
                <Button size="lg" className="group">
                  Comece seu bem-estar agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Como funciona
              </Button>
            </div>

            {/* Stats Preview */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {stats.totalUsers.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Usuários ativos</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-lime-600 dark:text-lime-400">
                    {(stats.habitsCompleted / 1000).toFixed(0)}k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Hábitos completados</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {(stats.hoursOfExercise / 1000).toFixed(0)}k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Horas de exercício</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-lime-600 dark:text-lime-400">
                    {(stats.mealsTracked / 1000).toFixed(0)}k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Refeições rastreadas</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 dark:bg-primary-900 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-200 dark:bg-lime-900 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Areas Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Três pilares do bem-estar
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cuidamos de você de forma completa: corpo, mente e nutrição
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Nutrição */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-600 rounded-2xl flex items-center justify-center mb-4">
                    <Apple className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Nutrição Inteligente
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Planos alimentares personalizados com IA. Rastreie macros, calorias e receba sugestões baseadas em seus objetivos.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-lime-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Análise nutricional completa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-lime-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Receitas saudáveis personalizadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-lime-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Acompanhamento de hidratação</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Academia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-4">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Treinos Personalizados
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Programas de exercícios adaptados ao seu nível. Do iniciante ao avançado, temos o treino ideal para você.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Planos de treino adaptativos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Vídeos e instruções detalhadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Rastreamento de progresso</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Saúde Mental */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Saúde Mental
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    IA que entende suas emoções. Meditação guiada, técnicas de respiração e acompanhamento do seu estado mental.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Chat com IA empática</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Meditações e mindfulness</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Diário de humor e gratidão</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IA Preditiva Section */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Tecnologia de Ponta
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-900 dark:text-white">
                IA que prevê e cuida
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Nossa inteligência artificial analisa seus padrões de comportamento, humor e saúde para identificar sinais precoces e sugerir ações preventivas.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg mr-4">
                    <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Análise Preditiva</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Detecta padrões de ansiedade, fadiga e estresse antes que se tornem problemas sérios
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-lime-100 dark:bg-lime-900 rounded-lg mr-4">
                    <Shield className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">100% Privado</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Seus dados ficam seguros e nunca são compartilhados. Privacidade em primeiro lugar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                    <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Suporte Humanizado</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      IA que entende emoções e responde com empatia, sempre respeitando seus limites
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/chat" className="inline-block mt-8">
                <Button variant="lime" size="lg">
                  Experimente a IA agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Tenho me sentido muito ansioso ultimamente...
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-lime-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-primary-50 to-lime-50 dark:from-primary-950 dark:to-lime-950 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          Identifiquei sinais de ansiedade. Vou sugerir algumas ações:
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">Caminhada leve de 15min</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">Respiração 4-7-8</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                            <span className="text-gray-600 dark:text-gray-300">Chá de camomila</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <Badge variant="success">
                      <Clock className="w-3 h-3 mr-1" />
                      Resposta em tempo real
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-lime-200 dark:bg-lime-800 rounded-full filter blur-2xl opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full filter blur-2xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900 dark:text-white">
              Histórias reais de transformação
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Veja como estamos mudando vidas todos os dias
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Heart
                          key={i}
                          className="w-4 h-4 text-red-500 fill-red-500"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-lime-500">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Pronto para transformar sua vida?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Junte-se a milhares de pessoas que já estão cuidando do bem-estar de forma inteligente e preventiva.
            </p>
            <Link to="/chat">
              <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-50 border-0">
                Começar agora gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

