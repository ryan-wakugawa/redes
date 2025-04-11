# Etapa 1: build do frontend
FROM node:23-alpine
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

CMD ["npx", "vite", "--host"]

EXPOSE 8080
