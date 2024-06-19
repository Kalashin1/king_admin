import Layout from "../layout";
import PlansTable from "./components/plans-table";

const Plans = () => {
  return (
    <Layout>
      <div className="row">
        <PlansTable />
      </div>
    </Layout>
  );
};

export default Plans;