# ===============================
# STAGE 1 — BUILD (React)
# ===============================
FROM node:18-alpine AS build

WORKDIR /app

# Copia apenas manifests primeiro (melhor cache)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copia o restante do código
COPY . .

# Build de produção
RUN npm run build


# ===============================
# STAGE 2 — NGINX (runtime)
# ===============================
FROM nginx:alpine

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o build do React
COPY --from=build /app/build /usr/share/nginx/html

# Configuração SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Porta interna do container
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
