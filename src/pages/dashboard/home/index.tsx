import AuthContext from "../components/auth-provider";
const Home = () => {
  return (
    <AuthContext>
      <h1>Hello</h1>
    </AuthContext>
  );
};

export default Home;
