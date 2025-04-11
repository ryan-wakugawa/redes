import UserInterface from "../interfaces/UserInterface";

export default function UsersTable(props: { users: UserInterface[] }) {
  return (
    <div className="flex w-full flex-col items-center justify-around m-4">
      <h1 className="font-bold text-lg ">Usuários</h1>
      <table className="table-auto w-full rounded-mg border border-slate-400">
        <thead>
          <tr className="bg-slate-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
