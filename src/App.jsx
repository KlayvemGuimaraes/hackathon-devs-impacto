import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ChatIA from './pages/ChatIA'
import Dashboard from './pages/Dashboard'
import Beneficios from './pages/Beneficios'
import Locais from './pages/Locais'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<ChatIA />} />
            <Route path="/beneficios" element={<Beneficios />} />
            <Route path="/locais" element={<Locais />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
