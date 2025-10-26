# Funcionalidades de Políticas Públicas

Este documento descreve as duas novas funcionalidades relacionadas a políticas públicas de saúde implementadas na plataforma.

## 📍 1. Locais de Exercício Público (`/locais`)

### Objetivo
Permitir que usuários encontrem academias comunitárias, polos de atividade física e espaços públicos de exercício próximos à sua localização.

### Funcionalidades
- **Busca por CEP**: Campo de input com validação de 8 dígitos
- **Lista de Locais**: Exibição de 6 locais mockados (pode ser expandido)
- **Informações Detalhadas**:
  - Nome e tipo do local (Academia da Saúde, Polo Municipal, Centro Comunitário, etc.)
  - Endereço completo
  - Distância do usuário
  - Horários de funcionamento
  - Atividades oferecidas
  - Lotação atual (Baixa, Moderada, Alta)
  - Contato
  - Programa governamental associado
- **Design**: Cards interativos com hover effects, badges "Gratuito", ícones e informações estruturadas

### Tipos de Locais Mockados
1. **Academia da Saúde** - Programa do Ministério da Saúde
2. **Polo Municipal de Atividade Física** - Políticas Públicas de Atividade Física
3. **Centro Comunitário de Esportes** - PNPS
4. **Espaço Público de Exercício** - Equipamentos ao ar livre
5. **Polo Saúde em Movimento** - Grupos terapêuticos e ginástica laboral

### Programas Associados
- Programa Academia da Saúde (Ministério da Saúde)
- Políticas Públicas de Atividade Física
- Política Nacional de Promoção da Saúde (PNPS)

---

## 🏥 2. Benefícios Públicos Personalizados (`/beneficios`)

### Objetivo
Mostrar ao usuário quais políticas públicas e programas governamentais ele tem direito, baseado em seu perfil de saúde e uso da plataforma.

### Funcionalidades
- **Análise de Perfil**: Sistema analisa automaticamente:
  - Nível de atividade física (baixa, moderada, alta)
  - Padrão alimentar (adequado, pobre, excesso)
  - Peso (normal, excesso, baixo)
  - Condições crônicas (sedentarismo, diabetes, hipertensão)
  - Vulnerabilidade social
  
- **Elegibilidade Inteligente**: Cada política mostra se o usuário é elegível ou não
- **Recomendações Personalizadas da IA**: Sugestões específicas para o perfil do usuário
- **Informações Completas**:
  - Nome e órgão responsável pela política
  - Descrição do programa
  - Motivo da elegibilidade
  - Lista de benefícios inclusos
  - Como acessar o programa
  - Links para ações (ex: ver locais disponíveis)

### Políticas Implementadas

#### 1. Programa Academia da Saúde
- **Órgão**: Ministério da Saúde
- **Elegível**: Usuários com baixo nível de atividade física
- **Benefícios**:
  - Acesso gratuito a academias públicas
  - Acompanhamento de educadores físicos
  - Grupos de caminhada
  - Avaliação física inicial
  - Equipamentos de musculação e ginástica
- **Como acessar**: UBS com documento de identidade

#### 2. Política Nacional de Alimentação e Nutrição (PNAN)
- **Órgão**: Ministério da Saúde
- **Elegível**: Usuários com excesso de peso ou alimentação pobre
- **Benefícios**:
  - Consultas com nutricionista via SUS
  - Oficinas de alimentação saudável
  - Orientação para compra de alimentos
  - Acompanhamento nutricional contínuo
  - Material educativo
- **Como acessar**: Encaminhamento na UBS

#### 3. Políticas Públicas de Atividade Física
- **Órgão**: Governo Federal
- **Elegível**: Usuários sedentários ou com condições crônicas
- **Benefícios**:
  - Programas de exercício supervisionado
  - Grupos de corrida e caminhada
  - Atividades em parques públicos
  - Material educativo
  - Apoio de profissionais de educação física
- **Como acessar**: Secretaria Municipal de Esporte/Saúde

