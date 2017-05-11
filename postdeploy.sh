cd client
rm -rf node_modules
npm install -g angular-cli@1.0.0-beta.25.5
npm install
nodejs node_modules/node-sass/scripts/install.js
npm rebuild node-sass
ng build --prod --aot
cd ..