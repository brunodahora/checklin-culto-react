import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import QrReader from "react-qr-reader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Box, Button, CircularProgress, TextField, Typography } from "@material-ui/core";

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
  const [isCheckingVoucher] = useState(false);
  const [cpfError, setCpfError] = useState("");
  const [cpf, setCpf] = useState("");

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
    if (data) setResult(data);
  };
  // eslint-disable-next-line no-console
  const handleError = (err: Error) => console.error(err);

  const checkCpf = () => {
    if (cpf.length < 14) setCpfError("CPF Inválido");
    console.log("Checking CPF");
  };

  const onChangeCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(cpfMask(e.currentTarget.value));
    setCpfError("");
  };

  return (
    <Box display="flex" flexDirection="column" p={2} height="calc(100vh - 32px)">
      <Box p={1} mb={2} textAlign="center">
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <StyledLink to="/" aria-label="Voltar">
            <ArrowBackIcon fontSize="large" />
          </StyledLink>
          <Typography variant="h3" component="h1">
            Check-in
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="span">
          Você irá fazer check-in para o culto
          <br />
          <b>{name || id}</b>
        </Typography>
      </Box>
      <Box flex={1} flexDirection="column" alignItems="center" justifyContent="center">
        {!isCheckingVoucher && (
          <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ flex: 1, width: "100%" }} />
        )}
        {isCheckingVoucher && <CircularProgress color="primary" size={64} />}
      </Box>
      <p>{result}</p>
      <Box mb={2}>
        <TextField
          label="Preencha este campo para pesquisar por CPF"
          value={cpf}
          onChange={onChangeCpf}
          inputProps={{ maxLength: 14, "aria-label": "Preencha este campo para pesquisar por CPF" }}
          variant="outlined"
          error={!!cpfError}
          helperText={cpfError}
          fullWidth
        />
      </Box>
      <Button variant="contained" color="primary" onClick={checkCpf}>
        Pesquisar
      </Button>
    </Box>
  );
}
