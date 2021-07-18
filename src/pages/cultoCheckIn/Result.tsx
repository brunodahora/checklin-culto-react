import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Button, Typography } from "@material-ui/core";
import styled from "styled-components";

type Props = {
  result: string;
  reset: () => void;
};

const StyledTypography = styled(Typography)`
  width: 80%;
  margin: 16px 0 !important;
`;

const getIcon = (result: string) => {
  if (result.toLowerCase().includes("confirmado")) return <CheckCircleOutlineIcon fontSize="large" />;
  if (result.toLowerCase().includes("realizou")) return <ErrorOutlineIcon fontSize="large" />;
  return <HighlightOffIcon fontSize="large" />;
};

export default function Result({ result, reset }: Props): React.ReactElement {
  return (
    <>
      {getIcon(result)}
      <StyledTypography variant="body1">{result}</StyledTypography>
      <Button variant="outlined" color="inherit" onClick={reset}>
        Novo check-in
      </Button>
    </>
  );
}
