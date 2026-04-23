# O Projeto: Hub de Ferramentas - Dufrio ❄️

**Atenção IA (Instruções de Contexto Inicial):** Ao iniciar qualquer conversa, leia este documento primeiro. Ele contém a topologia e a arquitetura desse repositório para que não seja preciso pedir explicações ao usuário ou ficar investigando arquivos de configuração. Você está lidando com um ambiente que opera exclusivamente via Client-Side Web (HTML/CSS/JS puros) interligado localmente por meio de scripts de automação de lotes (.bat) para CI/CD e uma extensão de navegador própria.

---

## 1. Visão Geral
Trata-se de um painel/dashboard criado pelo Thiago para centralizar diversas pequenas aplicações utilitárias focadas nas áreas de "Câmaras Frias" e "Ar Condicionado" dentro da rotina/lojas da rede **Dufrio**.

O repositório **NÃO possui backend ativo** (Node.js, PHP, Python), o que significa que nenhum arquivo do servidor ou API local pode ser criado ou esperado. Tudo funciona a partir do download do repositório por parte do usuário e a execução das rotinas localmente.

### 1.1 Estética Visual Inegociável
- **UI/UX:** O estilo do hub principal (`index.html`) é escuro (Dark Mode), utiliza tipografia do Google Fonts (Outfit), com caixas no estilo `bento-grid`, e efeitos de blur ("glassmorphism"), neon suave contornando as bordas via gradientes lineares. Ao criar ou modificar telas, é **mandatório** preservar o estilo premium moderno, escuro e vibrante.

---

## 2. Estrutura do Hub e Endpoints Frontend

O Hub se ramifica em pequenas aplicações independentes (Single Page Applications) contidas na mesma pasta, cada uma focada em resolver um problema comercial ou logístico específico.

### ⚙️ Divisão de Câmaras Frias
* **`CheckList.html`**: Formulário Step-by-Step avançado de captação de requisitos para projetos de refrigeração. Ao final, compila todos os dados coletados em um documento PDF profissional utilizado pela equipe comercial para emissão de orçamentos.
* **`simulador-gabinete.html`**: Motor visual/3D projetado para a simulação interativa e montagem de layouts de painéis térmicos (Poliuretano/EPS) e gabinetes de câmaras frias.
* **`plano-corte.html`**: Otimizador matemático inteligente. Focado em logística de fábrica, ele calcula o melhor aproveitamento de cortes para chapas de 12 metros de isolamento térmico, minimizando o desperdício de retalhos.

### 💨 Divisão de Ar Condicionado
* **`scraper-ar.html`** (⚠️ **Crucial/Core**): Uma ferramenta avançada de Scraping Client-Side. Sincroniza dinamicamente dados de categorização via Google Sheets (`OpenSheet`), constrói uma UI interativa e de divulgação progressiva (Progressive Disclosure) para escolha de Tipo, BTUs e Ciclo. Em seguida, utiliza `corsproxy.io` e `DOMParser` para fazer raspagem (scraping) em tempo real dos sites concorrentes (ex: Dufrio), extraindo nome, imagem e preços (à vista e parcelado), plotando "Product Cards" amigáveis que permitem cópia com 1 clique.
* **`comparador-ar.html`**: Painel focado em cruzar e alinhar as informações de concorrência extraídas contra o cenário local, ajudando em decisões de pricing.
* **`precos-ao-vivo.html`**: Página consumidora e dashboard que faz ponte direta com a extensão de navegador do Chrome (Background Workers), recebendo Skus e Preços atualizados no momento exato da navegação do usuário nos sites das lojas.
* **`precificacao-ar.html`**: Calculadora financeira paramétrica para formação e composição rápida de preços de itens voltados ao site principal/B2C (365).

### 📦 Utilitários Gerais
* **`cotacoes.html`**: Orçamentador expresso e modular focado exclusivamente em levantar quantitativos e custos para a montagem e infraestrutura de instalação de aparelhos modelo Split.
* **`itens-quantidade.html`**: Filtro tático de engenharia/vendas que faz triagem rápida de códigos e SKUs baseados puramente no estoque disponível atual.

---

## 3. O Componente Vital: A Extensão de Navegador Própria
Na raiz do projeto está uma pasta `extensao`. 
Ela é uma extensão genuína Google Chrome/Edge com Manifest (`manifest.json`), Content Scripts (`content.js`), Background Workers (`background.js`) e lógicas de carrinho de compras (`cart.js`). Muitas das automações de preços cruzam ponte com páginas de fora (como sites de concorrentes) manipulando o DOM remoto para trazer dados aos formulários de `index.html`. Nunca quebre as portas de mensagem "chrome.runtime" entre Background e Frontend se decidir inspecioná-la!

---

## 4. O Sistema de CI/CD (Pipeline Automatizado)
O Thiago elaborou uma engenhosa máquina de estado distribuída que interliga comandos do Windows e do Git para automatizar atualizações e logs sem instalação de pacotes npm complexos.

**REGRA DE OURO PARA IAs (OBRIGATÓRIO PRESTAR ATENÇÃO):**

Se houver uma tarefa para modificar códigos HTML ou lógicas no repositório, você (IA Assistente), ao concluir seu raciocínio, deve **SEMPRE**, como última ação, SOBRESCREVER o conteúdo do arquivo `mensagem_atualizacao.txt` que fica na raiz com um resumo de 1 linha da sua alteração.
Exemplo: _"Botão de orçamentos estilizado para amarelo no checkout"_. 

**Aqui está como a arquitetura do Thiago se comporta e como seu resumo será consumido:**
1. A IA sobreescreve o texto de `mensagem_atualizacao.txt`.
2. **REGRA CRÍTICA:** A IA **não deve** tentar rodar comandos git ou de terminal. Ao terminar, ela apenas avisa o Thiago e pede para ele clicar no arquivo `Enviar_GitHub.bat`.
3. O Thiago dará duplo clique em `Enviar_GitHub.bat` no desktop dele.
4. O `.bat` consome o `mensagem_atualizacao.txt` e usa-o como `git commit -F`.
5. O `.bat` roda o `git log` e gera o `ultimo_log.js`.
6. Em seguida realiza o Push & Pull automaticamente.

Se você apagar os blocos de importação do `ultimo_log.js` que interagem no "tooltip do rodapé" no arquivo `index.html`, ou esquecer de preencher o arquivo `.txt`, a cascata de notificações do usuário quebrará. NUNCA DEIXE DE EDITAR O `.txt`.
