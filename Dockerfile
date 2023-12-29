# Use uma imagem do Node.js com uma versão específica
FROM node:16-alpine

# Instale o Bash
RUN apk add --no-cache bash

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

# Exponha a porta necessária pela sua aplicação
EXPOSE 3000

# Adicione o wait-for-it
COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Adicione o comando para esperar o banco de dados e rodar as migrações
CMD ./wait-for-it.sh -t 30 tcp//admin:wsUqUATi6CxCBhUSWgq37ZTmj6mFIIda@dpg-clj7doug1b2c73anqufg-a/project_pizzeria:5432 -- yarn typeorm -- -d src/shared/infra/typeorm/index.ts migration:run && yarn start
