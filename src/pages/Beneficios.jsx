import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield,
  CheckCircle2,
  ExternalLink,
  Activity,
  Apple,
  Heart,
  TrendingUp,
  User,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

export default function Beneficios() {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simula carregamento do perfil do usuário
  useEffect(() => {
    setTimeout(() => {
      // Mock: perfil do usuário baseado em dados de uso da plataforma
      setUserProfile({
        nome: 'Usuário',
        atividadeFisica: 'baixa', // baixa, moderada, alta
        alimentacao: 'pobre', // adequada, pobre, excesso
        peso: 'excesso', // normal, excesso, baixo
        condicoesCronicas: ['sedentarismo'], // diabetes, hipertensão, sedentarismo
        vulnerabilidadeSocial: false,
      })
      setLoading(false)
    }, 1500)
  }, [])

  // Políticas públicas com lógica de elegibilidade
  const getPoliticas = (perfil) => {
    if (!perfil) return []

    return [
      {
        id: 1,
        titulo: 'Programa Academia da Saúde',
        orgao: 'Ministério da Saúde',
        descricao: 'Promoção de atividade física em espaços públicos de exercício com apoio profissional à comunidade.',
        elegivel: perfil.atividadeFisica === 'baixa',
        motivo: perfil.atividadeFisica === 'baixa' 
          ? 'Você se enquadra no perfil: baixo nível de atividade física'
          : 'Recomendado para usuários com baixo nível de atividade física',
        recomendacao: 'Indicamos visitar uma Academia da Saúde próxima e participar de grupos de caminhada ou coletivos.',
        beneficios: [
          'Acesso gratuito a academias públicas',
          'Acompanhamento de educadores físicos',
          'Grupos de caminhada e coletivos',
          'Avaliação física inicial gratuita',
          'Equipamentos de musculação e ginástica'
        ],
        comoAcessar: 'Compareça à Unidade Básica de Saúde (UBS) mais próxima com documento de identidade e comprovante de residência.',
        icon: Activity,
        link: '/locais',
      },
      {
        id: 2,
        titulo: 'Política Nacional de Alimentação e Nutrição (PNAN)',
        orgao: 'Ministério da Saúde',
        descricao: 'Diretriz nacional de nutrição focada em alimentação adequada, prevenção de carências nutricionais e obesidade.',
        elegivel: perfil.peso === 'excesso' || perfil.alimentacao === 'pobre',
        motivo: perfil.peso === 'excesso' || perfil.alimentacao === 'pobre'
          ? 'Seu perfil indica necessidade de acompanhamento nutricional'
          : 'Recomendado para usuários com excesso de peso ou padrão alimentar inadequado',
        recomendacao: 'Sugerimos consulta com nutricionista via Atenção Primária à Saúde (APS) e participação em oficinas de alimentação saudável.',
        beneficios: [
          'Consultas com nutricionista via SUS',
          'Oficinas de alimentação saudável',
          'Orientação para compra de alimentos',
          'Acompanhamento nutricional contínuo',
          'Material educativo sobre nutrição'
        ],
        comoAcessar: 'Solicite encaminhamento na sua UBS para consulta com nutricionista da rede pública.',
        icon: Apple,
      },
      {
        id: 3,
        titulo: 'Políticas Públicas de Atividade Física',
        orgao: 'Governo Federal',
        descricao: 'Documento-base sobre promoção de atividade física em comunidades, escolas e ambientes de trabalho.',
        elegivel: perfil.atividadeFisica === 'baixa' || perfil.condicoesCronicas.length > 0,
        motivo: perfil.atividadeFisica === 'baixa' || perfil.condicoesCronicas.length > 0
          ? 'Usuário sedentário ou com condições crônicas detectadas'
          : 'Recomendado para prevenção de doenças crônicas',
        recomendacao: 'Sugerimos programa de atividade física vinculado ao SUS ou programas municipais de exercício supervisionado.',
        beneficios: [
          'Programas de exercício supervisionado',
          'Grupos de corrida e caminhada',
          'Atividades em parques públicos',
          'Material educativo gratuito',
          'Apoio de profissionais de educação física'
        ],
        comoAcessar: 'Consulte a Secretaria Municipal de Esporte ou Saúde sobre programas disponíveis na sua região.',
        icon: TrendingUp,
        link: '/locais',
      },
      {
        id: 4,
        titulo: 'Política Nacional de Promoção da Saúde (PNPS)',
        orgao: 'Ministério da Saúde',
        descricao: 'Política ampla que integra bem-estar, alimentação, atividade física e determinantes sociais da saúde.',
        elegivel: perfil.vulnerabilidadeSocial || 
                 (perfil.atividadeFisica === 'baixa' && perfil.alimentacao === 'pobre') ||
                 perfil.condicoesCronicas.length > 1,
        motivo: perfil.vulnerabilidadeSocial
          ? 'Usuário em vulnerabilidade social com múltiplos fatores de risco'
          : 'Abordagem integrada recomendada para seu perfil',
        recomendacao: 'Indicamos integração de serviços: aconselhamento nutricional, atividade física comunitária e apoio psicossocial.',
        beneficios: [
          'Aconselhamento nutricional integrado',
          'Atividade física comunitária',
          'Apoio psicossocial',
          'Grupos de apoio e educação em saúde',
          'Articulação entre diferentes serviços de saúde'
        ],
        comoAcessar: 'Procure o NASF (Núcleo de Apoio à Saúde da Família) da sua região ou sua UBS de referência.',
        icon: Shield,
      },
      {
        id: 5,
        titulo: 'VIGITEL - Vigilância de Fatores de Risco',
        orgao: 'Ministério da Saúde',
        descricao: 'Monitoramento de alimentação, atividade física e excesso de peso nas capitais brasileiras por inquérito telefônico.',
        elegivel: false,
        motivo: 'Sistema de monitoramento populacional (não requer adesão individual)',
        recomendacao: 'Os dados do VIGITEL são utilizados para calibrar as recomendações da nossa IA e ajustar perfis populacionais.',
        beneficios: [
          'Dados populacionais para políticas públicas',
          'Perfil epidemiológico da sua região',
          'Base para recomendações personalizadas',
          'Monitoramento de tendências de saúde'
        ],
        comoAcessar: 'Sistema de monitoramento automático - não é necessário cadastro individual.',
        icon: Heart,
      },
    ]
  }

  const politicas = getPoliticas(userProfile)
  const politicasElegiveis = politicas.filter(p => p.elegivel)

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0070F3] rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-black dark:text-white mb-3">
            Seus Benefícios Públicos
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubra quais políticas públicas e programas governamentais você tem direito baseado no seu perfil
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-[#0070F3]" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Analisando seu perfil...
            </p>
          </motion.div>
        )}

        {/* Perfil do Usuário */}
        {!loading && userProfile && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#0070F3] rounded-xl">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                        Seu Perfil de Saúde
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Atividade Física:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                            {userProfile.atividadeFisica}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Alimentação:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                            {userProfile.alimentacao}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Peso:</span>
                          <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                            {userProfile.peso}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Benefícios Disponíveis:</span>
                          <span className="ml-2 font-medium text-[#0070F3]">
                            {politicasElegiveis.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resumo */}
            {politicasElegiveis.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto mb-8"
              >
                <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Ótimas notícias!</strong> Você tem direito a {politicasElegiveis.length} programa{politicasElegiveis.length > 1 ? 's' : ''} público{politicasElegiveis.length > 1 ? 's' : ''} de saúde
                  </p>
                </div>
              </motion.div>
            )}

            {/* Políticas */}
            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Programas e Políticas Disponíveis
              </h2>

              {politicas.map((politica, index) => {
                const Icon = politica.icon
                return (
                  <motion.div
                    key={politica.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className={!politica.elegivel ? 'opacity-60' : ''}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl flex-shrink-0 ${
                            politica.elegivel 
                              ? 'bg-blue-50 dark:bg-blue-950' 
                              : 'bg-gray-100 dark:bg-gray-900'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              politica.elegivel 
                                ? 'text-[#0070F3]' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                              <div>
                                <h3 className="font-bold text-lg text-black dark:text-white mb-1">
                                  {politica.titulo}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {politica.orgao}
                                </p>
                              </div>
                              {politica.elegivel ? (
                                <Badge variant="primary">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Elegível
                                </Badge>
                              ) : (
                                <Badge>
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Informativo
                                </Badge>
                              )}
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                              {politica.descricao}
                            </p>

                            {/* Motivo */}
                            <div className={`border rounded-lg p-3 mb-4 ${
                              politica.elegivel
                                ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900'
                                : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                            }`}>
                              <p className={`text-sm font-medium mb-1 ${
                                politica.elegivel ? 'text-[#0070F3]' : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                {politica.elegivel ? 'Por que você se qualifica:' : 'Sobre este programa:'}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {politica.motivo}
                              </p>
                            </div>

                            {/* Recomendação personalizada */}
                            {politica.elegivel && (
                              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg p-3 mb-4">
                                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">
                                  Recomendação da IA:
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {politica.recomendacao}
                                </p>
                              </div>
                            )}

                            {/* Benefícios */}
                            <div className="mb-4">
                              <p className="text-sm font-medium text-black dark:text-white mb-2">
                                O que está incluído:
                              </p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {politica.beneficios.map((beneficio, i) => (
                                  <div key={i} className="flex items-start">
                                    <CheckCircle2 className="w-4 h-4 text-[#0070F3] mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {beneficio}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Como acessar */}
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Como acessar este benefício:
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {politica.comoAcessar}
                              </p>
                            </div>

                            {/* Ação */}
                            {politica.elegivel && politica.link && (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => window.location.href = politica.link}
                              >
                                Ver locais disponíveis
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Card className="bg-[#0070F3] border-[#0070F3]">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Dúvidas sobre seus benefícios?
                  </h3>
                  <p className="text-white/90 mb-6">
                    Converse com nossa IA ou procure a Unidade Básica de Saúde mais próxima
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="secondary" size="lg" onClick={() => window.location.href = '/chat'}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Falar com IA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
