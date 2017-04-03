cd client
rm -rf node_modules
npm install -g angular-cli@1.0.0-beta.25.5
npm install
ng build --prod --aot
cd ..