import Layout from "../components/layout";
import Profile from "./components/profile";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="px-12 py-8">
        <h3 className="text-2xl font-bold">Your Profile</h3>
      </div>
      <section className="pb-8">
        <Profile />
      </section>
    </Layout>
  );
};

export default ProfilePage;
