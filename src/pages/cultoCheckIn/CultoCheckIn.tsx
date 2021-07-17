import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QrReader from "react-qr-reader";

import { MainContainer } from "../styles";
import { TextInput } from "./styles";

export default function CultoCheckIn(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState("");
  const [isCheckingVoucher] = useState(false);
  const [cpf, setCpf] = useState("");

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

  const checkCpf = () => console.log("Checking CPF");

  return (
    <MainContainer>
      <h1>Você irá fazer checkin para o culto {id}</h1>
      {!isCheckingVoucher && (
        <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ flex: 1, width: "100%" }} />
      )}
      <p>{result}</p>
      <TextInput value={cpf} maxLength={14} onChange={(e) => setCpf(cpfMask(e.currentTarget.value))} />
      <button type="button" onClick={checkCpf}>
        Pesquisar por CPF
      </button>
    </MainContainer>
  );
}
