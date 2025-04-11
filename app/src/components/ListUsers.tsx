import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useUsers } from "../hooks/useUsers";
import UserInterface from "../interfaces/UserInterface";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function UsersTable() {
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress size="4rem" />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography color="error" className="text-center">
        Erro ao carregar usuários.
      </Typography>
    );
  }

  return (
    <div className="w-full px-4 py-6 flex flex-col gap-4 items-center">
      <TableContainer component={Paper} className="w-full">
        <Table size="small">
          <TableHead>
            <TableRow className="bg-slate-200">
              <TableCell align="center" className="font-bold uppercase">
                ID
              </TableCell>
              <TableCell className="font-bold uppercase">Nome</TableCell>
              <TableCell className="font-bold uppercase">Email</TableCell>
              <TableCell align="center" className="font-bold uppercase">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users
              ?.sort((a, b) => a.id - b.id)
              .map((user: UserInterface) => (
                <TableRow
                  key={user.id}
                  hover
                  className="transition duration-150 ease-in-out"
                >
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center gap-2">
                      <EditButton user={user} />
                      <DeleteButton id={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
