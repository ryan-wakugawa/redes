import CreateForm from "./components/CreateForm";
import UsersTable from "./components/ListUsers";

export default function App() {
  return (
    <div className="m-4">
      <CreateForm />
      <UsersTable />
    </div>
  );
}
