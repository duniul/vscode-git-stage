import * as vscode from 'vscode';
import { stageCurrentFileCommand, unstageCurrentFileCommand } from './commands/currentFileCommands';
import { stageSelectedFiles, unstageSelectedFiles } from './commands/selectedFileCommands';

const EXTENSION_NAME = 'git-stage';

function registerCommand(commandId: string, command: (...args: any[]) => any) {
  return vscode.commands.registerCommand(`${EXTENSION_NAME}.${commandId}`, command);
}

/**
 * Function that gets called when the extension is activated.
 * All registered commands also need to be specified in the `contributes.commands` section of the package.json file.
 * @param context The context of the extension.
 */
export function activate(context: vscode.ExtensionContext) {
  const disposables = [
    registerCommand('stageCurrentFile', stageCurrentFileCommand),
    registerCommand('unstageCurrentFile', unstageCurrentFileCommand),
    registerCommand('stageSelectedFiles', stageSelectedFiles),
    registerCommand('unstageSelectedFiles', unstageSelectedFiles),
  ];

  context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
/**
 * Function that gets called when the extension is deactivated.
 */
export function deactivate() {}
