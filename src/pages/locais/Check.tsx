import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import QrReader from "react-qr-reader";
import { red, green } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import Result from "./Result";
import { registraVoucherCrianca } from "../../queries/api";

import { CheckinResponse, RegistraVoucherCriancaVariables, ErrorResponse } from "../../index.d";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: black;
  margin-right: 16px;
  position: absolute;
  left: 16px;
`;

export default function Check(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { search } = useLocation();

  const [result, setResult] = useState("");
  const [isCheckingVoucher, setIsCheckingVoucher] = useState(false);

  const registraVoucherMutation = useMutation<CheckinResponse, ErrorResponse, RegistraVoucherCriancaVariables>(
    registraVoucherCrianca,
    {
      onSuccess: (data) => {
        setResult(data.mensagem);
        setIsCheckingVoucher(false);
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        if (error?.response?.data?.mensagem) setResult(error.response.data.mensagem);
        setIsCheckingVoucher(false);
      },
    },
  );

  const name = new URLSearchParams(search).get("name");
  const idlocal = new URLSearchParams(search).get("id");
  const tipoCheck = new URLSearchParams(search).get("tipo");

  const handleScan = (data: string | null) => {
    if (data && idlocal && tipoCheck) {
      setIsCheckingVoucher(true);
      registraVoucherMutation.mutate({
        local_id: idlocal,
        hash: data,
        tipo: tipoCheck,
      });
    }
  };
  // eslint-disable-next-line no-console
  const handleError = (err: Error) => console.error(err);

  const reset = () => {
    setResult("");
  };

  const getColor = () => {
    if (!result) return undefined;
    if (result.toLowerCase().includes("checkin")) return green[900];
    if (result.toLowerCase().includes("checkout")) return green[900];
    if (result.toLowerCase().includes("processo")) return red[900];
    return red[900];
  };

  return (
    <Box display="flex" flexDirection="column" p={2} height="calc(var(--vh, 1vh) * 100 - 32px)">
      <Box p={1} mb={2} textAlign="center">
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <StyledLink to="/" aria-label="Voltar">
            <ArrowBackIcon fontSize="large" />
          </StyledLink>
          <Typography variant="h3" component="h1" gutterBottom>
            Check-in/out
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="span" paragraph>
          Você irá fazer check-in/out para a criança
          <br />
          <b>{name || id}</b>
        </Typography>
      </Box>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        color={getColor()}
      >
        {!isCheckingVoucher && !result && (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          />
        )}
        {!isCheckingVoucher && result && <Result result={result} reset={reset} />}
        {isCheckingVoucher && !result && <CircularProgress color="primary" size={64} />}
      </Box>
    </Box>
  );
}
