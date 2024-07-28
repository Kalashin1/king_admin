import { FC } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../../components/ui/table";
import { Order } from "../../../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";

const OrderTable: FC<{
  orders: Order[];
  updateOrders: (...args: unknown[]) => void;
}> = ({ orders, updateOrders }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _deleteOrder = async (id: string) => {
    if (confirm("are you sure you want to delete this order?")) {
      await deleteDoc(doc(db, "orders", id));
      alert("order deleted");
      updateOrders();
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Table className="py-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order, index) => (
              <TableRow className={`bg-gray-50`} key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.products.length}</TableCell>
                <TableCell>
                  <span
                    className="cursor-pointer bg-gray-500 rounded-full flex items-center justify-center h-8 w-8 shadow-md"
                    onClick={() => _deleteOrder(order.id)}
                  >
                    <i className="fas fa-ellipsis-vertical text-white" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
