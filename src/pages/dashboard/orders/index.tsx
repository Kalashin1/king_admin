import { useEffect, useState } from "react";
import OrderTable from "./components/orders-table";
import { Order } from "../../../types";
import AuthContext from "../components/auth-provider";
import { fetchOrders } from "./helper";
import { NotificationComponent, notify } from "../../../components/ui/toast";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    const [error, _orders] = await fetchOrders(
      localStorage.getItem("user_id")!
    );

    if (error) {
      notify(<NotificationComponent message="Error ferching orders" />, {
        className: "bg-red-500 text-white font-bold",
      });
    }

    if (_orders) {
      setOrders(_orders);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <AuthContext>
      <>
        <div className="px-12 py-8">
          <h3 className="text-2xl font-bold">Users</h3>
        </div>
        <section className="px-12 py-6 h-screen">
          <div className="bg-white">
            {orders && <OrderTable orders={orders} updateOrders={getOrders} />}
          </div>
        </section>
      </>
    </AuthContext>
  );
};

export default Orders;
