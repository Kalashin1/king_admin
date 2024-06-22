import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase-settings";

const PlanTables = () => {
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    const querySnapshot = await getDocs(collection(db, "plans"));
    setPlans(querySnapshot.docs.map((doc) => doc.data()));
  }

  useEffect(() => {
    const setUp = async () => {
      await getPlans();
    }

    setUp();
  }, []);

  console.log('plans', plans);

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Plan Table</h4>
          <p className="card-description">
            View all your created plans
          </p>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {plans && plans.map((plan, index) => (
                  <tr key={index}>
                    <td>{plan.title}</td>
                    <td>${plan.price}</td>
                    <td>{new Date().toDateString()}</td>
                    {/* <td><label className="badge badge-danger">Pending</label></td> */}
                  </tr>
                ))}


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTables;