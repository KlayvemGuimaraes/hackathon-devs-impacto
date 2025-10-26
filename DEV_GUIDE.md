# 💻 Guia do Desenvolvedor

Referência rápida para desenvolvedores trabalhando no Bem-Estar Hub.

---

## 🎯 Comandos Essenciais

### Desenvolvimento
```bash
# Iniciar dev server (frontend)
npm run dev

# Iniciar mock API
npm run server

# Ambos simultaneamente (recomendado instalar concurrently)
npm install -g concurrently
concurrently "npm run dev" "npm run server"
```

### Build e Deploy
```bash
# Build de produção
npm run build

# Preview do build
npm run preview

# Verificar tamanho do bundle
npm run build -- --mode production --report
```

### Limpeza
```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpar cache do Vite
rm -rf node_modules/.vite
```

---

## 📝 Padrões de Código

### Estrutura de Componente

```jsx
// Imports
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

// Componente
export default function MyComponent({ prop1, prop2 }) {
  // 1. Hooks de Estado
  const [state, setState] = useState(null)

  // 2. Hooks de Efeito
  useEffect(() => {
    // logic
  }, [dependencies])

  // 3. Handlers
  const handleAction = () => {
    // logic
  }

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Naming Conventions

```javascript
// Componentes: PascalCase
MyComponent.jsx

// Funções utilitárias: camelCase
analyzeUserState()

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRIES = 3

// CSS classes: kebab-case (via Tailwind)
className="bg-primary-500"

// Arquivos: kebab-case ou PascalCase
core-ai.js
Button.jsx
```

### Import Order

```javascript
// 1. React & libs externas
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// 2. Componentes locais
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

// 3. Hooks & utils
import { cn } from '@/utils/cn'
import { analyzeUserState } from '@/core/core-ai'

// 4. Estilos (se necessário)
import './styles.css'
```

---

## 🎨 Tailwind Utilities

### Cores Personalizadas

```jsx
// Primary (Azul)
<div className="bg-primary-500 text-primary-50" />
<div className="dark:bg-primary-900" />

// Lime (Accent)
<div className="bg-lime-500 text-white" />
<Button variant="lime">Click</Button>

// Gradientes
<div className="bg-gradient-to-r from-primary-600 to-lime-600" />
```

### Animações Built-in

```jsx
// Fade in
<div className="animate-fade-in" />

// Slide up
<div className="animate-slide-up" />

// Pulse (lento)
<div className="animate-pulse-slow" />
```

### Responsive Design

```jsx
// Mobile-first approach
<div className="
  text-sm      /* mobile */
  md:text-base /* tablet (768px+) */
  lg:text-lg   /* desktop (1024px+) */
" />
```

### Dark Mode

```jsx
<div className="
  bg-white text-gray-900
  dark:bg-gray-900 dark:text-white
" />
```

---

## 🧩 Framer Motion Patterns

### Fade In on Mount

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Slide Up Animation

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Stagger Children

```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### WhileInView (Scroll Animations)

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

---

## 🔧 Customizando Componentes UI

### Extending Button

```jsx
// Em components/ui/Button.jsx
const buttonVariants = {
  default: '...',
  outline: '...',
  // Adicione nova variant:
  danger: 'bg-red-600 text-white hover:bg-red-700'
}

// Uso:
<Button variant="danger">Delete</Button>
```

### Extending Card

```jsx
// Novo tipo de Card
export function StatsCard({ value, label, icon }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-100 rounded-lg">
            {icon}
          </div>
          <div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 🧠 Trabalhando com a IA

### Adicionando Novo Mood

```javascript
// Em src/core/core-ai.js

// 1. Adicionar keywords
const moodKeywords = {
  // ... moods existentes
  estressado: ['estressado', 'sobrecarregado', 'pressão']
}

