#!/bin/sh
set -e

echo "🔐 Configurando OCI credentials..."

mkdir -p /root/.oci
chmod 700 /root/.oci

# Config
if [ -n "$OCI_CONFIG" ]; then
  echo "$OCI_CONFIG" | sed 's/\\n/\n/g' > /root/.oci/config
fi

echo "$OCI_API_KEY_PEM" > /root/.oci/oci_api_key.pem
echo "$OCI_API_KEY_PUBLIC_PEM" > /root/.oci/oci_api_key_public.pem

chmod 600 /root/.oci/*

echo "✅ OCI credentials configuradas"

exec "$@"