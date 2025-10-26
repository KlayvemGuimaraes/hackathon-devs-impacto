# 🌟 Bem-Estar Hub

<div align="center">

![Bem-Estar Hub](https://img.shields.io/badge/Bem--Estar-Hub-1890ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-ff0055?style=for-the-badge)

**Hub público de bem-estar com IA preditiva**  
*Nutrição • Academia • Saúde Mental*

[Demo](#) • [Documentação](#funcionalidades) • [Contribuir](#)

</div>

---

## 🎯 Visão Geral

O **Bem-Estar Hub** é uma plataforma completa de bem-estar que utiliza **Inteligência Artificial local** para promover saúde preventiva e reduzir a sobrecarga do sistema público de saúde. 

Inspirado no design sofisticado da **Vercel** e **Linear**, o projeto combina:

- 🧠 **IA Preditiva** - Detecta sinais precoces de ansiedade, fadiga e estresse
- 🍎 **Nutrição Inteligente** - Planos alimentares personalizados
- 💪 **Treinos Adaptativos** - Exercícios para todos os níveis
- 🧘 **Saúde Mental** - Chat empático com IA, meditação e mindfulness

---

## ✨ Funcionalidades

### 🏠 Landing Page

- ✅ Hero section impactante com gradientes animados
- ✅ Cards interativos das três áreas de bem-estar
- ✅ Seção de demonstração da IA preditiva
- ✅ Depoimentos reais de usuários
- ✅ Estatísticas de impacto social
- ✅ Design responsivo mobile-first
- ✅ Animações suaves com Framer Motion

### 💬 Chat com IA

- ✅ Interface de chat em tempo real
- ✅ IA que analisa estado emocional e mental
- ✅ Sugestões personalizadas de atividades, nutrição e exercícios
- ✅ Sistema de insights e padrões comportamentais
- ✅ Quick prompts para facilitar interação
- ✅ Privacidade total (processamento local)

### 🎨 Design System

- ✅ Paleta: Azul (#1890ff), Verde-limão (#a0d911), Cinza
- ✅ Tipografia: Poppins (títulos) + Inter (corpo)
- ✅ Modo escuro automático (detecta preferência do sistema)
- ✅ Componentes UI estilo shadcn/ui
- ✅ Animações e transições fluidas
- ✅ Acessibilidade (WCAG 2.1)

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 18.3** - Library UI moderna
- **Vite 5.1** - Build tool ultrarrápido
- **TailwindCSS 3.4** - Utility-first CSS
- **Framer Motion 11** - Animações declarativas
- **React Router 6** - Navegação SPA
- **Lucide React** - Ícones modernos

### Backend & IA
- **OpenAI GPT-4o** - IA conversacional para análise de saúde
- **Supabase** - Backend-as-a-Service (PostgreSQL)
  - Armazenamento de conversas
  - Perfis de usuários
  - Resumos médicos (dashboard profissional)
  - Row Level Security (RLS)

### DevTools
- **PostCSS + Autoprefixer** - Processamento CSS
- **ESLint** - Linting de código

---

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js >= 18
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <repo-url>
cd hackathon-devs-impacto
```

2. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env e adicione suas chaves:
# - VITE_OPENAI_API_KEY (obtenha em: https://platform.openai.com/api-keys)
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
```

> 📚 **Segurança**: Para instruções detalhadas sobre configuração das variáveis de ambiente, veja [SECURITY_ENV_SETUP.md](./SECURITY_ENV_SETUP.md)

3. **Instale as dependências**
```bash
npm install
```

4. **Execute o projeto**

```bash
# Frontend (porta padrão: 5173)
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

---

## 🔐 Segurança

- ✅ Chaves de API armazenadas em variáveis de ambiente (`.env`)
- ✅ `.env` no `.gitignore` (nunca commitado)
- ✅ `.env.example` disponível como template
- ✅ Validação automática de variáveis no startup

**Nunca commite suas chaves!** Se expor acidentalmente, veja [SECURITY_ENV_SETUP.md](./SECURITY_ENV_SETUP.md) para instruções de rotação de chaves.
