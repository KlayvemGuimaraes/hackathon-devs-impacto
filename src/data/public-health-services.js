/**
 * Base de Dados de Serviços Públicos de Saúde do Brasil
 * Fontes: Ministério da Saúde, SUS, VIGITEL
 */

export const publicHealthPrograms = {
  academiadasaude: {
    id: 'academiadasaude',
    name: 'Programa Academia da Saúde',
    category: 'atividade_fisica',
    description: 'Promoção de atividade física, espaços públicos de exercício e apoio à comunidade.',
    target: 'Pessoas com baixo nível de atividade física, sedentarismo, ou que buscam prevenção de doenças crônicas',
    services: [
      'Espaços públicos para exercícios físicos',
      'Grupos de caminhada orientada',
      'Aulas de ginástica coletiva',
      'Práticas corporais (yoga, tai chi chuan, alongamento)',
      'Orientação de profissionais de educação física',
      'Atividades em grupo para todas as idades',
      'Avaliação física inicial',
    ],
    benefits: [
      'Redução do sedentarismo',
      'Prevenção de doenças crônicas (diabetes, hipertensão, obesidade)',
      'Melhora da qualidade de vida',
      'Fortalecimento de vínculos comunitários',
      'Acompanhamento profissional gratuito',
    ],
    howToAccess: 'Procure a Unidade Básica de Saúde (UBS) mais próxima e pergunte sobre o Programa Academia da Saúde na sua região. O programa é gratuito e aberto à comunidade.',
    link: 'https://aps.saude.gov.br/ape/academiadasaude',
    phone: '136 (Disque Saúde)',
  },
  
  pnan: {
    id: 'pnan',
    name: 'Política Nacional de Alimentação e Nutrição (PNAN)',
    category: 'nutricao',
    description: 'Diretriz nacional de nutrição focada em alimentação adequada, prevenção de carências nutricionais e obesidade.',
    target: 'Pessoas com excesso de peso, padrão alimentar inadequado, carências nutricionais, ou doenças relacionadas à alimentação',
    services: [
      'Consultas com nutricionista via Atenção Primária à Saúde (APS)',
      'Oficinas de alimentação saudável',
      'Grupos de educação nutricional',
      'Acompanhamento de gestantes e crianças',
      'Orientação sobre alimentos in natura e ultraprocessados',
      'Distribuição de materiais educativos (Guia Alimentar para a População Brasileira)',
    ],
    benefits: [
      'Prevenção e controle de obesidade',
      'Redução de doenças crônicas relacionadas à alimentação',
      'Aprendizado sobre alimentação saudável e acessível',
      'Acompanhamento nutricional gratuito',
      'Melhora da saúde materno-infantil',
    ],
    howToAccess: 'Agende uma consulta na Unidade Básica de Saúde (UBS) mais próxima. Informe que deseja orientação nutricional. O serviço é gratuito pelo SUS.',
    link: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/p/pnan',
    phone: '136 (Disque Saúde)',
  },
  
  politicaatividadefisica: {
    id: 'politicaatividadefisica',
    name: 'Políticas Públicas de Atividade Física',
    category: 'atividade_fisica',
    description: 'Documento-base sobre promoção de atividade física na comunidade, escola e trabalho.',
    target: 'Usuários sedentários ou com condições crônicas (ex: diabetes, hipertensão, obesidade)',
    services: [
      'Programas de atividade física em parques e praças públicas',
      'Caminhadas orientadas em grupo',
      'Ciclovias e espaços públicos para exercícios',
      'Programas de atividade física vinculados ao SUS',
      'Parcerias com academias comunitárias',
      'Eventos comunitários de promoção da saúde',
    ],
    benefits: [
      'Redução do risco de doenças cardiovasculares',
      'Controle de diabetes e hipertensão',
      'Melhora da saúde mental',
      'Fortalecimento muscular e ósseo',
      'Socialização e bem-estar',
    ],
    howToAccess: 'Consulte a Secretaria Municipal de Saúde ou Esporte da sua cidade para informações sobre programas locais de atividade física gratuitos.',
    link: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/atividade-fisica',
    phone: '136 (Disque Saúde)',
  },
  
  pnps: {
    id: 'pnps',
    name: 'Política Nacional de Promoção da Saúde (PNPS)',
    category: 'promocao_saude',
    description: 'Política ampla que inclui bem-estar, alimentação, atividade física e determinantes sociais da saúde.',
    target: 'Usuários em vulnerabilidade social ou com múltiplos fatores de risco (sedentarismo, má alimentação, problemas emocionais)',
    services: [
      'Ações intersetoriais de promoção da saúde',
      'Grupos de apoio psicossocial',
      'Aconselhamento sobre estilos de vida saudáveis',
      'Oficinas de prevenção de doenças',
      'Integração entre alimentação, atividade física e saúde mental',
      'Programas comunitários de qualidade de vida',
    ],
    benefits: [
      'Abordagem integral da saúde',
      'Redução de múltiplos fatores de risco',
      'Apoio psicossocial',
      'Melhora da qualidade de vida em comunidades vulneráveis',
      'Prevenção de doenças crônicas',
    ],
    howToAccess: 'Procure a Unidade Básica de Saúde (UBS) mais próxima e pergunte sobre programas de promoção da saúde disponíveis. Muitos bairros têm grupos comunitários vinculados ao SUS.',
    link: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/p/promocao-da-saude',
    phone: '136 (Disque Saúde)',
  },
  
  vigitel: {
    id: 'vigitel',
    name: 'VIGITEL - Vigilância de Fatores de Risco',
    category: 'monitoramento',
    description: 'Monitoramento de alimentação, atividade física, excesso de peso e fatores de risco para doenças crônicas.',
    target: 'Utilizado como base de dados populacionais para orientar recomendações personalizadas',
    services: [
      'Dados epidemiológicos sobre saúde da população',
      'Informações sobre padrões de sedentarismo e alimentação por região',
      'Estatísticas sobre doenças crônicas',
      'Orientações baseadas em evidências científicas',
    ],
    benefits: [
      'Recomendações personalizadas baseadas em dados populacionais',
      'Compreensão dos principais fatores de risco na sua região',
      'Acesso a informações científicas atualizadas',
    ],
    howToAccess: 'Os dados do VIGITEL são utilizados para embasar as recomendações desta IA. Para mais informações, acesse o site do Ministério da Saúde.',
    link: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/v/vigitel',
    phone: '136 (Disque Saúde)',
  },
  
  nasf: {
    id: 'nasf',
    name: 'Núcleo Ampliado de Saúde da Família (NASF)',
    category: 'atencao_primaria',
    description: 'Equipes multiprofissionais que apoiam as Unidades de Saúde com nutricionistas, fisioterapeutas, psicólogos, educadores físicos, entre outros.',
    target: 'Pessoas que precisam de acompanhamento multiprofissional para questões de saúde física, mental e nutricional',
    services: [
      'Atendimento com nutricionista',
      'Atendimento com psicólogo',
      'Atendimento com educador físico',
      'Fisioterapia',
      'Grupos terapêuticos',
      'Visitas domiciliares',
    ],
    benefits: [
      'Atendimento integral e multidisciplinar',
      'Acompanhamento personalizado',
      'Gratuito pelo SUS',
      'Apoio para mudanças de hábitos de vida',
    ],
    howToAccess: 'Procure a Unidade Básica de Saúde (UBS) da sua região e solicite encaminhamento para o NASF. O médico ou enfermeiro da UBS fará a avaliação e encaminhamento.',
    link: 'https://aps.saude.gov.br/',
    phone: '136 (Disque Saúde)',
  },
  
  caps: {
    id: 'caps',
    name: 'Centro de Atenção Psicossocial (CAPS)',
    category: 'saude_mental',
    description: 'Serviço especializado para transtornos mentais GRAVES E PERSISTENTES, sofrimento psíquico INTENSO ou dependência química.',
    target: 'APENAS para casos graves: transtornos mentais severos (esquizofrenia, bipolaridade grave), crises psiquiátricas agudas, dependência química, risco de suicídio iminente',
    services: [
      'Atendimento psiquiátrico especializado',
      'Psicoterapia intensiva',
      'Oficinas terapêuticas',
      'Acompanhamento medicamentoso',
      'Grupos de apoio especializados',
      'Internação em casos de crise',
    ],
    benefits: [
      'Atendimento especializado para casos graves',
      'Acompanhamento contínuo e intensivo',
      'Gratuito pelo SUS',
      'Suporte para crises graves',
    ],
    howToAccess: 'IMPORTANTE: CAPS é para casos graves. Para ansiedade/tristeza leve, procure primeiro UBS/NASF. Para CAPS, solicite encaminhamento na UBS ou vá diretamente em casos de emergência.',
    link: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/caps',
    phone: '188 (CVV - Centro de Valorização da Vida) ou 136 (Disque Saúde)',
  },
  
  apoio_psicologico_ubs: {
    id: 'apoio_psicologico_ubs',
    name: 'Apoio Psicológico na UBS',
    category: 'saude_mental',
    description: 'Atendimento psicológico básico e acolhimento para questões emocionais leves a moderadas nas Unidades Básicas de Saúde.',
    target: 'Pessoas com ansiedade leve/moderada, tristeza passageira, estresse, dificuldades emocionais do dia a dia, problemas de relacionamento',
    services: [
      'Consultas com psicólogo',
      'Acolhimento e escuta qualificada',
      'Orientação psicológica',
      'Grupos de apoio emocional',
      'Técnicas de manejo de ansiedade',
      'Encaminhamento se necessário',
    ],
    benefits: [
      'Primeiro ponto de contato para saúde mental',
      'Atendimento humanizado e acessível',
      'Gratuito pelo SUS',
      'Próximo à sua residência',
      'Não precisa encaminhamento',
    ],
    howToAccess: 'Procure a UBS (Unidade Básica de Saúde) mais próxima e agende consulta com psicólogo. É o primeiro passo recomendado para questões emocionais leves.',
    link: 'https://aps.saude.gov.br/',
    phone: '136 (Disque Saúde)',
  },
  
  cvv: {
    id: 'cvv',
    name: 'CVV - Centro de Valorização da Vida',
    category: 'saude_mental',
    description: 'Apoio emocional e prevenção do suicídio através de atendimento voluntário por telefone, chat e e-mail 24 horas.',
    target: 'Qualquer pessoa que precise conversar, se sentindo solitária, triste, ansiosa ou em crise emocional. Atendimento imediato e anônimo.',
    services: [
      'Atendimento telefônico 24h (188)',
      'Chat online',
      'Atendimento por e-mail',
      'Escuta qualificada e sigilosa',
      'Apoio em momentos de crise',
      'Prevenção ao suicídio',
    ],
    benefits: [
      'Disponível 24 horas por dia',
      'Totalmente anônimo e gratuito',
      'Não precisa agendamento',
      'Atendimento imediato',
      'Voluntários treinados',
    ],
    howToAccess: 'Ligue 188 (gratuito) a qualquer hora, acesse www.cvv.org.br para chat online, ou envie e-mail. Não precisa se identificar.',
    link: 'https://www.cvv.org.br',
    phone: '188 (gratuito, 24h)',
  },
  
  grupos_comunitarios_saude_mental: {
    id: 'grupos_comunitarios_saude_mental',
    name: 'Grupos Comunitários de Saúde Mental',
    category: 'saude_mental',
    description: 'Grupos de apoio e convivência para promoção de saúde mental, bem-estar emocional e prevenção de transtornos.',
    target: 'Pessoas que buscam apoio emocional em grupo, compartilhar experiências, melhorar bem-estar mental, prevenir problemas emocionais',
    services: [
      'Grupos de apoio temáticos',
      'Rodas de conversa',
      'Práticas integrativas (meditação, yoga)',
      'Atividades de relaxamento',
      'Convivência e socialização',
      'Palestras sobre saúde mental',
    ],
    benefits: [
      'Ambiente acolhedor e não-clínico',
      'Troca de experiências',
      'Redução do estigma',
      'Prevenção de problemas graves',
      'Fortalecimento de vínculos comunitários',
    ],
    howToAccess: 'Pergunte na UBS sobre grupos comunitários de saúde mental na sua região. Muitos bairros têm grupos vinculados ao NASF ou PNPS.',
    link: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/p/promocao-da-saude',
    phone: '136 (Disque Saúde)',
  },
}

