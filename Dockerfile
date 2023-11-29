# Use uma imagem do Node.js com a versão mais recente disponível
FROM node:alpine

# Remova o symlink existente do Yarn (se existir)
RUN rm -f /usr/local/bin/yarnpkg

# Instale o Yarn diretamente do repositório de pacotes Alpine
RUN apk add --no-cache yarn

# Instale uma versão mais recente do Node.js
RUN apk add --no-cache nodejs

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
