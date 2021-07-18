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

  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} height="calc(var(--vh, 1vh) * 100 - 32px)">
      <Typography variant="h1" align="center" gutterBottom>
        Cultos
      </Typography>
      <Typography variant="h5" component="h2" align="center" paragraph>
        Selecione abaixo para qual culto quer fazer o check-in
      </Typography>
      <Box overflow="hidden" flex={1} display="flex" flexDirection="column" mt={2}>
        <CultosList cultos={data} loading={loading} />
      </Box>
    </Box>
  );
}
