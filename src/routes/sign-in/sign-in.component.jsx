import { signInWhithGooglePopup } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    
    const logGoogleUser = async () => {
        const response = await signInWhithGooglePopup();
        console.log(response);
    }
    
    return (
        <div>
            <h1>sign in</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn;