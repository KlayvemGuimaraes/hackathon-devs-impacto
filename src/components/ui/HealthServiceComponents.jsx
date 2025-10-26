import { motion } from 'framer-motion'
import { ExternalLink, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import Card, { CardContent, CardHeader } from './Card'
import Badge from './Badge'
import Button from './Button'

/**
 * Component to display a single public health service
 */
export function ServiceCard({ service, index = 0 }) {
  if (!service) return null

  const categoryColors = {
    atividade_fisica: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    nutricao: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    saude_mental: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
    promocao_saude: 'bg-lime-50 dark:bg-lime-950 border-lime-200 dark:border-lime-800',
    atencao_primaria: 'bg-primary-50 dark:bg-primary-950 border-primary-200 dark:border-primary-800',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className={`${categoryColors[service.category] || 'bg-gray-50 dark:bg-gray-900'} border-2`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {service.name}
              </h3>
              <Badge variant="lime" className="text-xs">
                {service.category?.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {service.description}
          </p>

          {/* Target Audience */}
          {service.target && (
            <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                👥 Para quem é recomendado:
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {service.target}
              </p>
            </div>
          )}

          {/* Services Offered */}
          {service.services && service.services.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                📋 Serviços oferecidos:
              </p>
              <ul className="space-y-1">
                {service.services.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
                {service.services.length > 4 && (
                  <li className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                    +{service.services.length - 4} outros serviços
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* How to Access */}
          {service.howToAccess && (
            <div className="mb-4 p-3 bg-lime-50 dark:bg-lime-950 border border-lime-200 dark:border-lime-800 rounded-lg">
              <p className="text-xs font-semibold text-lime-900 dark:text-lime-100 mb-1">
                🚀 Como acessar:
              </p>
              <p className="text-sm text-lime-800 dark:text-lime-200">
                {service.howToAccess}
              </p>
            </div>
          )}

          {/* Contact and Link */}
          <div className="flex flex-wrap gap-2 mt-4">
            {service.phone && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`tel:${service.phone}`, '_self')}
                className="flex items-center space-x-1"
              >
                <Phone className="w-4 h-4" />
                <span>{service.phone}</span>
              </Button>
            )}
            {service.link && (
              <Button
                variant="lime"
                size="sm"
                onClick={() => window.open(service.link, '_blank')}
                className="flex items-center space-x-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Saiba mais</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/**
 * Component to display a roadmap
 */
export function RoadmapCard({ roadmap }) {
  if (!roadmap) return null

  const phases = [
    { key: 'curto_prazo', label: 'Próximas 2 semanas', icon: '🎯', color: 'text-red-600 dark:text-red-400' },
    { key: 'medio_prazo', label: 'Próximos 1-3 meses', icon: '📅', color: 'text-orange-600 dark:text-orange-400' },
    { key: 'longo_prazo', label: 'Próximos 3-6 meses', icon: '🏆', color: 'text-green-600 dark:text-green-400' },
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          🗺️ Seu Roadmap Personalizado
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Plano de ação para melhoria da sua saúde e qualidade de vida
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {phases.map((phase, index) => {
            const items = roadmap[phase.key]
            if (!items || items.length === 0) return null

            return (
              <motion.div
                key={phase.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
                className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs">
                  {phase.icon}
                </div>
                
                <div>
                  <h4 className={`text-sm font-bold mb-2 ${phase.color}`}>
                    {phase.label}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-lime-600 dark:text-lime-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Component to display analysis summary
 */
export function AnalysisCard({ analise }) {
  if (!analise) return null

  const urgencyConfig = {
    baixo: { label: 'Baixa', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-950' },
    medio: { label: 'Média', color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-950' },
    alto: { label: 'Alta', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-950' },
  }

  const urgency = urgencyConfig[analise.nivel_urgencia] || urgencyConfig.medio

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          📊 Análise da Sua Situação
        </h3>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Urgency Level */}
          <div className={`p-3 rounded-lg ${urgency.bgColor}`}>
            <div className="flex items-center space-x-2">
              <AlertCircle className={`w-5 h-5 ${urgency.color}`} />
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Nível de urgência:
                </p>
                <p className={`text-sm font-bold ${urgency.color}`}>
                  {urgency.label}
                </p>
              </div>
            </div>
          </div>

          {/* Identified Conditions */}
          {analise.condicoes_identificadas && analise.condicoes_identificadas.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                🔍 Condições identificadas:
              </p>
              <div className="flex flex-wrap gap-2">
                {analise.condicoes_identificadas.map((condition, i) => (
                  <Badge key={i} variant="default" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Risk Factors */}
          {analise.fatores_risco && analise.fatores_risco.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                ⚠️ Fatores de risco:
              </p>
              <ul className="space-y-1">
                {analise.fatores_risco.map((risk, i) => (
                  <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Protective Factors */}
          {analise.fatores_protetivos && analise.fatores_protetivos.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                💚 Fatores positivos:
              </p>
              <ul className="space-y-1">
                {analise.fatores_protetivos.map((factor, i) => (
                  <li key={i} className="text-sm text-green-700 dark:text-green-300 flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Component to display activity and nutrition recommendations
 */
export function RecommendationsCard({ recomendacoes }) {
  if (!recomendacoes) return null

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          💡 Recomendações Personalizadas
        </h3>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Physical Activity */}
          {recomendacoes.atividade_fisica_detalhada && (
            <div>
              <h4 className="text-sm font-bold text-primary-600 dark:text-primary-400 mb-2">
                💪 Atividade Física - {recomendacoes.atividade_fisica_detalhada.type}
              </h4>
              <div className="space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Frequência:</strong> {recomendacoes.atividade_fisica_detalhada.frequency}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Intensidade:</strong> {recomendacoes.atividade_fisica_detalhada.intensity}
                </div>
                <div className="mt-2">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Atividades recomendadas:
                  </p>
                  <ul className="space-y-1">
                    {recomendacoes.atividade_fisica_detalhada.activities.map((activity, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="mr-2">✓</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {recomendacoes.atividade_fisica_detalhada.important && (
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-xs text-red-700 dark:text-red-300">
                      <strong>IMPORTANTE:</strong> {recomendacoes.atividade_fisica_detalhada.important}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nutrition */}
          {recomendacoes.nutricao_detalhada && (
            <div>
              <h4 className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">
                🥗 Nutrição - {recomendacoes.nutricao_detalhada.type}
              </h4>
              <div className="space-y-2">
                {recomendacoes.nutricao_detalhada.principles && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Princípios:
                    </p>
                    <ul className="space-y-1">
                      {recomendacoes.nutricao_detalhada.principles.slice(0, 3).map((principle, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {recomendacoes.nutricao_detalhada.focus && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Foco principal:
                    </p>
                    <ul className="space-y-1">
                      {recomendacoes.nutricao_detalhada.focus.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {recomendacoes.nutricao_detalhada.avoid && (
                  <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded">
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      <strong>Evitar:</strong> {recomendacoes.nutricao_detalhada.avoid}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mental Health */}
          {recomendacoes.saude_mental && (
            <div>
              <h4 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">
                🧠 Saúde Mental
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {recomendacoes.saude_mental}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default {
  ServiceCard,
  RoadmapCard,
  AnalysisCard,
  RecommendationsCard,
}

