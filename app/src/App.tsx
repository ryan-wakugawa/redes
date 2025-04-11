import { useEffect, useState } from "react";
import CreateUserForm from "./components/CreateUserForm";
import UsersTable from "./components/ListUsers";
import api from "./lib/axios";
import { Typography } from "@mui/material";

export default function App() {
  const [instance, setInstance] = useState("");

  const getInstance = async () => {
    try {
      const response = await api.get("/");
      setInstance(response.data.instance);
    } catch (error) {}
  };

  useEffect(() => {
    getInstance();
  }, []);

  return (
    <div className="m-auto w-3/4 p-4">
      <CreateUserForm />
      <UsersTable />
      <footer className="mt-8 text-center text-gray-500">
        <Typography variant="body2" color="textPrimary" className="font-bold">
          {"Servidor: " + instance}
        </Typography>
      </footer>
    </div>
  );
}
