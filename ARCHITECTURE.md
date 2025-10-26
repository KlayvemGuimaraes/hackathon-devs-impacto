# 🏗️ Arquitetura do Bem-Estar Hub

Documentação técnica da arquitetura e fluxo de dados da aplicação.

---

## 🗺️ Visão Geral

```
┌─────────────────────────────────────────────────────────┐
│                    USUÁRIO (Browser)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite)                 │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │   Header    │  │  React Router │  │   Footer       │ │
│  └─────────────┘  └──────┬───────┘  └────────────────┘ │
│                           │                              │
│         ┌─────────────────┼─────────────────┐           │
│         ▼                 ▼                 ▼           │
│  ┌────────────┐   ┌──────────────┐  ┌─────────────┐   │
│  │ Home.jsx   │   │  ChatIA.jsx  │  │  (Future)   │   │
│  │ (Landing)  │   │  (Chat IA)   │  │   Pages     │   │
│  └────────────┘   └──────┬───────┘  └─────────────┘   │
│                           │                              │
│                           ▼                              │
│                  ┌─────────────────┐                    │
│                  │  core-ai.js     │                    │
│                  │  (IA Mock)      │                    │
│                  └─────────────────┘                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND MOCK (JSON Server)                  │
│                                                           │
│  📦 db.json                                              │
│   ├── users        (usuários)                           │
│   ├── habits       (hábitos)                            │
│   ├── nutrition    (planos nutricionais)                │
│   ├── workouts     (treinos)                            │
│   ├── mentalHealth (práticas de saúde mental)           │
│   ├── testimonials (depoimentos)                        │
│   └── stats        (estatísticas)                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Estrutura de Componentes

### Hierarquia de Componentes

```
App.jsx
├── Header (fixo no topo)
│   ├── Logo
│   ├── Navigation Links
│   └── Dark Mode Toggle
│
├── Router
│   ├── Route: / → Home.jsx
│   │   ├── Hero Section
│   │   │   ├── Headline
│   │   │   ├── CTA Buttons
│   │   │   └── Stats Preview
│   │   ├── Areas Cards Section
│   │   │   ├── Card (Nutrição)
│   │   │   ├── Card (Academia)
│   │   │   └── Card (Saúde Mental)
│   │   ├── IA Preditiva Section
│   │   │   ├── Description
│   │   │   └── Demo Card
│   │   ├── Testimonials Section
│   │   │   └── Card[] (Depoimentos)
│   │   └── CTA Final
│   │
│   └── Route: /chat → ChatIA.jsx
│       ├── Chat Area
│       │   ├── Messages[]
│       │   │   ├── User Message
│       │   │   └── AI Response
│       │   │       ├── Suggestion
│       │   │       ├── Activities
│       │   │       ├── Nutrition
│       │   │       └── Exercise
│       │   └── Input Area
│       │       ├── Textarea
│       │       ├── Send Button
│       │       └── Quick Prompts
│       └── Sidebar
│           ├── Tips Card
│           ├── Insights Card
│           ├── Privacy Notice
│           └── Session Info
│
└── Footer
    ├── Brand + Social Links
    ├── Navigation Columns
    └── Copyright
```

---

## 🔄 Fluxo de Dados

### 1. Landing Page (Home)

```
Home.jsx Mount
    │
    ├──> useEffect()
    │       │
    │       └──> fetch('/mock/db.json')
    │               │
    │               ├──> setStats(data.stats)
    │               └──> setTestimonials(data.testimonials)
    │
    └──> Render
            ├──> Hero (com stats)
            ├──> Cards (estático)
            ├──> IA Demo (estático)
            ├──> Testimonials (dinâmico)
            └──> CTA
```

### 2. Chat com IA

```
User Input
    │
    ├──> handleSend()
    │       │
    │       ├──> setMessages([...prev, userMessage])
    │       │
    │       ├──> setIsLoading(true)
    │       │
    │       └──> analyzeUserState(input)
    │               │
    │               ├──> Detect Keywords
    │               ├──> Classify Mood
    │               ├──> Select Suggestion
    │               └──> Return Response
    │                       │
    │                       └──> setMessages([...prev, aiMessage])
    │                               │
    │                               └──> Render AI Response
    │                                       ├── Mood Badge
    │                                       ├── Activities
    │                                       ├── Nutrition
    │                                       └── Exercise
    │
    └──> scrollToBottom()
```

### 3. Core IA (core-ai.js)

```javascript
analyzeUserState(prompt)
    │
    ├──> toLowerCase(prompt)
    │
    ├──> FOR EACH mood IN moodKeywords
    │       │
    │       └──> Count keyword matches
    │               │
    │               └──> Track max matches
    │
    ├──> Detect dominant mood
    │
    ├──> IF mood detected
    │       │
    │       └──> Return suggestion from database
    │               ├── mood
    │               ├── level
    │               ├── suggestion
    │               ├── activities[]
    │               ├── nutrition
    │               ├── exercise
    │               └── confidence
    │
    └──> ELSE
            │
            └──> Return generic response
