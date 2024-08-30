import { Dispatch, FC, SetStateAction, useState } from "react";
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
import { Dropdown } from "../../components/dropdown";
import { SCREENS } from "../../../../navigation/constant";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { NotificationComponent, notify } from "../../../../components/ui/toast";

const CreateCourseTable: FC<{
  courses: Course[];
  loadCourses: () => Promise<void>;
}> = ({ courses, loadCourses }) => {
  const navigate = useNavigate();
  const CourseTableRow = ({
    course,
    index,
  }: {
    course: Course;
    index: number;
  }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const deleteCourse = async (id: string) => {
      await deleteDoc(doc(db, "courses", id));
      notify(<NotificationComponent message="Course deleted successfully!" />);
      loadCourses();
    };
    return (
      <TableRow
        className={`bg-gray-50 relative`}
        onClick={() => setShowDropdown(false)}
      >
        <TableCell className="font-medium">{index + 1}</TableCell>
        <TableCell>{course.title}</TableCell>
        <TableCell>
          {formatter({ currency: "USD" }).format(course.price)}
        </TableCell>
        <TableCell>{course?.students?.length}</TableCell>
        <TableCell>{course.status}</TableCell>
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
          <div className="w-36 absolute right-6 top-4 z-[200]">
            <Dropdown>
              <ul>
                <li>
                  <button
                    className="flex h-8 space-x-3 px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 w-full dark:focus:bg-navy-600 dark:focus:text-navy-100 justify-between items-center"
                    onClick={() => navigate(SCREENS.EDIT_COURSE(course.id))}
                  >
                    <span>Edit</span>
                    <i className="fas fa-edit" />
                  </button>
                </li>
                <li>
                  <button className="flex h-8 space-x-3 px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 w-full dark:focus:bg-navy-600 dark:focus:text-navy-100 justify-between items-center" onClick={() => deleteCourse(course.id)}>
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
            <TableHead>Students</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses &&
            courses.map((course, index) => (
              <CourseTableRow course={course} key={index} index={index} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CreateCourseTable;
