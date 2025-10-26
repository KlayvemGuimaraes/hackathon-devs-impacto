import { Link, useLocation } from 'react-router-dom'
import { Activity, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import Button from './ui/Button'

export default function Header() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
    setDarkMode(!darkMode)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-lime-500 rounded-lg transform group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-lime-600 bg-clip-text text-transparent">
              Bem-Estar Hub
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname === '/' 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Início
            </Link>
            <Link
              to="/chat"
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                location.pathname === '/chat' 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Chat IA
            </Link>
            <a
              href="#sobre"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              Sobre
            </a>
            <a
              href="#depoimentos"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              Depoimentos
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <Button size="sm" variant="lime">
              Começar
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

