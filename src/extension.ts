import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let panel: vscode.WebviewPanel | undefined = undefined;

  // Command to open the WebView panel
  let disposable = vscode.commands.registerCommand(
    "imageCompressor",
    async () => {
      if (panel) {
        panel.reveal(vscode.ViewColumn.Two);
      } else {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        panel = vscode.window.createWebviewPanel(
          "imageCompressor", // Unique ID for the panel
          "Image Compressor", // Title of the panel
          vscode.ViewColumn.One, // Display the panel in the second column
          {
            enableScripts: true, // Enable JavaScript in the WebView
            retainContextWhenHidden: true, // Retain the panel's context when hidden
          }
        );

        panel.webview.html = `<iframe style="width: 100%; height: 100vh;" src="https://filezillow.com/"></iframe>`; // Set the HTML content for the WebView

        // Set the icon for the panel
        const iconPath = vscode.Uri.file(context.asAbsolutePath("fz.png"));
        panel.iconPath = iconPath;

        // Handle messages from the WebView

        // Dispose the panel when it's closed
        panel.onDidDispose(
          () => {
            panel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
