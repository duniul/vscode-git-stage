import * as vscode from 'vscode';
import type { GitExtension } from './git';

export function getVscodeGitApi() {
  const extension = vscode.extensions.getExtension<GitExtension>('vscode.git');

  if (!extension) {
    vscode.window.showErrorMessage('Failed to find vscode.git extension. Is it installed?');
    throw new Error('Failed to find vscode.git extension.');
  } else if (!extension.isActive) {
    vscode.window.showErrorMessage('vscode.git extension is deactivated, cannot add file.');
    throw new Error('vscode.git extension is not active.');
  }

  return extension.exports.getAPI(1);
}

export function getRepoForFile(uri: vscode.Uri) {
  return getVscodeGitApi().getRepository(uri);
}