/**
 * Mapeamento de condições para serviços recomendados
 */
export const conditionToServicesMap = {
  sedentarismo: ['academiadasaude', 'politicaatividadefisica', 'nasf'],
  sobrepeso: ['pnan', 'academiadasaude', 'nasf', 'pnps'],
  obesidade: ['pnan', 'academiadasaude', 'nasf', 'pnps'],
  ma_alimentacao: ['pnan', 'nasf'],
  diabetes: ['pnan', 'academiadasaude', 'politicaatividadefisica', 'nasf'],
  hipertensao: ['pnan', 'academiadasaude', 'politicaatividadefisica', 'nasf'],
  ansiedade_leve: ['apoio_psicologico_ubs', 'grupos_comunitarios_saude_mental', 'cvv', 'academiadasaude'],
  ansiedade_moderada: ['nasf', 'apoio_psicologico_ubs', 'cvv', 'academiadasaude'],
  ansiedade_grave: ['caps', 'nasf'],
  tristeza_passageira: ['apoio_psicologico_ubs', 'cvv', 'grupos_comunitarios_saude_mental'],
  depressao_leve: ['apoio_psicologico_ubs', 'nasf', 'grupos_comunitarios_saude_mental'],
  depressao_moderada: ['nasf', 'apoio_psicologico_ubs', 'caps'],
  depressao_grave: ['caps', 'nasf'],
  estresse: ['apoio_psicologico_ubs', 'academiadasaude', 'grupos_comunitarios_saude_mental'],
  crise_emocional: ['cvv', 'apoio_psicologico_ubs', 'caps'],
  baixa_energia: ['pnan', 'nasf', 'academiadasaude'],
  vulnerabilidade_social: ['pnps', 'nasf', 'pnan', 'academiadasaude'],
  prevencao: ['pnps', 'academiadasaude', 'pnan'],
}

