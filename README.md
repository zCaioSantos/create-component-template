# Create Component Template

A extensão Create Component Template para o Visual Studio Code ajuda você a criar rapidamente a estrutura de arquivos para qualquer projeto.

## Instalação

Para instalar a extensão React Component Template, abra o Visual Studio Code, clique no ícone de extensões (View icon) e procure por 'React Component Template'. Clique em 'Install' para instalar a extensão.

## Uso

### Criando um novo componente

1. Navegue até a pasta onde você deseja criar o novo componente no explorador de arquivos do VSCode.
2. Clique com o botão direito na pasta e selecione 'React Component Template'.
3. Você será solicitado a fornecer um nome para o novo componente e um nome para a pasta. Digite os nomes desejados.
4. A extensão criará a estrutura de arquivos para o novo componente na pasta selecionada, substituindo qualquer componente existente com o mesmo nome.

### Editando templates

Você pode editar os templates existentes ou criar seus próprios templates personalizados. Os templates são definidos em um arquivo JSON chamado `templates.json`. Siga as etapas abaixo para editar ou criar templates:

1. Abra o Visual Studio Code.
2. Clique no ícone de extensões (View icon) e procure por 'React Component Template'.
3. Clique com o botão direito na extensão e selecione 'Open Extension Settings'.
4. Na seção 'Templates', clique em 'Edit in settings.json'.
5. O arquivo `settings.json` será aberto com a configuração dos templates.
6. Edite os templates existentes ou adicione novos templates de acordo com sua preferência.
7. Salve o arquivo `settings.json`.

### Variáveis disponíveis

Ao criar ou editar templates, você pode usar as seguintes variáveis dentro dos nomes de arquivos e conteúdo:

- `__folderName__`: O nome da pasta fornecido pelo usuário ao criar um novo componente. Esta variável será substituída pelo nome da pasta real.
- `__componentName__`: O nome do componente fornecido pelo usuário ao criar um novo componente. Esta variável será substituída pelo nome do componente real.

Certifique-se de incluir essas variáveis nos nomes de arquivos e conteúdo conforme necessário para personalizar seus templates.

## Configuração

Atualmente, a extensão não oferece opções de configuração além da edição dos templates.

## Problemas Conhecidos

Não há problemas conhecidos no momento.

## Contribuição

Se você encontrou um problema ou tem uma sugestão de melhoria, por favor crie um problema no repositório do GitHub da extensão. Contribuições na forma de solicitações pull também são bem-vindas.

## Changelog

### 2.0.0

- Adicionada a funcionalidade de permitir que o usuário forneça um nome para a pasta do componente.
- Adicionada a verificação e confirmação antes de substituir uma pasta existente com o mesmo nome.
- Adicionada documentação sobre edição de templates e variáveis disponíveis.
