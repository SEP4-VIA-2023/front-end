import "./signup.scss";
import SignUp from "../../components/login/SignUp";

const SignUpP = () => { 
  return (
    <div className="signUp"> 
     <div className="signUpContainer"> 
        <SignUp />
     </div>
     <div data-testid="signUp">
      {/* ... */}
    </div>
    </div>
  
  );
}

export default SignUpP;