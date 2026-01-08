const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salao = new Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
  },
  descricao: String,
  foto: String,
  capa: String,
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
  },
  senha: {
    type: String,
    default: null,
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório'],
  },
  recipientId: String,
  endereco: {
    cidade: String,
    uf: String,
    cep: String,
    logradouro: String,
    numero: String,
    pais: String,
  },
  geo: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
},
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

salao.index({ geo: '2dsphere' });

module.exports = mongoose.model('Salao', salao);