#### 4. Política Nacional de Promoção da Saúde (PNPS)
- **Órgão**: Ministério da Saúde
- **Elegível**: Usuários em vulnerabilidade social ou com múltiplos fatores de risco
- **Benefícios**:
  - Aconselhamento nutricional integrado
  - Atividade física comunitária
  - Apoio psicossocial
  - Grupos de apoio e educação
  - Articulação entre serviços de saúde
- **Como acessar**: NASF ou UBS de referência

#### 5. VIGITEL - Vigilância de Fatores de Risco
- **Órgão**: Ministério da Saúde
- **Elegível**: Não (sistema de monitoramento)
- **Propósito**:
  - Dados populacionais para políticas públicas
  - Perfil epidemiológico regional
  - Base para recomendações personalizadas da IA
  - Monitoramento de tendências

### Lógica de Elegibilidade

```javascript
// Programa Academia da Saúde
elegivel: perfil.atividadeFisica === 'baixa'

// PNAN
elegivel: perfil.peso === 'excesso' || perfil.alimentacao === 'pobre'

// Políticas de Atividade Física
elegivel: perfil.atividadeFisica === 'baixa' || perfil.condicoesCronicas.length > 0

// PNPS
elegivel: perfil.vulnerabilidadeSocial || 
         (perfil.atividadeFisica === 'baixa' && perfil.alimentacao === 'pobre') ||
         perfil.condicoesCronicas.length > 1

// VIGITEL
elegivel: false (sistema de monitoramento)
```

---

## 🎨 Design System

Ambas as páginas seguem o **estilo Vercel**:
- **Cores**: Azul `#0070F3` + Branco/Preto
- **Tipografia**: Poppins (títulos) + Inter (corpo)
- **Componentes**: Cards, Badges, Buttons do design system
- **Animações**: Framer Motion com fade-in e slide-up
- **Responsividade**: Grid adaptativo para mobile/tablet/desktop
- **Dark Mode**: Suporte completo

---

## 🔗 Navegação

As páginas estão integradas no menu principal:
- **Início** → `/`
- **Dashboard** → `/dashboard`
- **Locais** → `/locais`
- **Benefícios** → `/beneficios`
- **Chat IA** → `/chat`

---

## 🚀 Integração com IA

A página de **Benefícios** utiliza dados do perfil do usuário que são coletados através de:
1. Uso da plataforma (dashboard)
2. Conversas com a IA (chat)
3. Dados inseridos pelo usuário

A IA também pode recomendar:
- Visitar a página de Benefícios para ver programas disponíveis
- Acessar a página de Locais para encontrar academias próximas
- Programas específicos baseados na conversa

---

## 📊 Mock Data

### Perfil do Usuário (exemplo)
```javascript
{
  nome: 'Usuário',
  atividadeFisica: 'baixa',
  alimentacao: 'pobre',
  peso: 'excesso',
  condicoesCronicas: ['sedentarismo'],
  vulnerabilidadeSocial: false,
}
```

### Academias (6 locais mockados)
Distribuídos entre 0.5km e 3.1km de distância, com diferentes horários, atividades e lotações.

---

## 🎯 Impacto Social

Estas funcionalidades concretizam o **objetivo social da plataforma**:

1. **Acesso à Informação**: Democratiza o conhecimento sobre direitos de saúde
2. **Prevenção**: Conecta usuários a programas preventivos antes da doença
3. **Redução de Sobrecarga**: Diminui demanda por atendimento emergencial
4. **Bem-estar Constitucional**: Promove o direito ao bem-estar previsto na Constituição
5. **Equidade**: Prioriza perfis vulneráveis através da elegibilidade inteligente

---

## 📝 Próximos Passos (Futuras Implementações)

- [ ] Integração real com API de CEP (ViaCEP)
- [ ] Geolocalização automática
- [ ] Integração com Google Maps para rotas
- [ ] Sistema de agendamento de academias
- [ ] Notificações de novos programas elegíveis
- [ ] Histórico de benefícios acessados
- [ ] Feedback sobre os locais visitados
- [ ] Integração com dados reais do DATASUS
- [ ] Parcerias com secretarias municipais de saúde

