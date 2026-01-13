#!/bin/sh
set -e

echo "🔐 Configurando OCI credentials..."

mkdir -p /root/.oci
chmod 700 /root/.oci

# Config
if [ -n "$OCI_CONFIG" ]; then
  echo "$OCI_CONFIG" | sed 's/\\n/\n/g' > /root/.oci/config
fi

# Private key
if [ -n "$OCI_API_KEY" ]; then
  echo "$OCI_API_KEY" | sed 's/\\n/\n/g' > /root/.oci/oci_api_key.pem
fi

# Public key (opcional)
if [ -n "$OCI_API_KEY_PUBLIC_PEM" ]; then
  echo "$OCI_API_KEY_PUBLIC_PEM" | sed 's/\\n/\n/g' > /root/.oci/oci_api_key_public.pem
fi

chmod 600 /root/.oci/*

echo "✅ OCI credentials configuradas"

exec "$@"