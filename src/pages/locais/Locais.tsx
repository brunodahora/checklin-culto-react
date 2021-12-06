import React from "react";
import { useQuery } from "react-query";
import { Box, Typography } from "@material-ui/core";
import { Locais as LocaisType } from "../../index.d";
import LocaisList from "./LocaisList";
import { buscaLocais } from "../../queries/api";

export default function Locais(): React.ReactElement {
  const { isLoading, error, data, isFetching } = useQuery<LocaisType, Error>("locais", buscaLocais);

  const loading = isLoading || isFetching;

  // eslint-disable-next-line no-console
  if (error) console.error(`An error has occurred: ${error.message}`);

  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} height="calc(var(--vh, 1vh) * 100 - 32px)">
      <Typography variant="h1" align="center" gutterBottom>
        Locais
      </Typography>
      <Typography variant="h5" component="h2" align="center" paragraph>
        Selecione abaixo um local para realizar o check-in/out
      </Typography>
      <Box overflow="auto" flex={1} display="flex" flexDirection="column" mt={2}>
        <LocaisList locais={data} loading={loading} />
      </Box>
    </Box>
  );
}
