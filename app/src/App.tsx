import { useEffect, useState } from "react";
import CreateForm from "./components/CreateForm";
import UsersTable from "./components/ListUsers";
import UserInterface from "./interfaces/UserInterface";
import api from "./lib/axios";

export default function App() {
  const [users, setUsers] = useState<UserInterface[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="m-auto w-3/4 p-4">
      <CreateForm />
      <UsersTable users={users} />
    </div>
  );
}
