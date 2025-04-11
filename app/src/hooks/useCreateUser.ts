import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: { name: string; email: string }) => {
      const response = await api.post("/users", newUser);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
