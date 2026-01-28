#!/bin/sh
set -e

mkdir -p /root/.oci
chmod 700 /root/.oci

# Config
echo "$OCI_CONFIG" | base64 -d > /root/.oci/config
chmod 600 /root/.oci/config

# Private Key
echo "$OCI_API_KEY" | base64 -d > /root/.oci/oci_api_key.pem
chmod 600 /root/.oci/oci_api_key.pem

# Public Key #
echo "$OCI_API_KEY_PUBLIC" | base64 -d > /root/.oci/oci_api_key_public.pem
chmod 600 /root/.oci/oci_api_key_public.pem

exec "$@"
