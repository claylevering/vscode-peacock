import * as vscode from 'vscode';

import { applyColor } from '../apply-color';
import { State } from '../models';
import { getPeacockRemoteColor, getPeacockColor } from '../configuration';

// function remoteExtensionsInstalled(): boolean {
//   let remoteExtensions = [
//     'ms-vscode-remote.remote-containers',
//     'ms-vscode-remote.remote-ssh',
//     'ms-vscode-remote.remote-wsl',
//   ];
//   return !!remoteExtensions.find(each => !!vscode.extensions.getExtension(each));
// }

export async function addRemoteIntegration(context: vscode.ExtensionContext) {
  State.extensionContext = context;

  // const remoteExtensions = remoteExtensionsInstalled();
  // await vscode.commands.executeCommand('setContext', 'peacock:remote', remoteExtensions);

  // Only apply on activation if a color is actually configured. Passing
  // undefined to applyColor() triggers unapplyColors() (via the
  // isValidColorInput check), which WIPES workbench.colorCustomizations.
  // That's destructive on every fresh install / reactivate where peacock.color
  // was cleared but colorCustomizations still has peacock keys lingering.
  // Wiping is a user-initiated action (Reset / Remove commands), not an
  // activation effect.
  if (vscode.env.remoteName) {
    const remoteColor = getPeacockRemoteColor() || getPeacockColor();
    if (remoteColor) {
      await applyColor(remoteColor);
    }
  } else {
    const peacockColor = getPeacockColor();
    if (peacockColor) {
      await applyColor(peacockColor);
    }
  }
}
