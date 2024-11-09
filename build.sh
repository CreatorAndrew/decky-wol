pnpm run build
mkdir out out/DeckyWOL
cp -r dist out/DeckyWOL
cp -r defaults/bin out/DeckyWOL
cp LICENSE out/DeckyWOL
cp main.py out/DeckyWOL
cp p*.json out/DeckyWOL
cp README.md out/DeckyWOL
cd out
7z a DeckyWOL.zip DeckyWOL
rm -rf DeckyWOL
