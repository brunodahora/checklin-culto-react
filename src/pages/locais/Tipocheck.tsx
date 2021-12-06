import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Card, CardContent, Typography } from "@material-ui/core";

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

export default function Tipo(): React.ReactElement {
  return (
    <Box display="flex" flexDirection="column" flex={1} p={2} height="calc(var(--vh, 1vh) * 100 - 32px)">
      <Typography variant="h1" align="center" gutterBottom>
        Tipo de Check
      </Typography>
      <Typography variant="h5" component="h2" align="center" paragraph>
        Selecione abaixo qual procedimento você vai fazer agora
      </Typography>
      <Box mb={2}>
        <Card>
          <StyledCardContent>
            <StyledLink to="/locais/2">
              <Typography variant="button">Check-in</Typography>
            </StyledLink>
          </StyledCardContent>
        </Card>
      </Box>
      <Box mb={2}>
        <Card>
          <StyledCardContent>
            <StyledLink to="/locais/3">
              <Typography variant="button">Check-out</Typography>
            </StyledLink>
          </StyledCardContent>
        </Card>
      </Box>
    </Box>
  );
}
