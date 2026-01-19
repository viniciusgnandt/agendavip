#!/bin/sh
set -e

echo "🔐 Criando diretório OCI..."
mkdir -p /root/.oci

echo "⬇️ Restaurando OCI config..."
oci secrets secret-bundle get \
  --secret-id ocid1.vaultsecret.oc1.sa-saopaulo-1.amaaaaaawspdl4yanrn77t4we4o5wrv7q34rulyeztezbewnivaqlgehnicq \
  --query "data.\"secret-bundle-content\".content" \
  --raw-output | base64 -d > /root/.oci/config

echo "⬇️ Restaurando OCI private key..."
oci secrets secret-bundle get \
  --secret-id ocid1.vaultsecret.oc1.sa-saopaulo-1.amaaaaaawspdl4yarrt7zonaqhokuhxv45w2lngvxn4hcrxjq5otcmsr5ymq \
  --query "data.\"secret-bundle-content\".content" \
  --raw-output | base64 -d > /root/.oci/oci_api_key.pem

echo "⬇️ Restaurando OCI public key..."
oci secrets secret-bundle get \
  --secret-id ocid1.vaultsecret.oc1.sa-saopaulo-1.amaaaaaawspdl4yaspc3r33urzrwbsqtnfkxokjawnxnndruqheyqr2bmr2a \
  --query "data.\"secret-bundle-content\".content" \
  --raw-output | base64 -d > /root/.oci/oci_api_key_public.pem

chmod 600 /root/.oci/*

echo "✅ OCI configurado com sucesso"
exec npm run start
