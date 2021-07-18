export type Cultos = {
  mensagem: { [id: string]: string };
};

export type BuscaCpfResponse = {
  mensagem: string;
};

export type CheckinResponse = {
  mensagem: string;
};

export type BuscaCpfVariables = {
  // eslint-disable-next-line camelcase
  culto_id: string;
  cpf: string;
};

export type RegistraVoucherVariables = {
  // eslint-disable-next-line camelcase
  culto_id: string;
  hash: string;
};

export type ErrorResponse = {
  response: {
    data: {
      mensagem: string;
    };
  };
};
