import React, { useState } from "react";
import { Button, TextField, Container, CssBaseline, Box, Typography} from "@material-ui/core";
import { login } from "../../queries/api";
import { settokenlogin } from "../Utils/Token";


export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login({
      username,
      password,
    });
    if(token.data){
      settokenlogin(token.data);
      window.location.href = "/locais";
    }else{
      alert("Dados incorretos");
    }    
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
          Acessar aplicativo
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="usuario"
            label="Usuário"
            name="usuario"
            autoComplete="Usuário"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="senha atual"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Acessar
            </Button>
        </Box>
      </Box>
    </Container>
  );
}
