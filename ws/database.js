const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://admin:password@mongodb_test:27017/agendavip?authSource=admin';

const env = process.env.NODE_ENV || 'dev';
let options = {};

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB conectado com sucesso");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });

module.exports = mongoose;