# Use a imagem Node.js como base
FROM node:14-alpine

# Remova o binário existente do Yarn (se existir)
RUN rm -f /usr/local/bin/yarn

# Instale o Yarn globalmente
RUN npm install -g yarn

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY . .

# Instale as dependências usando o Yarn
RUN yarn install

# Build da aplicação
RUN yarn build

# Exponha a porta necessária pela sua aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
