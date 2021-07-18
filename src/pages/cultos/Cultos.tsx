import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
// import { useQuery } from "react-query";
import { Cultos as CultosType } from "../../index.d";
// import { buscaCultos } from "../../queries/api";

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

const ScrollContainer = styled.div`
  overflow: auto;
`;

export default function Cultos(): React.ReactElement {
  // const { isLoading, error, data, isFetching } = useQuery<CultosType, Error>("cultos", buscaCultos);

  // if (isLoading || isFetching) return <div>Carregando...</div>;

  // // eslint-disable-next-line no-console
  // if (error) console.error(`An error has occurred: ${error.message}`);

  // if (!data?.mensagem || !Object.keys(data.mensagem)) return <div>Não existem cultos cadastrados para hoje.</div>;

  const cultos: CultosType = { mensagem: { "1": "teste", "2": "teste 2" } };

  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} height="calc(100vh - 32px)">
      <Typography variant="h1">Cultos</Typography>
      <ScrollContainer>
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
      </ScrollContainer>
    </Box>
  );
}
