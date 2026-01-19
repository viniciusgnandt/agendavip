# ws/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["npm", "run", "serve"]