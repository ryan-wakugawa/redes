import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import UserInterface from "../interfaces/UserInterface";
import api from "../lib/axios";

export default function EditButton(props: { user: UserInterface }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: editUser, isPending } = useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      try {
        await api.patch(`/users/${props.user.id}`, { name, email });
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleOpen = () => {
    setName(props.user.name);
    setEmail(props.user.email);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    editUser({ name, email });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">
        Editar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col justify-center bg-white rounded-xl p-6 w-[400px] shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 mx-auto"
          >
            {isPending ? (
              <CircularProgress />
            ) : (
              <>
                <TextField
                  label="Nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  fullWidth
                  required
                  size="small"
                  className="!mb-2"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  fullWidth
                  size="small"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isPending}
                  className="mt-4"
                >
                  {isPending ? "Salvando..." : "Salvar"}
                </Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
