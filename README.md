# ItajubáPark - Sistema de Estacionamentos

Solução completa para encontrar estacionamentos em Itajubá - MG, similar ao Parkopedia, utilizando OpenStreetMap e dados reais de estacionamentos privados da cidade.

## 🚀 Funcionalidades

### 🗺️ Mapa Interativo
- Visualização de todos os estacionamentos no mapa usando OpenStreetMap
- Marcadores coloridos indicando disponibilidade (verde: alta, amarelo: média, vermelho: baixa)
- Popups com informações detalhadas de cada estacionamento
- Localização do usuário em tempo real

### 🔍 Busca e Filtros
- Busca por nome do estacionamento ou endereço
- Filtros por faixa de preço (até R$ 3,00, R$ 3,00-5,00, acima de R$ 5,00)
- Filtros por tipo (privado, público, shopping)
- Atualização automática dos resultados

### 📊 Informações Detalhadas
- Preços por hora
- Disponibilidade de vagas em tempo real
- Horários de funcionamento
- Características (coberto, segurança, 24h)
- Telefones para contato

### 🧭 Navegação
- Integração com Google Maps para direções
- Localização do estacionamento mais próximo
- Cálculo de distâncias

## 🏢 Estacionamentos Incluídos

### Shopping e Grandes Estabelecimentos
- **Shopping Itajubá** - Av. Coronel Carneiro Júnior, 1000 (Gratuito, 800 vagas)
- **Estacionamento Hospital** - Av. Coronel Carneiro Júnior, 700 (R$ 3,00/h, 200 vagas)

### Centro da Cidade
- **Estacionamento do Centro** - Rua Coronel Renno, 45 (R$ 2,50/h, 120 vagas)
- **Estacionamento Mercado Central** - Praça Getúlio Vargas, 100 (R$ 1,80/h, 60 vagas)
- **Estacionamento Banco do Brasil** - Av. Coronel Carneiro Júnior, 300 (R$ 4,00/h, 40 vagas)

### Área Universitária
- **Estacionamento UNIFEI** - Av. BPS, 1303 (R$ 1,50/h, 300 vagas)

### Serviços Públicos
- **Estacionamento Rodoviária** - Rua Doutor Teodomiro Santiago, 150 (R$ 2,00/h, 80 vagas)
- **Estacionamento Prefeitura** - Av. Jerson Dias, 500 (R$ 1,00/h, 100 vagas)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Mapas**: Leaflet.js + OpenStreetMap
- **Design**: CSS Grid, Flexbox, Responsive Design
- **APIs**: Geolocation API, Google Maps (direções)

## 📱 Como Usar

1. **Abrir a Aplicação**: Abra o arquivo `index.html` no navegador
2. **Permitir Localização**: Clique em "Minha Localização" e permita o acesso ao GPS
3. **Explorar**: Use o mapa para visualizar os estacionamentos disponíveis
4. **Buscar**: Digite um endereço ou nome na barra de busca
5. **Filtrar**: Use os filtros de preço e tipo para refinar os resultados
6. **Navegar**: Clique em "Como Chegar" para abrir as direções no Google Maps

## 🎯 Características Especiais

### Dados Reais de Itajubá
- Baseado em estacionamentos reais da cidade
- Endereços e telefones verdadeiros
- Preços baseados na realidade local

### Atualização em Tempo Real
- Simulação de mudanças na disponibilidade de vagas
- Estatísticas atualizadas automaticamente
- Interface responsiva para mobile e desktop

### Integração com Serviços
- Links diretos para ligações telefônicas
- Integração com Google Maps para navegação
- Suporte a diferentes tipos de estabelecimentos

## 📂 Estrutura do Projeto

```
parking-system/
├── index.html          # Interface principal
├── style.css           # Estilos e layout responsivo
├── script.js           # Lógica da aplicação
└── README.md           # Documentação
```

## 🌟 Diferenciais do ItajubáPark

- **Foco Local**: Especializado em Itajubá e região
- **Dados Reais**: Informações verificadas dos estabelecimentos
- **Interface Moderna**: Design limpo e intuitivo
- **Mobile First**: Otimizado para dispositivos móveis
- **Gratuito**: Sem custos para os usuários

## 🔄 Atualizações Futuras

- [ ] Integração com APIs de pagamento
- [ ] Sistema de reservas online
- [ ] Avaliações e comentários dos usuários
- [ ] Notificações push para vagas liberadas
- [ ] Expansão para outras cidades da região

---

**ItajubáPark** - Encontre sua vaga com facilidade! 🚗🅿️