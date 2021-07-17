import axios from "axios";
import { Cultos } from "../index.d";

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

export const buscaCpf = async (cultoId: string, cpf: string): Promise<Cultos> => {
  const { data } = await getApi().get("busca_cpf.php", {
    params: {
      culto_id: cultoId,
      cpf,
    },
  });
  return data;
};
