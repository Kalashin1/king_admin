import { Link } from "react-router-dom";
import { SCREENS } from "../navigation/constants";

const Sidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
            <i className="icon-layout menu-icon"></i>
            <span className="menu-title">Plans</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className="nav-link" to={SCREENS.CREATE_PLAN}>Create Plan</Link></li>
              <li className="nav-item"> <Link className="nav-link" to={SCREENS.PLANS}>Plans</Link></li>

            </ul>
          </div>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={SCREENS.COURSES}>
            <i className="icon-bar-graph menu-icon"></i>
            <span className="menu-title">Courses</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={SCREENS.ORDERS}>
            <i className="icon-bar-graph menu-icon"></i>
            <span className="menu-title">Orders</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={SCREENS.INVOICES} className="nav-link">
            <i className="icon-grid-2 menu-icon"></i>
            <span className="menu-title">Invoices</span>
          </Link>

        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;