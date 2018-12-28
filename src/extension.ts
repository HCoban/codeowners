"use strict";
import { workspace, window, commands, ExtensionContext } from "vscode";
import fs = require("fs");
import { match } from "./helpers";

const readCodeOwners = () => {
  const { getConfiguration, rootPath } = workspace;
  const { codeOwnersPath: customCodeOwnersPath } = getConfiguration(
    "extension"
  );
  const codeOwnersPath = customCodeOwnersPath || `${rootPath}/.github`;

  fs.readFile(`${codeOwnersPath}/CODEOWNERS`, "utf8", (error, data) => {
    if (error) {
      // TODO display error message or report to bugsnag
      return;
    }

    const lines = data.split("\n");
    const codeOwner = findCodeOwner(lines);

    const message = lines && codeOwner ? codeOwner : "No code owner found";

    window.showInformationMessage(message);
  });
};

const findCodeOwner = (lines: string[]) => {
  for (let index = lines.length - 1; index >= 0; index--) {
    const { activeTextEditor } = window;
    if (!activeTextEditor) {
      return;
    }
    const line = lines[index];
    const pattern = line.split(" ")[0];
    const fileName = workspace.asRelativePath(
      activeTextEditor.document.fileName
    );
    if (fileName && match(pattern, fileName)) {
      return line
        .split(" ")
        .slice(1)
        .join(", ");
    }
  }
};

export const activate = (context: ExtensionContext) => {
  let disposable = commands.registerCommand("extension.displayOwner", () => {
    readCodeOwners();
  });

  context.subscriptions.push(disposable);
};

export function deactivate() {}
