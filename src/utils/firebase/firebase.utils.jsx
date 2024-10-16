import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJeVOLyj55ZKM8tAdwf08X8T-Bys7wl9I",
  authDomain: "crwn-clothing-db-a76bc.firebaseapp.com",
  projectId: "crwn-clothing-db-a76bc",
  storageBucket: "crwn-clothing-db-a76bc.appspot.com",
  messagingSenderId: "49833067567",
  appId: "1:49833067567:web:9c42819ac68d39afa132da",
};

const firebaseApp = initializeApp(firebaseConfig); // Firebase 앱을 초기화

const googleProvider = new GoogleAuthProvider(); // Google 계정을 사용해 로그인하는데 필요한 제공자를 설정

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); // Firebase 인증 객체 생성
export const signInWhithGooglePopup = () => signInWithPopup(auth, googleProvider); // 팝업
export const signInWhithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); // 리다이렉션

export const db = getFirestore(); // Firestore 데이터베이스 객체를 초기화하여 데이터베이스와 상호작용

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey); // Firestore에서 특정 컬렉션을 참조
  const batch = writeBatch(db); // Firestore의 batch 객체를 생성하여 여러 쓰기 작업을 하나의 트랜잭션으로 처리

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // 각 객체의 title을 소문자로 변환하여 문서 참조를 생성
    batch.set(docRef, object); // batch에 문서를 설정하여 데이터베이스에 저장할 내용을 정의
  });
  await batch.commit(); // 모든 batch 작업을 Firestore에 커밋
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories"); // 'categories'라는 컬렉션을 참조
  const q = query(collectionRef); // 해당 컬렉션에 대해 쿼리를 생성

  const querySnapshot = await getDocs(q); // 쿼리 결과로부터 문서 스냅샷을 가져옴
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data(); // 각 문서에서 title과 items를 추출
    acc[title.toLowerCase()] = items; // title을 소문자로 변환한 것을 키로 하여 items를 저장
    return acc; // 누적된 객체를 반환
  }, {});

  return categoryMap; // 최종적으로 categories 데이터를 반환
};

// Firebase 인증을 통해 로그인한 유저의 정보를 Firestore 데이터베이스에 저장
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return; // userAuth: Firebase 인증을 통해 전달된 유저 객체

  const userDocRef = doc(db, "users", userAuth.uid); // Firestore에서 'users' 컬렉션의 특정 문서를 참

  const userSnapshot = await getDoc(userDocRef); // getDoc(): Firestore에서 해당 유저 문서의 스냅샷을 가져옴

  // 유저데이터 존재 x 유저 데이터가 없다면, 아래의 코드 블록에서 새 유저 데이터를 생성
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; // Firebase 인증 시 제공된 유저 정보
    const createdAt = new Date(); // 유저가 데이터베이스에 처음 저장되는 시점을 기록하기 위해 현재 날짜를 생성

    // setDoc(): Firestore에 유저 문서를 생성
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // 이 부분은 유저 정보가 Firestore에 없는 경우에만 실행
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // 유저 데이터 존재
  return userDocRef; //유저의 문서 참조(userDocRef)를 반환
};

// 이메일과 비밀번호로 Firebase 인증을 통해 새로운 유저를 생성하는 함수
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
}
// 이메일과 비밀번호로 로그인하는 함수
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
};
// 현재 로그인한 유저를 로그아웃하는 함수
export const signOutUser = async () => await signOut(auth);
// 유저의 로그인 상태가 변경될 때마다 특정 콜백 함수를 호출
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);