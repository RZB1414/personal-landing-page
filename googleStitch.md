# Guia do Google Stitch via MCP

O Google Stitch é acessado de forma nativa através do protocolo MCP (Model Context Protocol). **Não é necessário** utilizar uma interface de linha de comando (CLI) como `stitch-mcp-cli` ou via `npx`. O seu assistente de IA já se conecta diretamente e pode realizar todas as operações por você.

### 1. Configuração do Servidor MCP (`mcp_config.json`)
O servidor está configurado para o endereço oficial do Google (SSE - Server-Sent Events) utilizando a sua API Key como header:

```json
"stitch": {
  "serverUrl": "https://stitch.googleapis.com/mcp",
  "headers": {
    "X-Goog-Api-Key": "<SUA_GOOGLE_STITCH_API_KEY>"
  }
}
```

### 2. Comandos e Ferramentas (Tools) Disponíveis

Em vez de rodar comandos no seu terminal, basta pedir para a IA executar qualquer uma das ações abaixo. Temos acesso direto aos seguintes comandos:

#### 📁 Gestão de Projetos
- **Listar Projetos** (`list_projects`): Lista todos os projetos disponíveis (ou compartilhados com você).
- **Obter Projeto** (`get_project`): Resgata os destalhes, instâncias e identificadores de um projeto específico.
- **Criar Projeto** (`create_project`): Inicia um novo workspace/projeto do Stitch.

#### 📱 Criação e Edição de Telas
- **Listar Telas** (`list_screens`): Visualiza todas as telas associadas a um projeto.
- **Obter Tela** (`get_screen`): Visualiza em detalhes uma tela pelo seu ID.
- **Gerar Tela por Texto** (`generate_screen_from_text`): Gera o design/código de uma nova tela a partir de uma descrição textual detalhada.
- **Editar Telas** (`edit_screens`): Modifica e altera componentes de uma tela já existente, utilizando um prompt.
- **Gerar Variantes** (`generate_variants`): Cria diferentes versões baseadas numa mesma tela (ex: experimentando estilos diferentes ou variações móvel/desktop).

#### 🎨 Design Systems Corporativos e Estilo
- **Listar Design Systems** (`list_design_systems`): Retorna as bibliotecas de estilo de um projeto específico ou de acesso global.
- **Criar / Atualizar Design System** (`create_design_system` / `update_design_system`): Configura os fundamentos visuais como:
  - Cores (Paleta primária, cores no Light mode / Dark mode).
  - Tipografia (Famílias de fontes).
  - Bordas (arredondamento/shapes de botões).
- **Aplicar Design System** (`apply_design_system`): Aplica o estilo global recém-configurado nas telas desejadas dentro de um projeto.

---

### Exemplo de Uso Prático com a IA
Apenas escreva algo como:
- *"IA, liste todos os meus projetos do Stitch para vermos os IDs."*
- *"Acesse meu projeto `4044680...` e crie uma tela de login com visualização responsiva para mobile."*
- *"Edite o Design System atual para ter um tema dark e botões arredondados."*
