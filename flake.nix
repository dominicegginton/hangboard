{
  description = "Hangboarding SuuntoPlus sports app";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, ... }:
    let
      inherit (nixpkgs) lib;
      systems = lib.systems.flakeExposed;
      forAllSystems = lib.genAttrs systems;
      nixpkgsFor = forAllSystems (system: import nixpkgs {
        inherit system;
        overlays = [ self.outputs.overlays.default ];
      });
    in
    {
      formatter = forAllSystems (system: nixpkgsFor.${system}.nixpkgs-fmt);

      overlays.default = final: _: {
        hangboard = final.callPackage ./default.nix { };
      };

      packages = forAllSystems (system: {
        default = nixpkgsFor.${system}.hangboard;
      });
    };
}
