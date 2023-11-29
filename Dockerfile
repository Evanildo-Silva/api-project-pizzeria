# Use uma imagem do Node.js com uma versão específica
FROM node:16-alpine

# Remova o symlink existente do Yarn (se existir)
RUN rm -f /usr/local/bin/yarnpkg

# Instale o Yarn diretamente do repositório de pacotes Alpine
RUN apk add --no-cache yarn

# Remova o symlink existente do Yarn (se existir)
RUN rm -f /usr/local/bin/yarnpkg

# Instale o Yarn diretamente do repositório de pacotes Alpine
RUN apk add --no-cache yarn

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY . .

# Instale as dependências usando o Yarn
RUN yarn install

# Build da aplicação
RUN yarn build

# Adicione o comando para rodar as migrações (exemplo com TypeORM)
RUN sleep 10 && yarn typeorm -- -d src/shared/infra/typeorm/index.ts migration:run

# Exponha a porta necessária pela sua aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
