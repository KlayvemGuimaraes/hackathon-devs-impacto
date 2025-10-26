import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Search, 
  Navigation,
  Clock,
  Users,
  ExternalLink,
  Dumbbell,
  Activity,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

export default function Locais() {
  const [cep, setCep] = useState('')
  const [showResults, setShowResults] = useState(false)

  // Mock de locais de exercício público
  const locais = [
    {
      id: 1,
      nome: 'Academia da Saúde - Vila Nova',
      tipo: 'Academia da Saúde',
      endereco: 'Rua das Acácias, 245 - Vila Nova',
      distancia: '0.5 km',
      horario: 'Seg-Sex: 6h-20h | Sáb: 7h-12h',
      atividades: ['Musculação', 'Ginástica', 'Alongamento', 'Avaliação Física'],
      lotacao: 'Baixa',
      contato: '(11) 3456-7890',
      gratuito: true,
      programa: 'Programa Academia da Saúde - Ministério da Saúde',
    },
    {
      id: 2,
      nome: 'Polo de Atividade Física - Parque Central',
      tipo: 'Polo Municipal',
      endereco: 'Av. Central, 1200 - Centro',
      distancia: '1.2 km',
      horario: 'Todos os dias: 6h-18h',
      atividades: ['Caminhada', 'Corrida', 'Yoga', 'Tai Chi Chuan'],
      lotacao: 'Moderada',
      contato: '(11) 3456-7891',
      gratuito: true,
      programa: 'Políticas Públicas de Atividade Física',
    },
    {
      id: 3,
      nome: 'Academia da Saúde - Jardim das Flores',
      tipo: 'Academia da Saúde',
      endereco: 'Rua dos Lírios, 456 - Jardim das Flores',
      distancia: '1.8 km',
      horario: 'Seg-Sex: 7h-19h',
      atividades: ['Musculação', 'Pilates', 'Dança', 'Grupos de Caminhada'],
      lotacao: 'Moderada',
      contato: '(11) 3456-7892',
      gratuito: true,
      programa: 'Programa Academia da Saúde - Ministério da Saúde',
    },
    {
      id: 4,
      nome: 'Centro Comunitário de Esportes',
      tipo: 'Centro Comunitário',
      endereco: 'Rua São Paulo, 890 - Bairro Alto',
      distancia: '2.3 km',
      horario: 'Seg-Sex: 6h-21h | Sáb-Dom: 7h-14h',
      atividades: ['Natação', 'Hidroginástica', 'Musculação', 'Esportes Coletivos'],
      lotacao: 'Alta',
      contato: '(11) 3456-7893',
      gratuito: true,
      programa: 'Política Nacional de Promoção da Saúde',
    },
    {
      id: 5,
      nome: 'Espaço Vida Ativa',
      tipo: 'Espaço Público',
      endereco: 'Praça da Saúde, s/n - Jardim América',
      distancia: '2.7 km',
      horario: 'Livre acesso 24h (equipamentos)',
      atividades: ['Equipamentos ao ar livre', 'Pista de caminhada', 'Alongamento'],
      lotacao: 'Livre',
      contato: 'Sem agendamento',
      gratuito: true,
      programa: 'Políticas Públicas de Atividade Física',
    },
    {
      id: 6,
      nome: 'Polo Saúde em Movimento',
      tipo: 'Polo Municipal',
      endereco: 'Av. dos Trabalhadores, 567 - Industrial',
      distancia: '3.1 km',
      horario: 'Seg-Sex: 6h-20h',
      atividades: ['Ginástica Laboral', 'Caminhada Orientada', 'Grupos Terapêuticos'],
      lotacao: 'Baixa',
      contato: '(11) 3456-7894',
      gratuito: true,
      programa: 'Política Nacional de Promoção da Saúde',
    },
  ]

  const handleBuscarCEP = () => {
    if (cep.length >= 8) {
      setShowResults(true)
    }
  }

  const getLotacaoColor = (lotacao) => {
    if (lotacao === 'Baixa') return 'text-green-600 dark:text-green-400'
    if (lotacao === 'Moderada') return 'text-yellow-600 dark:text-yellow-400'
    if (lotacao === 'Alta') return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

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
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-black dark:text-white mb-3">
            Locais de Exercício Público
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encontre academias comunitárias, polos de atividade física e espaços públicos de exercício próximos a você
          </p>
        </motion.div>

        {/* Busca por CEP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-black dark:text-white">
                Buscar por Localização
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Digite seu CEP para ver os espaços públicos de exercício mais próximos
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    maxLength={8}
                  />
                </div>
                <Button onClick={handleBuscarCEP} disabled={cep.length < 8}>
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
              {cep.length > 0 && cep.length < 8 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Digite os 8 dígitos do CEP
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Resultados */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                Locais Encontrados
              </h2>
              <Badge variant="primary">
                <MapPin className="w-3 h-3 mr-1" />
                {locais.length} locais disponíveis
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {locais.map((local, index) => (
                <motion.div
                  key={local.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                >
                  <Card hover className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-black dark:text-white mb-1 leading-tight">
                            {local.nome}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {local.tipo}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {local.gratuito && (
                              <Badge variant="primary" className="text-xs">
                                Gratuito
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Navigation className="w-5 h-5 text-[#0070F3] flex-shrink-0" />
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start text-sm">
                          <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {local.endereco}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {local.horario}
                          </span>
                        </div>

                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Lotação: <span className={`font-medium ${getLotacaoColor(local.lotacao)}`}>{local.lotacao}</span>
                          </span>
                        </div>

                        <div className="flex items-start text-sm">
                          <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {local.contato}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Atividades oferecidas:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {local.atividades.map((ativ, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
                            >
                              {ativ}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Programa:
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                          {local.programa}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#0070F3]">
                            {local.distancia} de distância
                          </span>
                          <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center">
                            Ver rota
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Informação adicional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#0070F3] rounded-xl">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                        Como participar?
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                          <strong>1.</strong> Escolha o local mais próximo de você
                        </p>
                        <p>
                          <strong>2.</strong> Entre em contato ou compareça diretamente
                        </p>
                        <p>
                          <strong>3.</strong> Leve documento de identidade e comprovante de residência
                        </p>
                        <p>
                          <strong>4.</strong> Todos os espaços são gratuitos e abertos à comunidade
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Estado inicial */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-16"
          >
            <MapPin className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Digite seu CEP acima para encontrar locais de exercício próximos
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

