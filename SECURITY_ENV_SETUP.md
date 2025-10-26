# 🔐 Configuração de Segurança - Variáveis de Ambiente

## ✅ Mudanças Implementadas

As chaves de API **hardcoded** foram removidas e movidas para variáveis de ambiente por segurança.

### Arquivos Modificados:

1. **`.env`** - Contém as chaves reais (NÃO commitado no Git)
2. **`.env.example`** - Template sem chaves reais (pode ser commitado)
3. **`src/core/core-ai.js`** - Agora usa `import.meta.env.VITE_OPENAI_API_KEY`
4. **`src/lib/supabase.js`** - Agora usa `import.meta.env.VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

---

## 📋 Variáveis de Ambiente

### OpenAI
```
VITE_OPENAI_API_KEY=sk-proj-...
```

### Supabase
```
VITE_SUPABASE_URL=https://dtutntionaxbsmeedpck.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

> **Nota**: Prefixo `VITE_` é obrigatório para que o Vite exponha as variáveis no browser.

---

## 🚀 Como Usar

### Para Desenvolvedores Novos

1. **Clone o repositório**
```bash
git clone <repo-url>
cd hackathon-devs-impacto
```

2. **Copie o arquivo de exemplo**
```bash
cp .env.example .env
```

3. **Preencha as chaves no `.env`**
- OpenAI API Key: https://platform.openai.com/api-keys
- Supabase: https://app.supabase.com/project/dtutntionaxbsmeedpck/settings/api

4. **Instale dependências e rode**
```bash
npm install
npm run dev
```

### Para o Time Atual

✅ Suas chaves já estão configuradas no `.env`!

Basta rodar:
```bash
npm run dev
```

---

## 🔒 Segurança

### ✅ O Que Está Protegido

- ✅ `.env` está no `.gitignore` (não será commitado)
- ✅ `.env.example` tem apenas placeholders (seguro para commit)
- ✅ Código não expõe chaves hardcoded

### ⚠️ Validação Automática

O arquivo `src/lib/supabase.js` agora valida se as variáveis foram carregadas:

```javascript
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ ERRO: Variáveis de ambiente do Supabase não configuradas!')
}
```

Se as variáveis não forem encontradas, a aplicação **NÃO INICIA** e exibe um erro claro.

---

## 🛠️ Troubleshooting

### Erro: "Variáveis de ambiente não configuradas"

**Causa**: Arquivo `.env` não existe ou está vazio.

**Solução**:
```bash
cp .env.example .env
# Edite o .env e adicione as chaves reais
```

### Erro: "undefined is not a valid API key"

**Causa**: Você esqueceu o prefixo `VITE_` na variável.

**Solução**:
```bash
# ❌ Errado
OPENAI_API_KEY=sk-proj-...

# ✅ Correto
VITE_OPENAI_API_KEY=sk-proj-...
```

### Mudanças no `.env` não aparecem

**Causa**: Vite cacheia variáveis de ambiente.

**Solução**:
```bash
# Pare o servidor (Ctrl+C) e reinicie
npm run dev
```

---

## 📦 Produção

### ⚠️ IMPORTANTE: NÃO usar `dangerouslyAllowBrowser` em produção!

O arquivo `src/core/core-ai.js` atualmente usa:
```javascript
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // ⚠️ APENAS DESENVOLVIMENTO!
})
```

**Para produção**, mova as chamadas da OpenAI para um **backend/API**:

```
Frontend → Backend API → OpenAI
```

Isso evita expor a chave no browser.

### Deploy (Vercel/Netlify)

Configure as variáveis de ambiente no painel do serviço:

**Vercel**:
1. Acesse: Project Settings → Environment Variables
2. Adicione:
   - `VITE_OPENAI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Netlify**:
1. Acesse: Site Settings → Environment Variables
2. Adicione as mesmas variáveis

---

## 📝 Checklist de Segurança

- [x] Chaves removidas do código-fonte
- [x] `.env` no `.gitignore`
- [x] `.env.example` criado
- [x] Validação de variáveis implementada
- [x] Documentação criada
- [ ] **TODO (Produção)**: Mover OpenAI para backend

---

## 🔑 Rotação de Chaves

Se as chaves foram expostas (commit acidental, etc.):

### OpenAI
1. Acesse: https://platform.openai.com/api-keys
2. Revogue a chave antiga
3. Crie uma nova chave
4. Atualize o `.env`

### Supabase
1. Acesse: https://app.supabase.com/project/dtutntionaxbsmeedpck/settings/api
2. Clique em "Reset Database Password"
3. Gere um novo JWT Secret (requer rebuild do projeto)
4. Atualize o `.env`

> **Nota**: A `ANON KEY` do Supabase é "pública" e pode ser exposta no frontend. Ela é protegida pelas Row Level Security (RLS) policies. Se comprometida, revise suas RLS policies.

---

## 📚 Referências

- [Vite - Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [OpenAI - Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Supabase - Security](https://supabase.com/docs/guides/platform/going-into-prod#security)

---

**Status**: ✅ Configuração de segurança implementada com sucesso!

