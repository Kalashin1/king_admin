import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useContext, useRef, useState } from "react";
import Select from "react-select";
import { db } from "../../../../../firebase-setting";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../../navigation/constant";
import { LoaderContext } from "../../../../../App";

const CreatePlanForm = () => {
  const [duration, setDuration] = useState(14);
  const durations = [
    { value: 14, label: "2 Weeks", ROI: 50 },
    { value: 30, label: "30 Days", ROI: 100 },
    { value: 90, label: "3 Months", ROI: 200 },
    {
      value: 180,
      label: "6 Months",
      ROI: 500,
    },
  ];

  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const createPlan = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);
    const {
      plan_title: { value: title },
      price: { value: price },
      description: { value: description },
      roi: { value: roi },
    } = formRef.current!;
    try {
      const doc = await addDoc(collection(db, "plans"), {
        title,
        price,
        description,
        duration,
        ROI: roi,
      });
      setIsLoading!(false);
      console.log(doc.id);
      navigate(SCREENS.PLANS);
    } catch (error) {
      setIsLoading!(false);
      alert("error creating investment plan");
      // handle error later
      console.log("error", error);
    }
  };

  return (
    <form
      onSubmit={createPlan}
      className="form bg-white p-6 my-10 relative"
      ref={formRef}
    >
      <h3 className="text-2xl text-gray-900 font-semibold mb-6">
        Create Investment Plan
      </h3>
      <p className="text-gray-600 mb-4">
        Create a new investment plan for a user
      </p>
      <div className="flex space-x-5 mt-3">
        <input
          type="text"
          name="plan_title"
          id=""
          placeholder="Title"
          className="border p-2  w-1/2"
        />
        <input
          type="number"
          name="price"
          id=""
          placeholder="price"
          className="border p-2 w-1/2"
        />
      </div>
      <div className="w-full py-4 flex justify-between">
        <div className="w-1/2 flex justify-between mr-4">
          <Select
            placeholder="Duration"
            options={durations}
            className="w-full"
            onChange={(v) => setDuration(v?.value as number)}
          />
        </div>
        <div className="w-1/2">
          <input
            type="number"
            name="roi"
            placeholder="ROI"
            className="border p-2 w-full"
          />
        </div>
      </div>

      <textarea
        name="description"
        id=""
        cols={10}
        rows={3}
        placeholder="Add a little description about this plan"
        className="border p-2 mt-3 w-full"
      ></textarea>

      <input
        type="submit"
        value="Submit"
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
      />
    </form>
  );
};

export default CreatePlanForm;
