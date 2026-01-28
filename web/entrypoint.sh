#!/bin/sh
set -e

# -------------------------------
# 1️⃣ Definir variáveis de ambiente
# -------------------------------
# Exemplo: passar via docker run -e BACKEND_URL=...
#: "${BACKEND_URL:=}"
#: "${SALAO_ID:=}"
#: "${CLIENTE_ID:=}"
#: "${COLABORADOR_ID:=}"
#: "${BUCKET_URL:=}"

# -------------------------------
# 2️⃣ Gerar env.js a partir do template
# -------------------------------

envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# -------------------------------
# 4️⃣ Adicionar timestamp no index.html (cache bust)
# -------------------------------
# Substitui {{TIMESTAMP}} na tag do script env.js
TIMESTAMP=$(date +%s)
if grep -q "{{TIMESTAMP}}" /usr/share/nginx/html/index.html; then
  sed -i "s/{{TIMESTAMP}}/$TIMESTAMP/g" /usr/share/nginx/html/index.html
  echo "✅ Query string de cache-bust adicionada: v=$TIMESTAMP"
fi

# -------------------------------
# 6️⃣ Iniciar o Nginx em foreground
# -------------------------------
echo "🚀 Iniciando Nginx..."
exec "$@"