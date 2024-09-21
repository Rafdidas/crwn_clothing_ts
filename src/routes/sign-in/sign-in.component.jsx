import {
  signInWhithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpform from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWhithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    
    return (
      <div>
        <h1>sign in</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        <SignUpform/>
      </div>
    );
}

export default SignIn;