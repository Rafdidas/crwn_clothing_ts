import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJeVOLyj55ZKM8tAdwf08X8T-Bys7wl9I",
  authDomain: "crwn-clothing-db-a76bc.firebaseapp.com",
  projectId: "crwn-clothing-db-a76bc",
  storageBucket: "crwn-clothing-db-a76bc.appspot.com",
  messagingSenderId: "49833067567",
  appId: "1:49833067567:web:9c42819ac68d39afa132da",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWhithGooglePopup = () => signInWithPopup(auth, provider);