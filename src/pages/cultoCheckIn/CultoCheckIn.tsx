import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import QrReader from "react-qr-reader";
import { red, green } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, Button, CircularProgress, TextField, Typography } from "@material-ui/core";
import Result from "./Result";
import { buscaCpf, registraVoucher } from "../../queries/api";

import {
  BuscaCpfResponse,
  BuscaCpfVariables,
  CheckinResponse,
  RegistraVoucherVariables,
  ErrorResponse,
} from "../../index.d";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: black;
  margin-right: 16px;
  position: absolute;
  left: 16px;
`;

export default function CultoCheckIn(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const { search } = useLocation();

  const [result, setResult] = useState("");
  const [isCheckingVoucher, setIsCheckingVoucher] = useState(false);
  const [cpfError, setCpfError] = useState("");
  const [cpf, setCpf] = useState("");

  const registraVoucherMutation = useMutation<CheckinResponse, ErrorResponse, RegistraVoucherVariables>(
    registraVoucher,
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
  const buscaCpfMutation = useMutation<BuscaCpfResponse, ErrorResponse, BuscaCpfVariables>(buscaCpf, {
    onSuccess: (data) => {
      registraVoucherMutation.mutate({
        culto_id: id,
        hash: `${data.mensagem}-${id}`,
      });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error?.response?.data?.mensagem) setResult(error.response.data.mensagem);
      setIsCheckingVoucher(false);
    },
  });

  const name = new URLSearchParams(search).get("name");

  const cpfMask = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setIsCheckingVoucher(true);
      registraVoucherMutation.mutate({
        culto_id: id,
        hash: data,
      });
    }
  };
  // eslint-disable-next-line no-console
  const handleError = (err: Error) => console.error(err);

  const checkCpf = () => {
    if (cpf.length < 14) {
      setCpfError("CPF Inválido");
      return;
    }
    setIsCheckingVoucher(true);
    buscaCpfMutation.mutate({
      culto_id: id,
      cpf,
    });
  };

  const onChangeCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(cpfMask(e.currentTarget.value));
    setCpfError("");
  };

  const reset = () => {
    setResult("");
    setCpf("");
  };

  const getColor = () => {
    if (!result) return undefined;
    if (result.toLowerCase().includes("confirmado")) return green[900];
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
            Check-in
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="span" paragraph>
          Você irá fazer check-in para o culto
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
      {!result && (
        <>
          <Box mb={2}>
            <TextField
              label="Preencha este campo para pesquisar por CPF"
              placeholder="123.456.789-09"
              value={cpf}
              onChange={onChangeCpf}
              inputProps={{
                maxLength: 14,
                "aria-label": "Preencha este campo para pesquisar por CPF",
                inputmode: "numeric",
              }}
              variant="outlined"
              error={!!cpfError}
              helperText={cpfError}
              color="secondary"
              fullWidth
            />
          </Box>
          <Button variant="contained" color="primary" onClick={checkCpf}>
            Pesquisar
          </Button>
        </>
      )}
    </Box>
  );
}
