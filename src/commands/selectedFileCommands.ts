import * as vscode from 'vscode';
import { Repository } from '../vscodeGit/git';
import { getRepoForFile } from '../vscodeGit/vscodeGit';

/**
 * Maps the selected files to their respective repositories.
 * @param selectedFiles The files that were selected in the explorer. 
 * @returns A map of the selected files grouped by their respective repositories.
 */
function mapFilesByRepository(selectedFiles: vscode.Uri[]) {
  const filesByRepo = new Map<Repository, string[]>();

  for (const file of selectedFiles) {
    const repo = getRepoForFile(file);

    if (repo) {
      const files = filesByRepo.get(repo) ?? [];
      files.push(file.fsPath);
      filesByRepo.set(repo, files);
    }
  }

  return filesByRepo;
}

/**
 * Command that stages the currently selected files (in the explorer view) to the Git active repository.
 * - Used as a explorer context menu command and works for multiple files.
 * - Equivalent to a `git add` command.
 * @param _rightClickedFile The file that was right clicked on in the explorer.
 * @param selectedFiles The files that were selected in the explorer.
 */
export function stageSelectedFiles(_rightClickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) {
  const filesByRepo = mapFilesByRepository(selectedFiles);

  for (const [repo, files] of filesByRepo) {
    repo.add(files);
    console.log(`Staged files: ${files}`);
  }
}

/**
 * Command that unstages the currently selected files (in the explorer view) to the Git active repository.
 * @param _rightClickedFile The file that was right clicked on in the explorer.
 * @param selectedFiles The files that were selected in the explorer.
 */
export function unstageSelectedFiles(_rightClickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) {
  const filesByRepo = mapFilesByRepository(selectedFiles);

  for (const [repo, files] of filesByRepo) {
    repo.revert(files);
    console.log(`Unstaged files: ${files}`);
  }
}
