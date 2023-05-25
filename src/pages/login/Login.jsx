import "./login.scss";
import SignIn from "../../components/login/SignIn";

const LoginP = () => { 
  return (
    <div className="login"> 
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