import { getConfig } from "./config/runtimeConfig";

const config = getConfig();

export default {
  salaoId: config.SALAO_ID,
  clienteId: config.CLIENTE_ID,
  colaboradorId: config.COLABORADOR_ID,
};