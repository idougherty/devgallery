{ pkgs ? import <nixpkgs> { config = { allowUnfree = true; }; } }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [ nodejs vscode ];
  shellHook = ''
    export GIT_SSH_COMMAND="ssh -i ./.ssh/id_rsa"
  '';
}
