import Layout from "../../components/layout";
import CreateInvestmentForm from "./components/create-investment-form";

const CreateInvestment = () => {
  return (
    <Layout>
      <section className="px-8 py-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <CreateInvestmentForm />
      </section>
    </Layout>
  );
};

export default CreateInvestment;
