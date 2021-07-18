import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Box, Card, CardContent, CircularProgress, Typography } from "@material-ui/core";
import { Cultos as CultosType } from "../../index.d";

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

type Props = {
  cultos: CultosType | undefined;
  loading?: boolean;
};

export default function CultosList({ cultos, loading = false }: Props): React.ReactElement {
  if (loading)
    return (
      <Box display="flex" flexDirection="column" flex={1} alignItems="center" justifyContent="center" mt={2}>
        <CircularProgress color="primary" size={64} />
      </Box>
    );

  if (!cultos?.mensagem || !Object.keys(cultos.mensagem))
    return (
      <Box display="flex" flexDirection="column" flex={1} alignItems="center" justifyContent="center" mt={2}>
        <HighlightOffIcon fontSize="large" />
        <Typography variant="body1">Não existem cultos cadastrados para hoje.</Typography>
      </Box>
    );

  return (
    <>
      {Object.keys(cultos.mensagem).map((key) => (
        <Box key={key} mb={2}>
          <Card>
            <StyledCardContent>
              <StyledLink to={`/cultos/${key}?name=${cultos.mensagem[key]}`}>
                <Typography variant="button">{cultos.mensagem[key]}</Typography>
              </StyledLink>
            </StyledCardContent>
          </Card>
        </Box>
      ))}
    </>
  );
}
CultosList.defaultProps = {
  loading: false,
};
