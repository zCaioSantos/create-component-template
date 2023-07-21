# Create Component Template

The Create Component Template extension for Visual Studio Code helps you quickly create file structures for any project, not just limited to React projects. With this extension, you can create templates for folders and files, which can be extremely useful for automating repetitive tasks and speeding up the process of creating new components, modules, or any other project structure.

###### Traduçao em PT-BR:

A extensão Create Component Template para o Visual Studio Code ajuda você a criar rapidamente a estrutura de arquivos para qualquer projeto, não se limitando apenas a projetos React. Com essa extensão, você pode criar templates de pastas e arquivos, o que pode ser extremamente útil para automatizar tarefas repetitivas e acelerar o processo de criação de novos componentes, módulos ou qualquer outra estrutura de projeto.

## Installation

To install the Create Component Template extension, open Visual Studio Code, click on the Extensions View icon, and search for 'Create Component Template'. Click on 'Install' to install the extension.

###### Traduçao em PT-BR:

Para instalar a extensão Create Component Template, abra o Visual Studio Code, clique no ícone de Visualização de Extensões e pesquise por 'Create Component Template'. Clique em 'Instalar' para instalar a extensão.

## Usage

To use the extension, navigate to the folder where you want to create the new component in the VSCode explorer. Right-click on the folder and select 'Create Component Template'. You will be prompted to provide a name for the new component. The extension will create the file structure for the new component in the selected folder.

###### Traduçao em PT-BR:

Para usar a extensão, navegue até a pasta onde você deseja criar o novo componente no explorador do VSCode. Clique com o botão direito na pasta e selecione 'Create Component Template'. Você será solicitado a fornecer um nome para o novo componente. A extensão criará a estrutura de arquivos para o novo componente na pasta selecionada.

## Creating New Templates

To create new templates, follow the instructions below:
You will have access to the folder name through the "**folderName**" variable, allowing you to use it within the 'content' field or in the 'folderName' field itself if you want the folder name to be dynamic.

1. Open the templates.json file located in the .myextension folder in your user's main directory.
2. Add a new JSON object with the following properties:

   - name: The name of your new template.
   - description: A brief description of the template.
   - folderName: The name of the folder that will be created for the new template. Use "**folderName**" as a placeholder for the name the user will provide.
   - structure: The folder and file structure of the template, using the same format as the provided example template.

3. Save the templates.json file.
4. Now you can select the new template when creating a component using the "Create Component Template" extension. Make sure to fill in the fields correctly and enjoy the quick and easy creation of React components!

###### Traduçao em PT-BR:

Para criar novos templates, siga as instruções abaixo:
Você terá acesso ao nome da pasta na variável "**folderName**", permitindo que você o utilize dentro do campo 'content' ou no próprio 'folderName', caso deseje que sua pasta não tenha um nome fixo.

1. Abra o arquivo templates.json localizado na pasta .myextension no diretório principal do seu usuário.
2. Adicione um novo objeto JSON com as seguintes propriedades:

   - name: O nome do seu novo template.
   - description: Uma descrição breve do template.
   - folderName: O nome da pasta que será criada para o novo template. Use "**folderName**" como um marcador para o nome da pasta que o usuário fornecerá.
   - structure: A estrutura de pastas e arquivos do template, usando o mesmo formato do template de exemplo fornecido.

3. Salve o arquivo templates.json.
4. Agora você pode selecionar o novo template ao criar um componente usando a extensão "Create Component Template". Certifique-se de preencher os campos corretamente e aproveite a criação rápida e fácil de componentes React!

## Configuration

Access the tab for editing/creating templates through the command "Open File Component Template".

###### Traduçao em PT-BR:

Acesso à aba de edição/criação de templates através do comando "Open File Component Template".

## Change Log

### 2.1.1

- Fixed a bug that prevented the recognition of the "**folderName**" variable in the 'content' field. Now the variable will be properly replaced in both the 'folderName' and 'content' fields, providing a more consistent experience when creating custom templates.
- Improved the 'content' format in templates to make it more readable and easy to understand when creating custom templates.

###### Traduçao em PT-BR:

- Corrigido bug que impedia o reconhecimento da variável "**folderName**" no campo 'content'. Agora a variável será substituída corretamente em ambos os campos 'folderName' e 'content', proporcionando uma experiência mais consistente ao criar novos templates personalizados.
- Melhorou o formato do 'content' nos templates para torná-lo mais legível e de fácil entendimento ao criar novos templates personalizados.

### 2.0.0

- Added the ability to create custom templates. Updated the extension to use the new template format, including 'folderName' as a placeholder for the folder name.

###### Traduçao em PT-BR:

- Adicionou a capacidade de criar templates personalizados. Atualizou a extensão para usar o novo formato de template, incluindo 'folderName' como um marcador para o nome da pasta.

### 1.0.0

- Initial release of the extension.

###### Traduçao em PT-BR:

- Lançamento inicial da extensão.
