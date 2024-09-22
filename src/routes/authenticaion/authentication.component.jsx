import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authenticaion = () => {    
    return (
      <div>
        <h1>Sign in Page</h1>
        <SignInForm />
        <SignUpForm />
      </div>
    );
}

export default Authenticaion;