/**
 * Guia de atividades físicas recomendadas por perfil
 */
export const activityRecommendations = {
  iniciante_sedentario: {
    type: 'Iniciante',
    activities: [
      'Caminhada leve 15-20 min/dia, 3x/semana',
      'Alongamento e exercícios de mobilidade 10 min/dia',
      'Exercícios de respiração e relaxamento',
    ],
    intensity: 'Leve a moderada',
    frequency: '3-4x por semana',
    progressao: 'Aumentar gradualmente para 30 min, 5x/semana em 8 semanas',
  },
  moderado: {
    type: 'Moderado',
    activities: [
      'Caminhada rápida ou corrida leve 30-40 min, 4-5x/semana',
      'Exercícios de força (peso corporal) 2-3x/semana',
      'Alongamento diário',
      'Atividades recreativas (dança, natação, ciclismo)',
    ],
    intensity: 'Moderada',
    frequency: '4-5x por semana',
    progressao: 'Incluir treinos intervalados e aumentar intensidade gradualmente',
  },
  avancado: {
    type: 'Avançado',
    activities: [
      'Treino cardiovascular intenso 40-60 min, 4-5x/semana',
      'Treino de força com sobrecarga 3-4x/semana',
      'Exercícios funcionais e flexibilidade',
      'Esportes de alta intensidade',
    ],
    intensity: 'Moderada a alta',
    frequency: '5-6x por semana',
    progressao: 'Periodização e variação de estímulos',
  },
  condicoes_cronicas: {
    type: 'Com condições crônicas (diabetes, hipertensão, obesidade)',
    activities: [
      'Caminhada moderada 30 min, 5x/semana',
      'Exercícios de força leves a moderados 2-3x/semana',
      'Yoga ou tai chi chuan 2x/semana',
      'Exercícios aquáticos (hidroginástica)',
    ],
    intensity: 'Leve a moderada, com acompanhamento médico',
    frequency: '5x por semana (mínimo 150 min/semana)',
    progressao: 'Sempre com orientação médica e profissional de educação física',
    important: 'IMPORTANTE: Consulte seu médico antes de iniciar qualquer programa de exercícios',
  },
}

