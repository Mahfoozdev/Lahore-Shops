// import { IconType } from "react-icons";
import { Link, useLocation, Location } from "react-router-dom";
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { IconType } from "react-icons";
import { FaChartBar, FaChartPie, FaChartLine } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside className="adminSidebar">
      <h2>LOGO</h2>

      <div>
        <h5>Dashboard</h5>
        <ul>
          <Li
            url="/admin/dashboard"
            text="Dashboard"
            Icon={RiDashboardFill}
            location={location}
          />
          <Li
            url="/admin/products"
            text="Products"
            Icon={RiShoppingBag3Fill}
            location={location}
          />
          <Li
            url="/admin/costumers"
            text="Costumers"
            Icon={IoIosPeople}
            location={location}
          />
          <Li
            url="/admin/transaction"
            text="Transactions"
            Icon={AiFillFileText}
            location={location}
          />
        </ul>
      </div>
      <DivTwo location={location} />
    </aside>
  );
};
interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgba(0,115,255)" : "black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5>Charts</h5>
    <ul>
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={FaChartBar}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={FaChartLine}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={FaChartPie}
        location={location}
      />
    </ul>
  </div>
);

export default AdminSidebar;
