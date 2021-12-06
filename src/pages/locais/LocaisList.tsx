import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Box, Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import { Locais as LocaisType } from "../../index.d";

const StyledLink = styled(Link)`
  flex: 1;
  text-decoration: none;
  font-weight: bold;
  color: black;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  background-color: white;

  :hover,
  :focus {
    background-color: lightgray;
  }
`;

const StyledTypography = styled(Typography)`
  width: 80%;
  margin-top: 16px !important;
`;

type Props = {
  locais: LocaisType | undefined;
  loading?: boolean;
};

export default function LocaisList({ locais, loading = false }: Props): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  if (loading)
    return (
      <Box display="flex" flexDirection="column" flex={1} alignItems="center" justifyContent="center" mt={2}>
        <CircularProgress color="primary" size={64} />
      </Box>
    );

  if (!locais?.mensagem || !Object.keys(locais.mensagem))
    return (
      <Box display="flex" flexDirection="column" flex={1} alignItems="center" justifyContent="center" mt={2}>
        <HighlightOffIcon fontSize="large" />
        <StyledTypography variant="body1">Nenhum local encontrado para realizar check in/out.</StyledTypography>
      </Box>
    );

  return (
    <>
      {Object.keys(locais.mensagem).map((key) => (
        <Box key={key} mb={2}>
          <Card>
            <StyledCardContent>
              <StyledLink to={`/check?id=${key}&name=${locais.mensagem[key]}&tipo=${id}`}>
                <Typography variant="button">{locais.mensagem[key]}</Typography>
              </StyledLink>
            </StyledCardContent>
          </Card>
        </Box>
      ))}
    </>
  );
}
LocaisList.defaultProps = {
  loading: false,
};
