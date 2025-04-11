import { use, useEffect, useState } from "react";
import CreateForm from "./components/CreateForm";
import UsersTable from "./components/ListUsers";
import UserInterface from "./interfaces/userInterface";

export default function App() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      console.log(data.data);
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="m-4">
      <CreateForm />
      <UsersTable users={users} />
    </div>
  );
}
