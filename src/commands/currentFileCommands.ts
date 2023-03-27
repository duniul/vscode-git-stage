import * as vscode from 'vscode';
import { Repository } from '../vscodeGit/git';
import { getRepoForFile } from '../vscodeGit/vscodeGit';

const MISSING_FILE_EDITOR_ERROR = 'No file editor is open!';
const MISSING_REPO_ERROR = 'No repository found for the current file!';

/**
 * Gets the active repository and the currently open file.
 * @returns The active repository and the currently open file.
 */
function getRepoAndCurrentFile(): [Repository, vscode.Uri] {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage(MISSING_FILE_EDITOR_ERROR);
    throw new Error(MISSING_FILE_EDITOR_ERROR);
  }

  const uri = editor.document.uri;
  const repo = getRepoForFile(uri);

  if (!repo) {
    vscode.window.showErrorMessage(MISSING_REPO_ERROR);
    throw new Error(MISSING_REPO_ERROR);
  }

  return [repo, uri];
}

/**
 * Command that stages the currently open file in the Git active repository.
 * - Used as a commandPalette command.
 * - Equivalent to a `git add` command.
 */
export async function stageCurrentFileCommand() {
  const [repo, uri] = getRepoAndCurrentFile();

  if (repo) {
    await repo.add([uri.fsPath]);
  }

  console.log(`Staged file: ${uri.fsPath}`);
}

/**
 * Command that unstages the currently open file in the Git active repository.
 * - Used as a commandPalette command.
 * - Equivalent to a `git reset` command.
 */
export async function unstageCurrentFileCommand() {
  const [repo, uri] = getRepoAndCurrentFile();

  if (repo) {
    await repo.revert([uri.fsPath]);
  }

  console.log(`Staged file: ${uri.fsPath}`);
}
