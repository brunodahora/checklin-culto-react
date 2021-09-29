import axios from "axios";
import { Cultos, BuscaCpfResponse, BuscaCpfVariables, CheckinResponse, RegistraVoucherVariables } from "../index.d";

const getApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    auth: {
      username: process.env.REACT_APP_AUTH_USERNAME || "",
      password: process.env.REACT_APP_AUTH_PASSWORD || "",
    },
  });

export const buscaCultos = async (): Promise<Cultos> => {
  const { data } = await getApi().get("/busca_culto.php");
  return data;
};

export const buscaCpf = async (variables: BuscaCpfVariables): Promise<BuscaCpfResponse> => {
  const { data } = await getApi().post("/busca_cpf.php", variables);
  return data;
};

export const registraVoucher = async (variables: RegistraVoucherVariables): Promise<CheckinResponse> => {
  const { data } = await getApi().post("/registra_legendarios.php", variables);
  return data;
};
