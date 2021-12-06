import axios from "axios";
import { Locais, CheckinResponse, RegistraVoucherCriancaVariables } from "../index.d";

const getApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    auth: {
      username: process.env.REACT_APP_AUTH_USERNAME || "",
      password: process.env.REACT_APP_AUTH_PASSWORD || "",
    },
  });
  
export const buscaLocais = async (): Promise<Locais> => {
  const { data } = await getApi().get("/busca_locais.php");  
  return data;
};
export const registraVoucherCrianca = async (variables: RegistraVoucherCriancaVariables): Promise<CheckinResponse> => {
  const { data } = await getApi().post("/registra_check.php", variables);
  return data;
};

export const login = (credentials) => {
  return getApi().post("/login.php", JSON.stringify(credentials));
}
