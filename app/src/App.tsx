import CreateUserForm from "./components/CreateUserForm";
import UsersTable from "./components/ListUsers";

export default function App() {
  return (
    <div className="m-auto w-3/4 p-4">
      <CreateUserForm />
      <UsersTable />
    </div>
  );
}
