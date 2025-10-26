# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Bem-Estar Hub**! Este é um projeto open-source com propósito social.

## 🎯 Como Contribuir

### 1. Reporte Bugs

Se encontrar um bug, abra uma issue com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (OS, browser, versão do Node)

### 2. Sugira Features

Adoramos novas ideias! Ao sugerir:
- Descreva o problema que resolve
- Explique a solução proposta
- Considere alternativas
- Pense no impacto social

### 3. Envie Pull Requests

#### Processo
1. Fork o projeto
2. Crie uma branch descritiva (`git checkout -b feature/nome-feature`)
3. Faça commits claros (`git commit -m 'feat: adiciona X'`)
4. Push para sua branch (`git push origin feature/nome-feature`)
5. Abra um Pull Request

#### Padrões de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (não afeta código)
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de build/config

Exemplos:
```bash
git commit -m "feat: adiciona meditação guiada de 5min"
git commit -m "fix: corrige modo escuro no chat"
git commit -m "docs: atualiza instruções de instalação"
```

#### Code Style

- Use ESLint (configuração incluída)
- Siga as convenções React
- Componentes em PascalCase
- Funções utilitárias em camelCase
- CSS classes com Tailwind
- Comente código complexo

#### Testes

- Teste manualmente todas as mudanças
- Garanta responsividade (mobile, tablet, desktop)
- Teste modo claro e escuro
- Valide acessibilidade

## 🎨 Design Guidelines

- Mantenha o estilo Vercel/Linear
- Use componentes UI existentes
- Paleta de cores definida no Tailwind config
- Animações suaves e não intrusivas
- Acessibilidade em primeiro lugar

## 🧠 IA e Privacidade

- **NUNCA** envie dados reais para APIs externas sem consentimento
- Toda IA deve ser transparente sobre processamento
- Dados sensíveis devem ser criptografados
- Respeite a LGPD em todas as features

## 📖 Documentação

Ao adicionar features:
- Atualize o README.md
- Documente funções complexas
- Adicione comentários JSDoc quando necessário
- Mantenha o db.json atualizado (se relevante)

## ⚖️ Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Use linguagem acolhedora

## 💡 Áreas que Precisam de Ajuda

- [ ] Tradução para outros idiomas
- [ ] Testes automatizados (Jest + Testing Library)
- [ ] Integração com wearables
- [ ] Acessibilidade (leitores de tela)
- [ ] Performance optimization
- [ ] Mobile app (React Native)

## 🏆 Reconhecimento

Contribuidores serão creditados no README e terão nosso eterno agradecimento! 💚

## 📞 Dúvidas?

Abra uma issue ou entre em contato através de [seu-email@exemplo.com]

---

**Juntos construímos um Brasil mais saudável!** 🇧🇷

