import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/Chart";
import WidgetContainer from "../../components/widget/WidgetContainer";




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