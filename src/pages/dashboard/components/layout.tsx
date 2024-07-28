import { ReactNode, FC } from "react";
import Appbar from "./appbar";
import Footer from "./footer";

const Layout: FC<{
  children: ReactNode;
  profilePic: string;
  initials: string;
}> = ({ children, profilePic, initials }) => {
  return (
    <div className="bg-gray-100">
      <Appbar initials={initials} profilePicURL={profilePic} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
