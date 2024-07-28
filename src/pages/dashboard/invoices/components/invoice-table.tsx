import { FC } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../../components/ui/table";
import { Invoice } from "../../../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";

const InvoiceTable: FC<{
  invoices: Invoice[];
  updateInvoice: (...args: unknown[]) => void;
}> = ({ invoices, updateInvoice }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _deleteOrder = async (id: string) => {
    if (confirm("are you sure you want to delete this invoice?")) {
      await deleteDoc(doc(db, "invoices", id));
      alert("invoice deleted");
      updateInvoice();
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
            <TableHead>Order ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices &&
            invoices.map((invoice, index) => (
              <TableRow className={`bg-gray-50`} key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{invoice.user.name}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.products.length}</TableCell>
                <TableCell>
                  <span
                    className="cursor-pointer bg-gray-500 rounded-full flex items-center justify-center h-8 w-8 shadow-md"
                    onClick={() => _deleteOrder(invoice.id)}
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

export default InvoiceTable;
