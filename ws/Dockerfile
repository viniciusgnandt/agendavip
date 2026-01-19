# ws/Dockerfile
FROM node:20-bullseye

WORKDIR /app

# Instala OCI CLI
RUN apt-get update && \
    apt-get install -y python3 python3-pip curl && \
    pip3 install oci-cli && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]