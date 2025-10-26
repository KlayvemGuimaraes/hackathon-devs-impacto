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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-[#0070F3] rounded-lg transform group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-black dark:text-white">
              Bem-Estar Hub
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-[#0070F3]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Início
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/dashboard' 
                  ? 'text-[#0070F3]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/locais"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/locais' 
                  ? 'text-[#0070F3]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Locais
            </Link>
            <Link
              to="/beneficios"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/beneficios' 
                  ? 'text-[#0070F3]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Benefícios
            </Link>
            <Link
              to="/chat"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/chat' 
                  ? 'text-[#0070F3]' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Chat IA
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <Link to="/dashboard">
              <Button size="sm">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
