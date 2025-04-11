import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = () => {
    createUser({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center w-full mt-6">
      <Typography variant="h6" className="m-4 font-bold">
        Criar Usuário
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-wrap gap-4 justify-center w-full max-w-4xl items-center"
      >
        <Box className="flex flex-row gap-2 w-full">
          <TextField
            label="Nome"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            className="h-[40px] px-6"
          >
            {isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Criar"
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
}
