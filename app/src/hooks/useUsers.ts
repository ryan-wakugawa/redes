import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import UserInterface from "../interfaces/UserInterface";

const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log(response.data.data);
    return response.data.data as UserInterface[];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
