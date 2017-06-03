Youtube API utilizando Vue.js

[Demonstração](https://youtubeapiwithvue.firebaseapp.com)

## Build Setup

Necessário node.js e npm instalado.

``` bash
# instalar dependencias
npm install

# build dev com hot deploy
npm run dev

# build produção
npm run build

Após o build produção copie e cole os arquivos para pasta server
"index.html" > "server/public/index.html" 
"dist/build.js" > "server/public/dist/build.js" 

#Configuração de chave - API Youtube
Adicione sua chave no arquivo VideoService.js (Caminho: src/components/shared/VideoService.js)

``` bash
# subir servidor
npm start
```


