FROM node:23-alpine AS builder

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]