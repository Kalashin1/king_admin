import Welcome from "./components/welcome";
import Layout from "./layout";
import PlanTables from "./plans/components/plans-table";
const Dashboard = () => {
  return (
    <Layout>
      <Welcome />
      <PlanTables />
    </Layout>
  )
}

export default Dashboard;