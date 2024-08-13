import { FC } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../../components/ui/table";
import { User } from "../../../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";

const UserTable: FC<{
  users: User[];
  updateUsers: (...args: unknown[]) => void;
}> = ({ users, updateUsers }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _deleteUser = async (id: string) => {
    if (confirm("are you sure you want to delete this user account?")) {
      await deleteDoc(doc(db, "users", id));
      alert("user deleted");
      updateUsers();
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Table className="py-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Account Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow className={`bg-gray-50`} key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.accountType}</TableCell>
                <TableCell>
                  <span
                    className="cursor-pointer bg-gray-500 rounded-full flex items-center justify-center h-8 w-8 shadow-md"
                    onClick={() => {
                      _deleteUser(user.id);
                    }}
                  >
                    <i className="fas fa-trash text-white" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
