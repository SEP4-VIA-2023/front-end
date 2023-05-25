import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import WidgetContainer from "../../components/widget/WidgetContainer";
import Chart from "../../components/charts/Chart";

const Home = () => { 
  return (
    <div className="home"> 
     <Sidebar/> 
     <div className="homeContainer"> 
     <div>
      <WidgetContainer />
    </div>
        <Chart />
     </div>
     <div data-testid="home">
      {/* ... */}
    </div>
    </div>
  
  );
}

export default Home;