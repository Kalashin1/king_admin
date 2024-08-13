import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Plan } from "../../../../types";
import { formatter } from "../../helper";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../components/dropdown";
import { SCREENS } from "../../../../navigation/constant";

const CreatePlanTable: FC<{
  plans: Plan[];
}> = ({ plans }) => {
  const navigate = useNavigate();

  const PlanTableRow = ({ plan, index }: { plan: Plan; index: number }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
      <TableRow
        className={`bg-gray-50`}
        key={index}
        onClick={() => setShowDropdown(false)}
      >
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{plan.title}</TableCell>
        <TableCell>
          {formatter({ currency: "USD" }).format(plan.price)}
        </TableCell>
        <TableCell>
          <span
            className="cursor-pointer bg-gray-500 rounded-full flex items-center justify-center h-8 w-8 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <i className="fas fa-ellipsis-vertical text-white" />
          </span>
        </TableCell>
        {showDropdown && (
          <div className="w-36 absolute right-6 top-20 z-[200]">
            <Dropdown>
              <ul>
                <li>
                  <button
                    className="flex h-8 space-x-3 px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 w-full dark:focus:bg-navy-600 dark:focus:text-navy-100 justify-between items-center"
                    onClick={() => navigate(SCREENS.EDIT_PLAN(plan.id))}
                  >
                    <span>Edit</span>
                    <i className="fas fa-edit" />
                  </button>
                </li>
                <li>
                  <button className="flex h-8 space-x-3 px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 w-full dark:focus:bg-navy-600 dark:focus:text-navy-100 justify-between items-center">
                    <span>Delete</span>
                    <i className="fas fa-trash" />
                  </button>
                </li>
              </ul>
            </Dropdown>
          </div>
        )}
      </TableRow>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Table className="py-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans &&
            plans.map((plan, index) => (
              <PlanTableRow plan={plan} key={index} index={index} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreatePlanTable;