// 2. Adicionar sugestões
const suggestions = {
  // ... moods existentes
  estressado: [
    {
      mood: 'estressado',
      level: 'alto',
      suggestion: 'Faça uma pausa. Respire fundo e organize prioridades.',
      activities: ['Pausa', 'Respiração', 'Planejamento'],
      nutrition: 'Chá verde e frutas cítricas ajudam.',
      exercise: 'Caminhada curta para clarear a mente.'
    }
  ]
}
```

### Testando Responses

```javascript
// Em src/core/core-ai.js, no final:
if (import.meta.env.DEV) {
  // Testes automáticos em dev
  console.log('Testing IA:', await analyzeUserState('estou ansioso'))
}
```

---

## 📊 Mockando Novos Dados

### Adicionando ao db.json

```json
// Em mock/db.json
{
  "newResource": [
    {
      "id": 1,
      "field1": "value",
      "field2": 123
    }
  ]
}
```

### Usando em Componentes

```jsx
useEffect(() => {
  fetch('http://localhost:3001/newResource')
    .then(res => res.json())
    .then(data => setData(data))
}, [])
```

---

## 🐛 Debugging

### React DevTools

```bash
# Instalar extensão:
# Chrome: https://chrome.google.com/webstore (React Developer Tools)
# Firefox: https://addons.mozilla.org (React Developer Tools)
```

### Console Logs Úteis

```javascript
// Estado de componente
console.log('State:', { messages, isLoading })

// Props recebidas
console.log('Props:', props)

// Timing de effects
useEffect(() => {
  console.log('Component mounted')
  return () => console.log('Component unmounted')
}, [])
```

### Vite Debug

```bash
# Modo debug detalhado
DEBUG=vite:* npm run dev

# Ver bundle analysis
npm run build -- --debug
```

---

## ⚡ Performance Tips

### Lazy Loading de Rotas

```jsx
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const ChatIA = lazy(() => import('./pages/ChatIA'))

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chat" element={<ChatIA />} />
  </Routes>
</Suspense>
```

### Memoização

```jsx
import { useMemo, useCallback } from 'react'

// Valores computados pesados
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// Callbacks em props
const handleClick = useCallback(() => {
  doSomething(value)
}, [value])
```

### Otimizando Imagens

```jsx
// Usar formatos modernos
<img src="image.webp" alt="..." loading="lazy" />

// Responsive images
<img
  srcSet="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-medium.jpg"
  alt="..."
/>
```

---

## 🧪 Testing (Futuro)

### Setup Jest

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

### Exemplo de Teste

```jsx
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

---

## 📱 Mobile Development

### Viewport Testing

```bash
# Chrome DevTools: Cmd+Shift+M (Mac) ou Ctrl+Shift+M (Windows)
```

### Touch Events

```jsx
<div
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  Swipeable
</div>
```

---

## 🔐 Variáveis de Ambiente

### Criar .env (local)

```bash
# .env (não commitado)
VITE_API_URL=http://localhost:3001
VITE_ENABLE_ANALYTICS=false
```

### Usar em Código

```javascript
const apiUrl = import.meta.env.VITE_API_URL
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
```

---

## 🚀 Deploy Checklist

- [ ] `npm run build` sem erros
- [ ] Testar modo escuro
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Verificar performance (Lighthouse)
- [ ] Validar acessibilidade (WAVE, axe)
- [ ] Testar em diferentes browsers
- [ ] Atualizar README com URL de produção
- [ ] Configurar analytics (se aplicável)

---

## 📚 Recursos Úteis

### Documentação

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion)

### Ferramentas

- [Tailwind Play](https://play.tailwindcss.com) - Testar CSS
- [Excalidraw](https://excalidraw.com) - Diagramas
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance
- [WAVE](https://wave.webaim.org) - Acessibilidade

### Inspiração

- [Vercel Design](https://vercel.com/design)
- [Linear Method](https://linear.app/method)
- [Stripe Design](https://stripe.com)
- [Figma Community](https://www.figma.com/community)

---

## 🆘 Troubleshooting

### Port já em uso
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Cache problems
```bash
rm -rf node_modules/.vite
rm -rf dist
npm run dev
```

### Tailwind não funciona
```bash
# Verificar se PostCSS está configurado
cat postcss.config.js

# Rebuild
npm run dev
```

---

**Happy Coding! 🚀💚**

