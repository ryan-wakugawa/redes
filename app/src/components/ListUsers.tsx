import { useEffect, useState } from "react";
import UserInterface from "../interfaces/userInterface";

export default function UsersTable(props: { users: UserInterface[] }) {
  return (
    <div className="flex w-full flex-col items-center justify-around">
      <h1>List Users</h1>
      <table className="table-auto rounded-mg border border-slate-400">
        <thead>
          <tr className="bg-slate-200 p-2">
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
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
