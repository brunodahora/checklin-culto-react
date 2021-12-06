import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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
  font-size: 2rem !important;
`;

const getIcon = (result: string) => {
  if (result.toLowerCase().includes("checkin")) return <CheckCircleIcon style={{ fontSize: "4rem" }} />;
  if (result.toLowerCase().includes("checkout")) return <ExitToAppIcon style={{ fontSize: "4rem" }} />;
  if (result.toLowerCase().includes("processo")) return <HighlightOffIcon style={{ fontSize: "4rem" }} />;
  if (result.toLowerCase().includes("erro")) return <ErrorOutlineIcon style={{ fontSize: "4rem" }} />;
  return <HighlightOffIcon style={{ fontSize: "4rem" }} />;
};

export default function Result({ result, reset }: Props): React.ReactElement {
  return (
    <>
      {getIcon(result)}
      <StyledTypography variant="h5">{result}</StyledTypography>
      <Button variant="outlined" color="inherit" onClick={reset} size="large">
        Novo check-in/out
      </Button>
    </>
  );
}
