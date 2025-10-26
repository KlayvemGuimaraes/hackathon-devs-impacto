import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity,
  Users,
  AlertCircle,
  TrendingUp,
  Calendar,
  Heart,
  Brain,
  Apple,
  RefreshCw,
  Eye
} from 'lucide-react'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { getAllMedicalSummaries } from '../lib/supabase'

export default function Dashboard() {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    loadSummaries()
    
    // Recarrega apenas quando foca na aba (usuário voltou ao dashboard)
    const handleFocus = () => {
      console.log('👁️ Dashboard em foco - Recarregando dados...')
      loadSummaries()
    }
    
    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const loadSummaries = async () => {
    setLoading(true)
    try {
      console.log('📊 [Dashboard] Carregando resumos médicos...')
      const { data } = await getAllMedicalSummaries(50)
      setSummaries(data || [])
      setLastUpdate(new Date())
      console.log(`✅ [Dashboard] ${data?.length || 0} resumos carregados`)
    } catch (error) {
      console.error('❌ [Dashboard] Erro ao carregar resumos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (level) => {
    const colors = {
      baixo: 'text-green-600 bg-green-50 border-green-200',
      moderado: 'text-orange-600 bg-orange-50 border-orange-200',
      alto: 'text-red-600 bg-red-50 border-red-200'
    }
    return colors[level] || colors.moderado
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Dashboard Profissional
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Monitoramento de pacientes • Última atualização: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            <Button onClick={loadSummaries} disabled={loading}>
              <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Pacientes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {summaries.length}
                    </p>
                  </div>
                  <Users className="w-12 h-12 text-primary-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Risco Alto</p>
                    <p className="text-3xl font-bold text-red-600">
                      {summaries.filter(s => s.medical_summary?.nivel_risco_geral === 'alto').length}
                    </p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Risco Moderado</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {summaries.filter(s => s.medical_summary?.nivel_risco_geral === 'moderado').length}
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Atualizados Hoje</p>
                    <p className="text-3xl font-bold text-green-600">
                      {summaries.filter(s => {
                        const updated = new Date(s.summary_updated_at)
                        const today = new Date()
                        return updated.toDateString() === today.toDateString()
                      }).length}
                    </p>
                  </div>
                  <Activity className="w-12 h-12 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Patient List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Lista de Pacientes
                </h2>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <RefreshCw className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
                  </div>
                ) : summaries.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhum paciente com resumo gerado ainda
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {summaries.map((patient, index) => {
                      const summary = patient.medical_summary
                      if (!summary) return null

                      return (
                        <motion.div
                          key={patient.user_id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedPatient(patient)}
                          className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                {summary.paciente?.nome || 'Paciente Anônimo'}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                ID: {patient.user_id.substring(0, 15)}...
                              </p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {summary.condicoes_identificadas?.slice(0, 3).map((cond, i) => (
                                  <Badge key={i} variant="default" className="text-xs">
                                    {cond}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {summary.ultima_interacao}
                              </p>
                            </div>
                            <div className="ml-4 flex flex-col items-end gap-2">
                              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(summary.nivel_risco_geral)}`}>
                                Risco: {summary.nivel_risco_geral}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(patient.summary_updated_at).toLocaleDateString('pt-BR')}
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Ver
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Detalhes do Paciente
                </h2>
              </CardHeader>
              <CardContent>
                {!selectedPatient ? (
                  <div className="text-center py-12">
                    <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Selecione um paciente para ver detalhes
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Patient Info */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {selectedPatient.medical_summary.paciente?.nome || 'Paciente Anônimo'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedPatient.medical_summary.total_conversas} conversas registradas
                      </p>
                    </div>

                    {/* Risk Level */}
                    <div className={`p-3 rounded-lg border ${getRiskColor(selectedPatient.medical_summary.nivel_risco_geral)}`}>
                      <p className="text-sm font-bold mb-1">Nível de Risco</p>
                      <p className="text-2xl font-bold capitalize">
                        {selectedPatient.medical_summary.nivel_risco_geral}
                      </p>
                    </div>

                    {/* Areas of Attention */}
                    {selectedPatient.medical_summary.areas_atencao && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-900 dark:text-white">Áreas de Atenção:</h4>
                        
                        <div className="flex items-start space-x-2">
                          <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Física</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {selectedPatient.medical_summary.areas_atencao.fisica}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Apple className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Nutricional</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {selectedPatient.medical_summary.areas_atencao.nutricional}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Brain className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Mental</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {selectedPatient.medical_summary.areas_atencao.mental}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Alerts */}
                    {selectedPatient.medical_summary.alertas && selectedPatient.medical_summary.alertas.length > 0 && (
                      <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <p className="font-bold text-red-900 dark:text-red-100">Alertas</p>
                        </div>
                        <ul className="space-y-1">
                          {selectedPatient.medical_summary.alertas.map((alert, i) => (
                            <li key={i} className="text-sm text-red-800 dark:text-red-200">
                              • {alert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Next Actions */}
                    {selectedPatient.medical_summary.proximas_acoes && selectedPatient.medical_summary.proximas_acoes.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Próximas Ações:</h4>
                        <ul className="space-y-2">
                          {selectedPatient.medical_summary.proximas_acoes.map((action, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                              <span className="mr-2">✓</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Last Update */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Atualizado: {new Date(selectedPatient.summary_updated_at).toLocaleString('pt-BR')}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

