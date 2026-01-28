#!/bin/sh
set -e

envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

TIMESTAMP=$(date +%s)
if grep -q "{{TIMESTAMP}}" /usr/share/nginx/html/index.html; then
  sed -i "s/{{TIMESTAMP}}/$TIMESTAMP/g" /usr/share/nginx/html/index.html
  echo "✅ Query string de cache-bust adicionada: v=$TIMESTAMP"
fi

echo "🚀 Iniciando Nginx..."
exec "$@"