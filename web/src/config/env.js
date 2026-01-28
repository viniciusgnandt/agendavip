const runtimeEnv = window.__ENV__ || {};

export const ENV = {
  BACKEND_URL:
    runtimeEnv.BACKEND_URL ||
    process.env.REACT_APP_BACKEND_URL ||
    "",

  SALAO_ID:
    runtimeEnv.SALAO_ID ||
    process.env.REACT_APP_SALAO_ID ||
    "",

  CLIENTE_ID:
    runtimeEnv.CLIENTE_ID ||
    process.env.REACT_APP_CLIENTE_ID ||
    "",

  COLABORADOR_ID:
    runtimeEnv.COLABORADOR_ID ||
    process.env.REACT_APP_COLABORADOR_ID ||
    "",

  BUCKET_URL:
    runtimeEnv.BUCKET_URL ||
    process.env.REACT_APP_BUCKET_URL ||
    ""
};
