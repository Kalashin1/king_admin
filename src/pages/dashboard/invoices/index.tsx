import { useEffect, useState } from "react";
import OrderTable from "./components/invoice-table";
import { Invoice } from "../../../types";
import AuthContext from "../components/auth-provider";
import { fetchOrders } from "./helper";
import { NotificationComponent, notify } from "../../../components/ui/toast";

const Orders = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoices = async () => {
    const [error, _invoices] = await fetchOrders(
      localStorage.getItem("user_id")!
    );

    if (error) {
      notify(<NotificationComponent message="Error ferching orders" />, {
        className: "bg-red-500 text-white font-bold",
      });
    }

    if (_invoices) {
      setInvoices(_invoices);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);
  return (
    <AuthContext>
      <>
        <div className="px-12 py-8">
          <h3 className="text-2xl font-bold">Users</h3>
        </div>
        <section className="px-12 py-6 h-screen">
          <div className="bg-white">
            {invoices && (
              <OrderTable invoices={invoices} updateInvoice={getInvoices} />
            )}
          </div>
        </section>
      </>
    </AuthContext>
  );
};

export default Orders;
