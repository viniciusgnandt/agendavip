#!/bin/sh

echo "🔧 Gerando env.js em runtime..."

envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

echo "✅ env.js gerado:"
cat /usr/share/nginx/html/env.js

exec "$@"