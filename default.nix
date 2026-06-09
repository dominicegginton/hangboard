{ lib
, stdenv
, zip
}:

stdenv.mkDerivation rec {
  pname = "hangboard";
  version = "1.0.0";

  src = ./.;

  nativeBuildInputs = [ zip ];

  installPhase = ''
    mkdir -p $out/share/suuntoplus
    zip -r $out/share/suuntoplus/hangboarding.zapp . -x "default.nix" -x "flake.nix" -x "flake.lock" -x "result"
  '';

  meta = {
    description = "Hangboarding SuuntoPlus sports app";
    homepage = "https://github.com/dominicegginton/hangboard";
    license = lib.licenses.mit;
    maintainers = [ "dominicegginton" ];
  };
}
