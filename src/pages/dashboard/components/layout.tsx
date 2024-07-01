import { ReactNode, FC } from "react";
import Appbar from "./appbar";
import Footer from "./footer";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
