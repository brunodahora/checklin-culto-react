import React from "react";
import { useQuery } from "react-query";
import { Box, Typography } from "@material-ui/core";
import { Cultos as CultosType } from "../../index.d";
import CultosList from "./CultosList";
import { buscaCultos } from "../../queries/api";

export default function Cultos(): React.ReactElement {
  const { isLoading, error, data, isFetching } = useQuery<CultosType, Error>("cultos", buscaCultos);

  const loading = isLoading || isFetching;

  // eslint-disable-next-line no-console
  if (error) console.error(`An error has occurred: ${error.message}`);

  // const cultos: CultosType = { mensagem: { "1": "teste", "2": "teste 2" } };

  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} height="calc(var(--vh, 1vh) * 100 - 32px)">
      <Typography variant="h1">Cultos</Typography>
      <Box overflow="hidden" flex={1} display="flex" flexDirection="column">
        <CultosList cultos={data} loading={loading} />
      </Box>
    </Box>
  );
}
