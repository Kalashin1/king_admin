import Layout from "../layout";
import OrdersTable from "./components/orders-table";

const Orders = () => {
  return (
    <Layout>
      <div className="row">
        <OrdersTable />
      </div>
    </Layout>
  )
}

export default Orders;