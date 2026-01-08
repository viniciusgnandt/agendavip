const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const SalaoCliente = require('../models/relationship/salaoCliente');
const moment = require('moment');
//const pagarme = require('../services/pagarme');

// CRIA UM NOVO CLIENTE
router.post('/', async (req, res) => {
  /*
  const db = mongoose.connection;
  const session = await db.startSession();
  session.startTransaction();
  */

  try {
    const { cliente, salaoId } = req.body;
    let newClient = null;

    // VERIFICAR SE JÁ EXISTE UM CLIENTE COM ESSES DADOS
    const existentClient = await Cliente.findOne({
      $or: [
        { email: cliente.email },
        { telefone: cliente.telefone },
        //{ cpf: cliente.cpf },
      ],
    });

    // SE NÃO EXISTIR, CRIA UM NOVO CLIENTE
    if (!existentClient) {
      /*
      const _id = new mongoose.Types.ObjectId();
      const cliente = req.body.cliente;
      console.log(cliente);
      const pagarmeCliente = await pagarme('/customers', {
        external_id: _id,
        name: cliente.nome,
        type: cliente.documento.tipo === 'cpf' ? 'individual' : 'corporation',
        country: 'br',
        email: cliente.email,
        documents: [
          {
            type: cliente.documento.tipo,
            number: cliente.documento.numero,
          },
        ],
        phone_numbers: ['+55' + cliente.telefone],
        birthday: cliente.dataNascimento,
      });

      console.log(pagarmeCliente);

      if (pagarmeCliente.error) {
        throw pagarmeCliente;
      }
        */
      newClient = await new Cliente(cliente).save(/*{ session }*/);
    }

    // FAZER O VÍNCULO DO CLIENTE COM O SALÃO
    const clienteId = existentClient ? existentClient._id : newClient._id;
    
    // VERIFICAR SE JÁ EXISTE ESSE VÍNCULO    
    const existentRelationship = await SalaoCliente.findOne({
      salaoId,
      clienteId,
    });

    // SE NÃO EXISTIR, CRIAR ESSE VÍNCULO
    if (!existentRelationship) {
      await new SalaoCliente({
        salaoId,
        clienteId,
      }).save(/*{ session }*/);
    }
    // SE EXISTIR, MAS ESTIVER INATIVO, ATIVAR NOVAMENTE
    if (existentRelationship && existentRelationship.status === 'I') {
      await SalaoCliente.findOneAndUpdate(
        {
          salaoId,
          clienteId,
        },
        { status: 'A' },
        { session }
      );
    }
    
    /*
    await session.commitTransaction();
    session.endSession();
    */
    // VERIFICAR SE O CLIENTE JÁ EXISTE
    if (
      existentRelationship &&
      existentRelationship.status === 'A' &&
      existentClient
    ) {
      res.json({ error: true, message: 'Cliente já cadastrado!' });
    } else {
      res.json({ error: false });
    }
  } catch (err) {
    /*await session.abortTransaction();
    session.endSession();*/
    res.json({ error: true, message: err.message });
  }
});

// BUSCA CLIENTES COM FILTROS
router.post('/filter', async (req, res) => {
  try {
    const clientes = await Cliente.find(req.body.filters);
    res.json({ error: false, clientes });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// BUSCA CLIENTES DE UM SALÃO
router.get('/salao/:salaoId', async (req, res) => {
  try {
    const clientes = await SalaoCliente.find({
      salaoId: req.params.salaoId,
      status: 'A',
    })
      .populate('clienteId')
      .select('clienteId');

    res.json({
      error: false,
      clientes: clientes.map((c) => ({
        ...c.clienteId._doc,
        vinculoId: c._id,
        dataCadastro: moment(c.dataCadastro).format('DD/MM/YYYY'),
      })),
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// DELETAR VÍNCULO DE CLIENTE COM SALÃO
router.delete('/vinculo/:id', async (req, res) => {
  try {
    await SalaoCliente.findByIdAndUpdate(req.params.id, { status: 'I' });
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;