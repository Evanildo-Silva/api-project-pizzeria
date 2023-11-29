# Use a imagem Node.js como base
FROM node:14-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY . .

# Instale as dependências
RUN npm install

# Build da aplicação
RUN npm run build

# Exponha a porta necessária pela sua aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
