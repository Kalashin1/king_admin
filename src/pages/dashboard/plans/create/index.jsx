import Layout from "../../layout";
import CreatePlanForm from "./components/create-plan";

const CreatePlan = () => {
  return (
    <Layout>
      <div className="row">
        <CreatePlanForm />
      </div>
    </Layout>
  )
}

export default CreatePlan;