import { useParams } from "react-router-dom";
import AuthContext from "../../components/auth-provider";
import EditPlanForm from "../components/edit-plan-form";
import { useEffect, useState } from "react";
import { Plan } from "../../../../types";
import { getPlan } from "../helper";
import { notify, NotificationComponent } from "../../../../components/ui/toast";

const EditPlan = () => {
  const { id } = useParams();

  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const setup = async () => {
      const [error, _course] = await getPlan(id!);

      if (error) {
        notify(
          <NotificationComponent
            message={`Error, ${(error as Error).message}`}
          />,
          { className: "bg-red-500" }
        );
        console.log(error);
      }

      if (_course) {
        setPlan(_course);
      }
    };

    setup();
  }, [id]);
  return (
    <AuthContext>
      <section className="px-6 py-2">
        <div className="px-12 mt-8">
          <h3 className="text-2xl font-bold">Edit building plan</h3>
        </div>
        <section className="px-12 py-6 h-screen">
          {plan && (
            <div className="bg-white">
              <EditPlanForm plan={plan} />
            </div>
          )}
        </section>
      </section>
    </AuthContext>
  );
};

export default EditPlan;
