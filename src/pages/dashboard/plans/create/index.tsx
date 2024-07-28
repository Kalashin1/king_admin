import AuthContext from "../../components/auth-provider";
import CreatePlanForm from "../components/create-plan-form";

const CreatePlan = () => {
  return (
    <AuthContext>
      <section className="px-6 py-2">
        <div className="px-12 mt-8">
          <h3 className="text-2xl font-bold">Create a new building plan</h3>
        </div>
        <section className="px-12 py-6 h-screen">
          <div className="bg-white">
            <CreatePlanForm />
          </div>
        </section>
      </section>
    </AuthContext>
  );
};

export default CreatePlan;
