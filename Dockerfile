# Usa a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de dependências para o container
COPY package.json package-lock.json ./

# Instalar o pacote necessário do ngrok
RUN npm install -g @expo/ngrok

# Copia todo o código do projeto para o container
COPY . .

# Expõe a porta padrão do Metro Bundler (React Native)
EXPOSE 19000

# Comando para iniciar o Metro Bundler com túnel
CMD ["npx", "expo", "start", "--tunnel"]
