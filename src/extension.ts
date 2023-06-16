import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

interface FileTemplate {
 name: string;
 content: string;
}

interface FolderTemplate {
 name: string;
 files?: (FolderTemplate | FileTemplate)[];
}

interface Template {
 name: string;
 description: string;
 folderName: string;
 structure: (FolderTemplate | FileTemplate)[];
}

function readTemplates(context: vscode.ExtensionContext): Template[] {
 const homeDir = os.homedir();
 const extensionDir = path.join(homeDir, '.myextension');
 const templatesPath = path.join(extensionDir, 'templates.json');

 const templatesData = fs.readFileSync(templatesPath, 'utf-8');

 const templates = JSON.parse(templatesData, (key, value) => {
  if (key === 'structure' && Array.isArray(value)) {
   return value as (FolderTemplate | FileTemplate)[];
  }
  return value;
 }) as Template[];

 return templates;
}

export function activate(context: vscode.ExtensionContext) {
 const homeDir = os.homedir();
 const extensionDir = path.join(homeDir, '.myextension');
 const templatesPath = path.join(extensionDir, 'templates.json');

 if (!fs.existsSync(extensionDir)) {
  fs.mkdirSync(extensionDir);
 }

 if (!fs.existsSync(templatesPath)) {
  const defaultTemplates = getDefaultTemplates();
  fs.writeFileSync(templatesPath, JSON.stringify(defaultTemplates, null, 2));
 }

 let disposable = vscode.commands.registerCommand(
  'react-component-template.reactComponentTemplate',
  async (folder: vscode.Uri) => {
   const folderPath = folder.fsPath;

   const templates = readTemplates(context);

   const templateItems: vscode.QuickPickItem[] = templates.map((template) => ({
    label: template.name,
    description: template.description,
   }));

   const selectedTemplate = await vscode.window.showQuickPick(templateItems, {
    placeHolder: 'Selecione um template',
   });

   if (!selectedTemplate) {
    return;
   }

   const template = templates.find((t) => t.name === selectedTemplate.label);

   if (!template) {
    return;
   }

   const folderName = await vscode.window.showInputBox({
    placeHolder: 'Digite o nome da pasta',
   });

   if (!folderName) {
    vscode.window.showInformationMessage('Nome de pasta é obrigatório.');
    return;
   }

   const templateFolderPath = path.join(
    folderPath,
    template.folderName.replace(/__folderName__/g, folderName)
   );

   if (fs.existsSync(templateFolderPath)) {
    const confirmReplace = await vscode.window.showWarningMessage(
     `Uma pasta com o nome '${folderName}' já existe. Deseja substituir?`,
     { modal: true },
     'Sim',
     'Não'
    );

    if (confirmReplace !== 'Sim') {
     return; // Cancelar a criação do template
    }
   }

   try {
    fs.mkdirSync(templateFolderPath, { recursive: true });
    createTemplateStructure(templateFolderPath, template.structure, folderName);

    vscode.window.showInformationMessage('Template criado com sucesso!');
   } catch (error) {
    vscode.window.showErrorMessage(
     `Ocorreu um erro ao criar o template: ${error}`
    );
   }
  }
 );

 let disposableOpenTemplate = vscode.commands.registerCommand(
  'react-component-template.openTemplate',
  async () => {
   const homeDir = os.homedir();
   const extensionDir = path.join(homeDir, '.myextension');
   const templatesPath = path.join(extensionDir, 'templates.json');

   if (fs.existsSync(templatesPath)) {
    let document = await vscode.workspace.openTextDocument(templatesPath);
    await vscode.window.showTextDocument(document);
   } else {
    vscode.window.showErrorMessage(
     `O arquivo de template não existe: ${templatesPath}`
    );
   }
  }
 );

 context.subscriptions.push(disposable);
 context.subscriptions.push(disposableOpenTemplate);
}

function createTemplateStructure(
 parentFolderPath: string,
 structure: (FolderTemplate | FileTemplate)[],
 folderName: string
) {
 for (const item of structure) {
  const itemName = item.name.replace(/__folderName__/g, folderName);
  if ('files' in item) {
   // Trate 'item' como uma pasta
   const folderPath = path.join(parentFolderPath, itemName);
   if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
   }
   if (item.files) {
    createTemplateStructure(folderPath, item.files, folderName);
   }
  } else {
   // Trate 'item' como um arquivo
   const filePath = path.join(parentFolderPath, itemName);
   if ('content' in item) {
    fs.writeFileSync(
     filePath,
     item.content.replace(/__folderName__/g, folderName)
    );
   } else {
    fs.writeFileSync(filePath, '');
   }
  }
 }
}

function getDefaultTemplates(): Template[] {
 // Implemente esta função para retornar os templates padrões.
 return [
  {
   name: 'React Component Template',
   description:
    'Template de exemplo para criar componentes React com estrutura básica',
   folderName: '__folderName__',
   structure: [
    {
     name: 'helps',
     files: [],
    },
    {
     name: 'hooks',
     files: [
      {
       name: 'useData.ts',
       content: 'export const useData = () => {};',
      },
     ],
    },
    {
     name: 'Controller.tsx',
     content:
      "import { Layout } from './Layout';\n// import { useData } from './hooks/useData';\n\nexport function Controller() {\n  // const { data } = useData();\n  return <Layout />;\n}",
    },
    {
     name: 'Layout.tsx',
     content:
      'import { Container } from "./styles"\n\nexport function Layout() {\n  return <Container />;\n}',
    },
    {
     name: 'styles.ts',
     content:
      "import styled from 'styled-components';\n\nexport const Container = styled.div``;",
    },
    {
     name: 'index.ts',
     content:
      "import { Controller } from './Controller';\n\n(Controller as any).displayName = '__folderName__';\n\nexport { Controller as __folderName__ };",
    },
    {
     name: 'types.ts',
     content: '// Example types file',
    },
   ],
  },
 ];
}
