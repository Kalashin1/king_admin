/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Investment, Plan, User } from "../../../../types";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";

const InvestmentTable: FC<{ investments: Investment[] }> = ({
  investments,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const set_up = async () => {
      const id = localStorage.getItem("user_id");
      if (id) {
        const userDoc = await getDoc(doc(db, "users", id));
        setUser({ id: userDoc.id, ...userDoc.data() } as User);
      }
    };

    set_up();
  }, []);

  const Row = ({
    investment,
    index,
  }: {
    investment: Investment;
    index: number;
  }) => {
    const [plan, setPlan] = useState<Plan | null>(null);

    useEffect(() => {
      const set_up = async () => {
        const docRef = await getDoc(doc(db, "plans", investment.plan.id));
        setPlan({ id: docRef.id, ...docRef.data() } as Plan);
      };
      set_up();
    }, [investment.plan.id]);

    const price = parseFloat(plan?.price!) * (100 / parseFloat(plan?.ROI!));

    return (
      <TableRow className={`bg-gray-50`} key={index}>
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{investment.status}</TableCell>
        <TableCell>{investment.user.name}</TableCell>
        <TableCell>{investment.plan.title}</TableCell>
        <TableCell>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </TableCell>
        <TableCell>
          {new Date(parseFloat(investment.createAt)).toDateString()}
        </TableCell>
        <TableCell>
          {new Date(investment.withdrawalDate).toDateString()}
        </TableCell>
        {user?.isAdmin && (
          <TableCell className="grid grid-cols-2">
            <span className="bg-green-700 mr-2 rounded-full flex items-center justify-center h-8 w-8 shadow-md">
              <i className="fas fa-edit text-white" />
            </span>
            <span className="bg-red-800 rounded-full flex items-center justify-center h-8 w-8 shadow-md">
              <i className="fas fa-trash text-white" />
            </span>
          </TableCell>
        )}
      </TableRow>
    );
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Table className="py-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>ROI</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            {user?.isAdmin && <TableHead>&nbsp;</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments &&
            investments.map((investment, index) => {
              return <Row investment={investment} index={index} />;
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvestmentTable;
