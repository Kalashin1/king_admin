import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Course } from "../../../../types";
import { formatter } from "../../helper";

const CreateCourseTable: FC<{
  courses: Course[];
}> = ({ courses }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Table className="py-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses &&
            courses.map((course, index) => (
              <TableRow className={`bg-gray-50`} key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>
                  {formatter({ currency: "USD" }).format(course.price)}
                </TableCell>
                <TableCell>{course.students.length}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>
                  <span
                    className="cursor-pointer bg-gray-500 rounded-full flex items-center justify-center h-8 w-8 shadow-md"
                    onClick={() => {}}
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

export default CreateCourseTable;
