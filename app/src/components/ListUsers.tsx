import { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([
    { name: "User 1", email: "user1@email.com" },
    { name: "User 2", email: "user2@email.com" },
  ]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-around">
      <h1>List Users</h1>
      <table className="table-auto rounded-mg border border-slate-400">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
