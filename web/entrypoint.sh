#!/bin/sh
set -e

# Gera env.js
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# Agora inicia o nginx
echo "✅ "inicializando nginx"
exec "$@"