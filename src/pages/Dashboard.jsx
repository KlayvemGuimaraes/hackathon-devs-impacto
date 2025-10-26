import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Flame, 
  Target, 
  Trophy, 
  Calendar,
  TrendingUp,
  Dumbbell,
  Apple,
  Heart,
  Zap,
  Award,
  CheckCircle2
} from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import ProgressRing from '../components/ui/ProgressRing'
import Card, { CardContent, CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { BarChart, LineChart } from '../components/ui/Chart'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock data - em produção viria do backend
  const stats = {
    calories: { current: 1847, goal: 2200 },
    workouts: { current: 4, goal: 5 },
    water: { current: 6, goal: 8 },
    sleep: { current: 7.5, goal: 8 },
  }

  const weeklyWorkouts = [
    { label: 'Seg', value: 45, color: 'bg-primary-500' },
    { label: 'Ter', value: 60, color: 'bg-primary-500' },
    { label: 'Qua', value: 0, color: 'bg-neutral-200 dark:bg-neutral-700' },
    { label: 'Qui', value: 50, color: 'bg-primary-500' },
    { label: 'Sex', value: 70, color: 'bg-primary-500' },
    { label: 'Sáb', value: 0, color: 'bg-neutral-200 dark:bg-neutral-700' },
    { label: 'Dom', value: 0, color: 'bg-neutral-200 dark:bg-neutral-700' },
  ]

  const weightProgress = [
    { label: 'Jan', value: 78 },
    { label: 'Fev', value: 76.5 },
    { label: 'Mar', value: 75 },
    { label: 'Abr', value: 74.2 },
    { label: 'Mai', value: 73 },
  ]

  const achievements = [
    { icon: Trophy, title: '5 treinos seguidos', color: 'success', unlocked: true },
    { icon: Flame, title: '30 dias ativo', color: 'accent', unlocked: true },
    { icon: Target, title: 'Meta mensal batida', color: 'primary', unlocked: true },
    { icon: Award, title: '100 treinos', color: 'success', unlocked: false },
  ]

  const todayWorkouts = [
    { name: 'Treino A - Peito/Tríceps', time: '09:00', duration: '45min', done: true },
    { name: 'Cardio leve', time: '18:00', duration: '20min', done: false },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Acompanhe seu progresso e conquiste suas metas
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            {['overview', 'treinos', 'nutrição', 'sono'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white shadow-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Calorias Hoje"
            value={`${stats.calories.current} kcal`}
            change="+12%"
            icon={Flame}
            color="accent"
            trend="up"
          />
          <StatCard
            title="Treinos Esta Semana"
            value={`${stats.workouts.current}/${stats.workouts.goal}`}
            change="+1"
            icon={Dumbbell}
            color="primary"
            trend="up"
          />
          <StatCard
            title="Água Hoje"
            value={`${stats.water.current}/${stats.water.goal} copos`}
            icon={Activity}
            color="primary"
          />
          <StatCard
            title="Sono Médio"
            value={`${stats.sleep.current}h`}
            change="-0.5h"
            icon={Heart}
            color="success"
            trend="down"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Rings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Metas Diárias
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ProgressRing
                      progress={(stats.calories.current / stats.calories.goal) * 100}
                      value={`${Math.round((stats.calories.current / stats.calories.goal) * 100)}%`}
                      label="Calorias"
                      color="accent"
                      size={100}
                    />
                    <ProgressRing
                      progress={(stats.workouts.current / stats.workouts.goal) * 100}
                      value={`${stats.workouts.current}/${stats.workouts.goal}`}
                      label="Treinos"
                      color="primary"
                      size={100}
                    />
                    <ProgressRing
                      progress={(stats.water.current / stats.water.goal) * 100}
                      value={`${stats.water.current}/${stats.water.goal}`}
                      label="Água"
                      color="primary"
                      size={100}
                    />
                    <ProgressRing
                      progress={(stats.sleep.current / stats.sleep.goal) * 100}
                      value={`${stats.sleep.current}h`}
                      label="Sono"
                      color="success"
                      size={100}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Atividade Semanal
                    </h3>
                    <Badge variant="primary">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +15%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <BarChart data={weeklyWorkouts} height={200} />
                  <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                    Total: 225 minutos esta semana
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weight Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Progresso de Peso
                    </h3>
                    <Badge variant="success">
                      -5kg em 5 meses
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <LineChart data={weightProgress} height={200} />
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-white">78kg</div>
                      <div className="text-xs text-neutral-500">Início</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">73kg</div>
                      <div className="text-xs text-neutral-500">Atual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900 dark:text-white">70kg</div>
                      <div className="text-xs text-neutral-500">Meta</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Hoje
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayWorkouts.map((workout, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          workout.done
                            ? 'bg-success-50 border-success-200 dark:bg-success-900/20 dark:border-success-800'
                            : 'bg-white border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-neutral-900 dark:text-white">
                              {workout.name}
                            </div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                              {workout.time} • {workout.duration}
                            </div>
                          </div>
                          {workout.done && (
                            <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0" />
                          )}
                        </div>
                        {!workout.done && (
                          <Button size="sm" className="w-full mt-2">
                            Iniciar Treino
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-accent-600" />
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      Conquistas
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            achievement.unlocked
                              ? 'bg-white border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700'
                              : 'bg-neutral-100 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 opacity-50'
                          }`}
                        >
                          <Icon className={`w-8 h-8 mx-auto mb-2 ${
                            achievement.unlocked
                              ? `text-${achievement.color}-600`
                              : 'text-neutral-400'
                          }`} />
                          <div className="text-xs font-medium text-neutral-900 dark:text-white">
                            {achievement.title}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Ações Rápidas
                  </h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Dumbbell className="w-4 h-4 mr-2" />
                    Registrar Treino
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Apple className="w-4 h-4 mr-2" />
                    Adicionar Refeição
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Registrar Água
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

