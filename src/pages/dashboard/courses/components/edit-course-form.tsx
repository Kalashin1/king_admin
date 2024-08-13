import Input from "../../../../components/ui/input";
import TextArea from "../../../../components/ui/text-area";
import { Course, COURSE_STATUS } from "../../../../types";
import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import { NotificationComponent, notify } from "../../../../components/ui/toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { LoaderContext } from "../../../../App";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constant";
import { useDropzone } from "react-dropzone";
import { uploadAsset } from "../../helper";

const EditCourseForm = ({ course }: { course: Course }) => {
  const courseFormRef = useRef<HTMLFormElement | null>(null);
  const { setIsLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   setFiles(acceptedFiles);
  // }, []);

  const onThumbnailDrop = useCallback((acceptedFiles: File[]) => {
    setThumbnail(acceptedFiles);
  }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const {
    getRootProps: _getRootProps,
    getInputProps: _getInputProps,
    isDragActive: _isDragActive,
  } = useDropzone({ onDrop: onThumbnailDrop });
  // const [files, setFiles] = useState<File[]>([]);

  const [thumbnailFile, setThumbnail] = useState<File[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);
    const {
      course_title: { value: title },
      price: { value: price },
      description: { value: description },
      link: { value: link },
    } = courseFormRef.current!;
    try {
      const imageURL = await uploadAsset(
        thumbnailFile,
        `courses/thumbnail/${title}/`,
        false
      );
      await updateDoc(doc(db, "courses", course.id), {
        title,
        price: parseFloat(price),
        description,
        updatedAt: new Date().getTime(),
        createdAt: new Date().getTime(),
        students: [],
        status: COURSE_STATUS[0],
        thumbnail: imageURL ?? course.thumbnail,
        // files: [..._files, ...course.files],
        link,
      });
      setIsLoading!(false);
      notify(<NotificationComponent message="Course created successfully!" />, {
        className: "font-bold",
      });
      navigate(SCREENS.COURSES);
    } catch (error) {
      setIsLoading!(false);
      notify(<NotificationComponent message="Error creating course" />, {
        className: "bg-red-500 font-bold",
      });
      console.log("Error", error);
    }
  };

  return (
    <form
      className="bg-white rounded-md shadow-2xl p-5"
      ref={courseFormRef}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello</h1>
          <p className="text-sm font-normal text-gray-600 mb-8">
            Create Course
          </p>
        </div>

        <button
          className="rounded-full w-10 h-10 shadow-md border-0 bg-orange-300 text-white"
          {..._getRootProps()}
        >
          <input className="hidden" {..._getInputProps()} multiple={false} />
          {_isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <i className="fas fa-upload" />
          )}
        </button>
      </div>
      <Input
        name="course_title"
        type="text"
        placeholder="Enter a title for your course"
        hasIcon={true}
        defaultValue={course?.title}
        icon={"fas fa-heading"}
      />

      <div className="grid grid-cols-2 gap-x-1 -pb-4">
        <Input
          name="price"
          type="number"
          defaultValue={String(course.price)}
          hasIcon={true}
          icon={"fas fa-dollar-sign"}
        />
        <Input
          name="link"
          type="text"
          hasIcon={true}
          defaultValue={course.link}
          icon={"fas fa-link"}
        />
      </div>

      <TextArea
        name="description"
        defaultValue={course?.description}
        placeholder="Enter a description for your course"
      />

      {/* <div
        className="border
       rounded p-4 cursor-pointer"
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} multiple={false} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag n drop some files here, or click to select files</p>
          )}
        </div>
      </div> */}

      <div className="my-4"></div>

      <button
        type="submit"
        className="block w-full bg-indigo-600 mt-5 py-2 rounded-md hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
      >
        {"Edit Course"}
      </button>
    </form>
  );
};

export default EditCourseForm;
