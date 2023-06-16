import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
 let disposable = vscode.commands.registerCommand(
  'react-component-template.reactComponentTemplate',
  async (folder: vscode.Uri) => {
   const folderPath = folder.fsPath;

   let componentName = await vscode.window.showInputBox({
    prompt: 'Nome do Componente',
   });

   // Se o usuário não forneceu um nome, abortamos a operação
   if (!componentName) {
    vscode.window.showErrorMessage(
     'Por favor, insira um nome para o componente.'
    );
    return;
   }

   // Verificar se o componente já existe
   const componentFolderPath = path.join(folderPath, componentName);
   if (fs.existsSync(componentFolderPath)) {
    const overwrite = await vscode.window.showErrorMessage(
     'Já existe um componente com esse nome. Deseja sobrescrever?',
     'Sim',
     'Não'
    );
    if (overwrite !== 'Sim') {
     return;
    }
    // Remover a pasta existente antes de criar uma nova
    fs.rmdirSync(componentFolderPath, { recursive: true });
   }

   fs.mkdirSync(componentFolderPath);
   fs.mkdirSync(path.join(componentFolderPath, 'hooks'));
   fs.mkdirSync(path.join(componentFolderPath, 'helpers'));

   fs.writeFileSync(
    path.join(componentFolderPath, 'Controller.tsx'),
    getControllerTemplate()
   );

   fs.writeFileSync(
    path.join(componentFolderPath, 'Layout.tsx'),
    getLayoutTemplate()
   );

   fs.writeFileSync(
    path.join(componentFolderPath, 'index.ts'),
    getIndexTemplate(componentName)
   );

   fs.writeFileSync(
    path.join(componentFolderPath, 'styles.ts'),
    getStylesTemplate()
   );

   fs.writeFileSync(
    path.join(componentFolderPath, 'mocks.ts'),
    getMocksTemplate()
   );

   fs.writeFileSync(
    path.join(componentFolderPath, 'data.ts'),
    getDataTemplate()
   );
  }
 );

 context.subscriptions.push(disposable);
}

function getControllerTemplate(): string {
 return `import { Layout } from './Layout';

export function Controller() {
 return <Layout />;
}`;
}

function getLayoutTemplate(): string {
 return `export function Layout() {
 return (
     <div>
         {/* Layout */}
     </div>
 );
}`;
}

function getIndexTemplate(componentName: string): string {
 return `import { Controller } from './Controller';

(Controller as any).displayName = '${componentName}';

export { Controller as ${componentName} };`;
}

function getStylesTemplate(): string {
 return `import styled, { keyframes } from 'styled-components';

export const Container = styled.div\`\`;`;
}

function getMocksTemplate(): string {
 return `export const mocks = {};`;
}

function getDataTemplate(): string {
 return `export const useData = () => {};`;
}
