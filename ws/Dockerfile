# ===== BUILD STAGE =====
FROM node:20-alpine AS build

WORKDIR /app

# Copia só os manifests
COPY package*.json ./

# Instala SOMENTE deps de produção
RUN npm ci --only=production

# Agora copia o código
COPY . .

# ===== RUNTIME STAGE =====
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário do stage de build
COPY --from=build /app .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]