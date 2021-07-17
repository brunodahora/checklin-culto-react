import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QrReader from "react-qr-reader";

export default function CultoCheckIn(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState();
  const handleScan = (data: any) => setResult(data);
  const handleError = (err: any) => console.error(err);

  return (
    <div>
      CultoCheckIn {id}
      <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
      <p>{result}</p>
    </div>
  );
}
