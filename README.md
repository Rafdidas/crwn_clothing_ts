# CRWN CLOTHING
#### 쇼핑몰 사이트 작업 중

## 1. 소개 및 참여 인원
- 쇼핑몰을 구성하고, 로그인, 장바구니 추가, 구매기능 구현 예정
- 개인 프로젝트

## 2. 사용 기술
#### `Front-end`
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

## 3. 핵심 기능
- 쇼핑몰 사이트
- firebase e-mail 로그인 가입, 구글 로그인 기능을 구성하여 로그인 가능 (firebase.utils.jsx)
- Context 를 사용하여 로그인 상태공유 및 카트상태 공유 (cart.context.jsx , user.context.jsx, product.contexts.jsx)
- checkout 페이지에서 결제 (예정)
ㅣ
## 4. 사이트 구성
   ### 메인 페이지 
   - 카테고리 메인구성을 구성
   ### 로그인 페이지
   - SIGN IN 페이지에 firebase로 e-mail 로그인 가입, 구글 로그인 기능을 구성하여 로그인 가능 (firebase.utils.jsx)
   ### 카트 모달
   - 퀵카트 기능을 추가하여 SHOP 페이지에서 'ADD TO CART' 클릭 시 카트에 담긴 상품과 담긴 갯수를 확인가능
   ### 결제 페이지
   - 체크아웃 페이지 작업 중

## 5. Context 개념 다지기
- context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공
- context는 React 컴포넌트 트리 안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법
- 그러한 데이터로는 현재 로그인한 유저, 카트에 담긴 상품을 쓸 수 있으므로 쇼핑몰에 사용
```
<UserProvider>
  <ProductsProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductsProvider>
</UserProvider>
```
App 컴포넌트 전역 사용하기 위해 
UserProvider, ProductsProvider, CartProvider 로 감쌈

```
export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity ,0);
        setCartCount(newCartCount);
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); // 상품 추가
    }

    const removeItemToCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove)); 
    };

    const clearItemToCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear)); 
    };

    const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemToCart,
      cartCount,
    }; // 전역 상태 값
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
```

```
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return <ProductContext.Provider value={value} >{children}</ProductContext.Provider>;
}
```

```
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };


    useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
        console.log(user);
        if(user) {
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });

      return unsubscribe;
    }, []);

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}
```
개념은 이해 하였지만 구성에 있어서 난항

## 6. firebase 구성
```
export const auth = getAuth(); // Firebase 인증 객체 생성
export const signInWhithGooglePopup = () => signInWithPopup(auth, googleProvider); // 팝업
export const signInWhithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); // 리다이렉션

export const db = getFirestore(); // Firestore 데이터베이스 객체를 초기화하여 데이터베이스와 상호작용
```
firebase에 카테고리 추가
```
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
```
데이터를 불러와 페이지에서 사용
```
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
```
유저 인증 부분
```
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
```
