# ⚡ Quick Start - Bem-Estar Hub

Guia rápido para rodar o projeto em **5 minutos**.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ **Node.js** (v18 ou superior) → [Download](https://nodejs.org/)
- ✅ **npm** (vem com Node) ou **yarn**
- ✅ **Git** → [Download](https://git-scm.com/)

Verifique as versões:
```bash
node --version  # deve ser v18+
npm --version   # deve ser 9+
```

---

## 🚀 Instalação em 3 Passos

### 1️⃣ Clone o repositório

```bash
git clone <url-do-repositorio>
cd Hackathon
```

### 2️⃣ Instale as dependências

```bash
npm install
```

Isso vai instalar:
- React, React Router, Framer Motion
- TailwindCSS, PostCSS, Autoprefixer
- Vite, JSON Server, Lucide Icons

⏱️ **Tempo estimado:** 1-2 minutos

### 3️⃣ Execute o projeto

Você precisa rodar **2 comandos em terminais separados**:

**Terminal 1 - Frontend (Vite)**
```bash
npm run dev
```
✅ Abre em `http://localhost:3000`

**Terminal 2 - API Mock (JSON Server)**
```bash
npm run server
```
✅ Roda em `http://localhost:3001`

---

## 🎉 Pronto! Acesse o App

Abra seu navegador em:
```
http://localhost:3000
```

Você verá:
- 🏠 **Landing Page** com hero section, cards e depoimentos
- 💬 **Chat IA** (clique em "Chat IA" no menu ou "Comece seu bem-estar agora")

---

## 🧪 Testando o Chat IA

1. Vá para `/chat` ou clique no botão "Comece agora"
2. Digite uma mensagem como:
   - "Estou me sentindo ansioso"
   - "Preciso de motivação para treinar"
   - "Como melhorar meu sono?"
3. A IA vai analisar e responder com sugestões personalizadas!

---

## 🌓 Modo Escuro

O app detecta automaticamente a preferência do seu sistema!

Você também pode alternar manualmente:
- Clique no ícone 🌙/☀️ no canto superior direito

---

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (port 3000) |
| `npm run build` | Cria build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run server` | Inicia JSON Server (port 3001) |

---

## 📁 Estrutura Rápida

```
Hackathon/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          ← Landing Page
│   │   └── ChatIA.jsx        ← Chat com IA
│   ├── components/
│   │   ├── Header.jsx        ← Cabeçalho
│   │   ├── Footer.jsx        ← Rodapé
│   │   └── ui/               ← Componentes reutilizáveis
│   └── core/
│       └── core-ai.js        ← Motor de IA (mock)
└── mock/
    └── db.json               ← Database mockado
```

---

## 🐛 Problemas Comuns

### Porta 3000 já em uso?
```bash
# Mude a porta no vite.config.js ou mate o processo:
lsof -ti:3000 | xargs kill -9
```

### Erro de módulos?
```bash
# Limpe cache e reinstale:
rm -rf node_modules package-lock.json
npm install
```

### JSON Server não funciona?
```bash
# Verifique se está rodando:
curl http://localhost:3001/stats

# Se não, mate processos na porta 3001:
lsof -ti:3001 | xargs kill -9
npm run server
```

---

## 🎨 Personalizando

### Mudar cores
Edite `tailwind.config.js`:
```js
colors: {
  primary: { ... },  // Azul
  lime: { ... },     // Verde-limão
}
```

### Adicionar mais dados mockados
Edite `mock/db.json` e adicione:
- Novos usuários
- Receitas de nutrição
- Treinos
- Meditações

---

## 📚 Próximos Passos

- 📖 Leia o [README.md](README.md) completo
- 🤝 Veja [CONTRIBUTING.md](CONTRIBUTING.md) para contribuir
- 🧠 Explore `src/core/core-ai.js` para entender a IA
- 🎨 Customize o design no `tailwind.config.js`

---

## 💡 Dica Pro

Execute ambos os comandos em um único terminal com **concurrently**:

```bash
npm install -g concurrently

# Depois use:
concurrently "npm run dev" "npm run server"
```

---

## 🆘 Precisa de Ajuda?

- 📧 Abra uma issue no GitHub
- 💬 Entre em contato com a equipe
- 📖 Consulte a documentação completa

---

**Boa codificação! 💚**