/**
 * Guia de nutrição baseado em PNAN
 */
export const nutritionRecommendations = {
  geral: {
    type: 'Recomendações Gerais (Guia Alimentar Brasileiro)',
    principles: [
      'Prefira alimentos in natura ou minimamente processados',
      'Use óleos, gorduras, sal e açúcar em pequenas quantidades',
      'Limite o consumo de alimentos processados',
      'Evite alimentos ultraprocessados',
      'Coma com regularidade e atenção, em ambientes apropriados',
      'Compre em locais que ofertem alimentos in natura (feiras, mercados locais)',
      'Desenvolva, exercite e partilhe habilidades culinárias',
    ],
    examples: 'Arroz, feijão, frutas, legumes, verduras, ovos, carnes frescas, leite, castanhas, sementes',
  },
  sobrepeso_obesidade: {
    type: 'Para Sobrepeso/Obesidade',
    focus: [
      'Reduzir consumo de alimentos ultraprocessados (refrigerantes, salgadinhos, fast-food)',
      'Aumentar consumo de frutas, legumes e verduras',
      'Controlar tamanho das porções',
      'Evitar bebidas açucaradas',
      'Preferir água como principal bebida',
      'Mastigar bem e comer devagar',
      'Evitar comer assistindo TV ou usando celular',
    ],
    meal_pattern: 'Café da manhã completo, almoço balanceado, jantar leve, 2 lanches saudáveis',
  },
  diabetes: {
    type: 'Para Diabetes',
    focus: [
      'Preferir carboidratos complexos (arroz integral, batata doce, aveia)',
      'Incluir fibras em todas as refeições',
      'Evitar açúcares e doces',
      'Controlar horários das refeições',
      'Combinar carboidratos com proteínas',
      'Monitorar glicemia conforme orientação médica',
    ],
    avoid: 'Açúcar, refrigerantes, doces, massas brancas, sucos industrializados',
  },
  hipertensao: {
    type: 'Para Hipertensão',
    focus: [
      'Reduzir consumo de sal (máximo 5g/dia)',
      'Evitar alimentos industrializados ricos em sódio',
      'Aumentar consumo de potássio (banana, abacate, feijão)',
      'Consumir mais frutas e vegetais',
      'Manter peso saudável',
      'Limitar álcool',
    ],
    avoid: 'Sal em excesso, embutidos, enlatados, temperos prontos, fast-food',
  },
  baixa_energia: {
    type: 'Para Aumentar Energia',
    focus: [
      'Não pular refeições, especialmente café da manhã',
      'Incluir carboidratos complexos (aveia, batata doce, arroz integral)',
      'Consumir proteínas magras (frango, peixe, ovos, leguminosas)',
      'Incluir gorduras boas (abacate, castanhas, azeite)',
      'Hidratar-se adequadamente (2-3L água/dia)',
      'Incluir alimentos ricos em ferro (carnes, feijão, vegetais verde-escuros)',
    ],
    meal_timing: 'Fazer refeições a cada 3-4 horas para manter energia estável',
  },
}

export default {
  publicHealthPrograms,
  conditionToServicesMap,
  activityRecommendations,
  nutritionRecommendations,
}

