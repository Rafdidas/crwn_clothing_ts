import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

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

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // 유저데이터 존재 x
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // 유저 데이터 존재
  return userDocRef;
};