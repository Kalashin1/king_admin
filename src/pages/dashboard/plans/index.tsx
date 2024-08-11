import { useEffect, useState } from "react";
import AuthContext from "../components/auth-provider";
import PlanTable from "./components/plans-table";
import { Plan } from "../../../types";
import { fetchPlans } from "./helper";
import { NotificationComponent, notify } from "../../../components/ui/toast";

const Courses = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const loadPlans = async () => {
    const [error, _plans] = await fetchPlans();
    if (error) {
      notify(<NotificationComponent message="error fetching plans" />, {
        className: "bg-red-500 font-bold",
      });
      console.log(error);
    }

    if (_plans) {
      console.log(_plans);
      setPlans(_plans);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <AuthContext>
      <section className="px-6 py-2">
        <div className="px-12 mt-8">
          <h3 className="text-2xl font-bold">
            View your {/* // TODO: Change text based on user  */} Plans
          </h3>
        </div>
        <section className="px-12 py-6 h-screen">
          <div className="bg-white">
            <PlanTable plans={plans} />
          </div>
        </section>
      </section>
    </AuthContext>
  );
};

export default Courses;
