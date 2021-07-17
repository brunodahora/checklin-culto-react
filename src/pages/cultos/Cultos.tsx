import React from "react";
// import { useQuery } from "react-query";
import { Cultos as CultosType } from "../../index.d";
// import { buscaCultos } from "../../queries/api";

import { MainContainer } from "../styles";
import { CultoContainer } from "./styles";

export default function Cultos(): React.ReactElement {
  // const { isLoading, error, data, isFetching } = useQuery<CultosType, Error>("cultos", buscaCultos);

  // if (isLoading || isFetching) return <div>Carregando...</div>;

  // // eslint-disable-next-line no-console
  // if (error) console.error(`An error has occurred: ${error.message}`);

  // if (!data?.mensagem || !Object.keys(data.mensagem)) return <div>Não existem cultos cadastrados para hoje.</div>;

  const cultos: CultosType = { mensagem: { "1": "teste", "2": "teste 2" } };

  return (
    <MainContainer>
      <h1>Cultos</h1>
      {Object.keys(cultos.mensagem).map((key) => (
        <CultoContainer href={`/cultos/${key}`}>{cultos.mensagem[key]}</CultoContainer>
      ))}
    </MainContainer>
  );
}
