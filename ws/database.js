const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
  console.error("❌ MONGODB_URI não definida");
  process.exit(1);
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB conectado");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });

module.exports = mongoose;