```

---

## 🎨 Design System

### Componentes UI Reutilizáveis

```
components/ui/
│
├── Button.jsx
│   ├── Variants: default, outline, ghost, lime
│   └── Sizes: sm, md, lg
│
├── Card.jsx
│   ├── Card (container)
│   ├── CardHeader
│   ├── CardContent
│   └── CardFooter
│
├── Input.jsx
│   ├── Input
│   └── Textarea
│
└── Badge.jsx
    └── Variants: default, primary, lime, success, warning
```

### Paleta de Cores (Tailwind)

```css
/* Primary (Azul) */
primary-50   → #e6f7ff  (background)
primary-500  → #1890ff  (default)
primary-600  → #096dd9  (hover)
primary-900  → #002766  (dark)

/* Lime (Verde-Limão) */
lime-500     → #a0d911  (default)
lime-600     → #7cb305  (hover)

/* Neutrals */
gray-50      → #fafafa  (light bg)
gray-100     → #f5f5f5  (cards light)
gray-800     → #262626  (cards dark)
gray-900     → #141414  (text dark)
gray-950     → #0a0a0a  (bg dark)
```

---

## 🧠 Lógica de IA

### Estrutura de Detecção

```javascript
moodKeywords = {
  ansioso: ['ansioso', 'preocupado', 'nervoso', ...],
  triste: ['triste', 'deprimido', 'melancólico', ...],
  cansado: ['cansado', 'exausto', 'fatigado', ...],
  animado: ['feliz', 'animado', 'energético', ...],
  confuso: ['confuso', 'perdido', 'indeciso', ...]
}

suggestions = {
  ansioso: [{
    mood: 'ansioso',
    level: 'moderado',
    suggestion: '...',
    activities: [...],
    nutrition: '...',
    exercise: '...'
  }],
  // ... outros moods
}
```

### Algoritmo de Análise

1. **Input**: Prompt do usuário (string)
2. **Normalização**: `toLowerCase()`
3. **Matching**: Conta keywords por categoria
4. **Classificação**: Retorna mood com mais matches
5. **Seleção**: Escolhe suggestion aleatória do mood
6. **Output**: Objeto com sugestões completas

---

## 🔐 Segurança e Privacidade

### Princípios

- ✅ **Processamento Local**: IA roda no browser (mock)
- ✅ **Sem Tracking**: Nenhum analytics invasivo
- ✅ **Dados Efêmeros**: Messages não persistem
- ✅ **Transparência**: Usuário sabe que é mock

### Futuras Melhorias

- [ ] Criptografia end-to-end
- [ ] Opt-in para analytics anônimos
- [ ] Conformidade LGPD total
- [ ] Auditoria de segurança

---

## 📊 Performance

### Otimizações Implementadas

- ⚡ **Vite**: Build ultrarrápido (HMR < 50ms)
- 🎨 **Tailwind JIT**: CSS on-demand
- 🌲 **Tree Shaking**: Bundle otimizado
- 🖼️ **Lazy Loading**: Imagens sob demanda
- 🎭 **Framer Motion**: Animações GPU-aceleradas
- 📦 **Code Splitting**: React Router lazy

### Métricas Alvo

| Métrica | Target | Atual (estimado) |
|---------|--------|------------------|
| First Contentful Paint | < 1.5s | ~0.8s |
| Time to Interactive | < 3s | ~1.5s |
| Largest Contentful Paint | < 2.5s | ~1.2s |
| Bundle Size (gzip) | < 200KB | ~180KB |

---

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

Gera:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── ...
```

### Hostings Recomendados

- **Vercel** ⭐ (ideal, inspiração do design)
- **Netlify** (fácil setup)
- **GitHub Pages** (gratuito)
- **Railway** (com backend futuro)

---

## 🔮 Roadmap Técnico

### Fase 1 (Atual) ✅
- [x] Setup React + Vite
- [x] Landing Page
- [x] Chat IA Mock
- [x] Design System
- [x] Dark Mode

### Fase 2 (Próxima)
- [ ] Testes (Jest + Testing Library)
- [ ] CI/CD (GitHub Actions)
- [ ] PWA (Service Workers)
- [ ] i18n (Português + Inglês)

### Fase 3 (Futuro)
- [ ] Integração OpenAI real
- [ ] Backend Node.js + PostgreSQL
- [ ] Autenticação (JWT)
- [ ] Dashboard de usuário
- [ ] Mobile App (React Native)

---

## 🛠️ Tecnologias e Versões

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.22.0",
  "framer-motion": "^11.0.5",
  "tailwindcss": "^3.4.1",
  "vite": "^5.1.0",
  "lucide-react": "^0.344.0"
}
```

---

## 📚 Recursos Externos

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

**Arquitetura desenhada para escala, performance e impacto social.** 🚀

