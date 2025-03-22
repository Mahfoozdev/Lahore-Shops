import { FaRegBell } from "react-icons/fa";
import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import userImg from "../image/userImg.jpg";
import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { BarChart } from "../components/Charts";
import { BiMaleFemale } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data ,users, docs" />
          <FaRegBell />
          <img src={userImg} alt="" />
        </div>

        <section className="widgetContainer">
          <WidgetItem
            percent={40}
            amount={true}
            value={34000}
            heading="Revenue"
            color="rgb(0,115,255)"
          />

          <WidgetItem
            percent={-14}
            value={400}
            heading="Users"
            color="rgb(0,198,202)"
          />

          <WidgetItem
            percent={80}
            value={23000}
            heading="Transactions"
            color="rgb(255,196,0)"
          />

          <WidgetItem
            percent={30}
            value={1000}
            heading="Products"
            color="rgb(76,0,255)"
          />
        </section>

        {/* Graph Section starts */}

        <section className="graphContainer">
          <div className="revenueChart">
            <h2>Revenue & Transactions</h2>
            <BarChart
              data_1={[300, 144, 433, 655, 237, 755, 190]}
              data_2={[200, 244, 333, 755, 137, 955, 490]}
              title_1="Rrevenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgb(53,162,235,0.8)"
            />
          </div>
          <div className="dashboardCategories">
            <h2>Inventory</h2>
            <div>
              {/* {data.categories.map((i) => (
                <Categories
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4},${i.value}%,50%)`}
                />
              ))} */}
            </div>
            <div></div>
          </div>
        </section>

        <section>
          <div>
            <h2>Gender Ratio</h2>
            <p>
              <BiMaleFemale />
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount ? `Rs. ${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiOutlineArrowTrendingUp /> +{percent}%
        </span>
      ) : (
        <span className="red">
          <HiOutlineArrowTrendingDown /> {percent}%
        </span>
      )}
    </div>
    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(
      ${color} ${(Math.abs(percent) / 100) * 360}deg,
      rgb(255,255,255) 0
      )`,
      }}
    >
      <span style={{ color }}>{percent}%</span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}
const Categories = ({ color, value, heading }: CategoryItemProps) => (
  <div className="categoryItem">
    <h5>{heading}</h5>
    <div>
      <div style={{ backgroundColor: color, width: `${value}%` }}></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
