#!/bin/sh
set -e

echo "🔐 Configurando OCI credentials..."

mkdir -p /root/.oci
chmod 700 /root/.oci

echo "$OCI_CONFIG" > /root/.oci/config
echo "$OCI_API_KEY_PEM" > /root/.oci/oci_api_key.pem
echo "$OCI_API_KEY_PUBLIC_PEM" > /root/.oci/oci_api_key_public.pem

chmod 600 /root/.oci/*

echo "✅ OCI credentials configuradas"

exec "$@"