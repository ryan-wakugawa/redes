import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import { Button, CircularProgress } from "@mui/material";

export default function DeleteButton(props: { id: number }) {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete(`/users/${props.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => deleteUser()}
      disabled={isPending}
      size="small"
    >
      {isPending ? <CircularProgress size={18} color="inherit" /> : "Deletar"}
    </Button>
  );
}
