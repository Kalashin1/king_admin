/* eslint-disable react/prop-types */
import Navbar from "../../components/navbar";
import SettingsShort from "../../components/settings-short";
import RightSideBar from "../../components/right-sidebar";
import Sidebar from "../../components/sidebar";

const Layout = ({
  children
}) => {
  return (
    <div className="container-scroller">
      <Navbar />

      <div className="container-fluid page-body-wrapper">
        <SettingsShort />
        <RightSideBar />
        <Sidebar />

        <div className="main-panel">
          <div className="content-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;