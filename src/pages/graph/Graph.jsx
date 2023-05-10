import "./graph.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import SeparateCharts from "../../components/charts/SeparateCharts";

const Graph = () => {
  return (
    <div className="graph">
      <Sidebar />
      <div className="graphContainer">
        <div>
          <SeparateCharts />
        </div>
      </div>
    </div>
  );
};

export default Graph;
