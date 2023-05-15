import "./login.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import SignIn from "../../components/login/SignIn";

const LoginP = () => { 
  return (
    <div className="login"> 
     <Sidebar/> 
     <div className="loginContainer"> 
        <SignIn />
     </div>
     <div data-testid="login">
      {/* ... */}
    </div>
    </div>
  
  );
}

export default LoginP;