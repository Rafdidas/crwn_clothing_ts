# CRWN CLOTHING
#### https://crwn-shop-clothing.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/7b422fc2-59c1-4f8b-b729-c174a3fd2002/deploy-status)](https://app.netlify.com/sites/about-me-v1/deploys)

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
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

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
   - 카트에 담긴 상품들이 cart.context로 전달 되고, 수량 조절 및 총합계 계산
   ### 리스트 페이지 (shop)
   - 카테고리 별 예시 상품이 4개 노출, 카테고리 클릭 시 해당 리스트페이지로 이동

## 5. Shop 페이지
- 전역적으로 제품 정보를 관리할 수 있는 컨텍스트를 생성
- firebase.util 의 getCategoriesAndDocuments 를 사용
```
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap();
    }, []);
    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>;
}
```
### 5.1 카테고리 별 미리보기 페이지
- CategoriesPreview 로 전달
```
const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};
```
- CategoryPreview 에서 예시 상품을 4가지 표시 중
```
const CategoryPreview = ({ title, products }) => {
    return (
      <div className="category-preview-container">
        <h2>
          <Link className="title" to={title}>
            {title.toUpperCase()}
          </Link>
        </h2>
        <div className="preview">
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      </div>
    );
}
```
### 5.2 카테고리 별 리스트 페이지
- Shop 컴포넌트에서 Route로 분리
```
<Routes>
  <Route index element={ <CategoriesPreview /> } />
  <Route path=':category' element={ <Category /> } />
</Routes>
```

- UseParams 를 사용하여 category명을 전달하여 해당 카테고리 노출</br>
- Category 컴포넌트는 useParams() 훅을 사용하여 현재 경로에서 :category 파라미터를 가져옴</br>
- useContext()를 통해 CategoriesContext로부터 categoriesMap을 불러온 후,</br>
- setProducts(categoriesMap[category])로 categoriesMap에서 해당하는 카테고리의 제품 목록을 가져와 상태로 설정</br>
- useEffect는 category와 categoriesMap이 변경될 때마다 실행</br>
- category가 변경될 때마다 (즉, 사용자가 다른 카테고리로 이동할 때), 새로운 카테고리의 제품 목록을 다시 설정</br>
- 그 후, 상태에 저장된 products를 이용해 ProductCard 컴포넌트를 렌더링

```
const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
      <Fragment>
        <h2 className="category-title">{category.toUpperCase()}</h2>
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Fragment>
    );
```

## 6. Context 개념 다지기
### 현재 Redux로 이식함
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

user.constext.jsx
cart.constext.jsx
categories.constext.jsx

참고

최종적으로 Provider를 반환하여, value 속성을 통해 장바구니와 관련된 상태 및 함수들을 하위 컴포넌트에 전달

### useReducer와 UserContext
- 개념적 차이
  #### useReducer : 
  - useReducer는 React의 훅 중 하나로, 컴포넌트의 상태를 관리하는 데 사용
  - useState와 유사하지만, 여러 상태를 객체 형태로 관리할 수 있고, 액션과 리듀서를 통해 상태를 업데이트 이로 인해 상태 변경 로직을 더 명확하고 예측 가능하게 만들 수 있다.
  - 주로 특정 컴포넌트 내에서 상태를 관리하는 데 사용
  #### UserContext :
  - UserContext는 React의 Context API를 사용하여 상태를 전역에서 공유하는 용도
  - Context는 컴포넌트 트리 전체에서 데이터를 전달할 수 있게 해 주며, 중간 컴포넌트를 통해 props를 전달하지 않고도 상태를 공유
  - 인증된 사용자 정보, 테마 설정, 언어 선택 등을 Context를 통해 하위 컴포넌트에서 사용
  - 상태를 전역에서 공유해야 할 필요가 있을 때 사용
  #### 결론
  - **useReducer**는 복잡한 상태 로직을 다루기 위한 방법이며, 상태 관리를 위한 리듀서를 사용
  - **UserContext**는 전역 상태를 공유하기 위한 방법으로, Context API를 사용하여 데이터를 전달
  


## 7. firebase 구성
```
export const auth = getAuth(); // Firebase 인증 객체 생성
export const signInWhithGooglePopup = () => signInWithPopup(auth, googleProvider); // 팝업
export const signInWhithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); // 리다이렉션

export const db = getFirestore(); // Firestore 데이터베이스 객체를 초기화하여 데이터베이스와 상호작용
```
- firebase에 카테고리 추가
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
- 데이터를 불러와 페이지에서 사용
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
- 유저 인증 부분
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

## 8. Redux 구성
- userContext 를 Redux 구성
- UserProvider 를 삭제 후 react-redux Provider
- yarn add redux react-redux redux-logger
- yarn add reselect
```
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

#### store.js
- redux-logger는 Redux 미들웨어로, 액션이 디스패치될 때마다 상태 변경 내역을 콘솔에 출력
- rootReducer는 애플리케이션의 모든 리듀서를 합친 루트 리듀서 여러 개의 리듀서를 combineReducers 함수로 결합
- const middleWares = [logger]; 미들웨어를 관리할 배열을 만들고, 그 안에 logger 미들웨어를 추가
- applyMiddleware를 사용하여 미들웨어를 추가하고, compose로 미들웨어를 결합하여 Redux가 이를 사용할 수 있게 함
- createStore 함수를 사용해 Redux 스토어를 생성
- 첫 번째 인자는 루트 리듀서, 두 번째 인자는 초기 상태로 undefined가 들어가며, 세 번째 인자로 composedEnhancers
- 이렇게 생성된 store는 애플리케이션의 전역 상태를 관리
- compose는 이 미들웨어들이 순서대로 동작하도록 연결해줍니다. compose는 여러 enhancer를 결합할 수 있게 해주는 함수로, Redux에서는 applyMiddleware 같은 enhancer를 compose로 결합하여 createStore의 세 번째 인자로 전달

```
import { compose,  legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; 

import { rootReducer } from "./root-reducer";

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares)); 

export const store = createStore(rootReducer, undefined, composedEnhancers);

```

#### user.reducer.js
- userReducer는 Redux의 리듀서 함수로, 특정 액션이 디스패치될 때 상태를 업데이트
- action 객체에서 type과 payload를 구조 분해 할당으로 가져옴
- switch 문을 사용하여 액션의 type에 따라 상태를 업데이트

```
import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

//상태를 업데이트하는 함수
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};

```

#### user.action.js
- createAction(type, payload)를 호출하면 { type, payload } 형태의 객체를 반환
- setCurrentUser는 user라는 인자를 받아, USER_ACTION_TYPES.SET_CURRENT_USER 타입의 액션 객체를 반환하는 액션 생성 함수
- createAction을 통해 { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user } 형태의 객체를 반환
- 이 함수가 반환하는 객체는 Redux 스토어에 디스패치되어, userReducer가 이를 통해 상태를 업데이트

```
import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}
```

#### user.selector.js
- 이 state는 Redux 스토어의 전체 상태를 나타냄
- state.user.currentUser를 통해 Redux 스토어에서 user 리듀서의 상태에서 currentUser 값을 가져옴
- state.user는 userReducer에서 관리하는 상태를 포함하는 객체
- currentUser는 현재 사용자의 정보를 담고 있는 속성
- 이 값은 로그인된 사용자 정보가 포함되거나, 사용자가 로그인하지 않았다면 null

```
export const selectCurrentUser = (state) => state.user.currentUser;
```
- categories, cart context도 redux로 구성

## 8-1 redux-persist
- yarn add redux-persist
- Redux 상태를 지속적으로 유지(persist)하기 위한 라이브러리
- 이로 인해 사용자가 애플리케이션을 새로 고침하거나 종료한 후 다시 실행하더라도, Redux 상태가 초기화되지 않고 마지막 상태가 그대로 유지

### 주요 기능
- 스토어 지속성 유지: 상태 데이터를 브라우저 스토리지에 저장하고, 애플리케이션 재실행 시 저장된 상태를 불러옴
- 화이트리스트/블랙리스트: 특정 리듀서의 상태만 선택적으로 저장하거나 제외 가능
- 자동 복원: 새로 고침 시 저장된 상태를 자동으로 복원하여 상태 초기화를 방지


- persistStore, persistReducer: redux-persist에서 스토어를 유지시키는 데 필요한 함수
- storage: localStorage에 데이터를 저장하는 저장소 설정
- persistConfig: 어떤 상태를 지속적으로 유지할지 설정하는 객체
- key: 'root': Redux persist의 키를 'root'로 지정하여 스토리지에 저장할 때 구분
- storage: localStorage를 사용하도록 설정
- blacklist: user 리듀서의 상태는 저장되지 않도록 블랙리스트에 추가


```
import { compose,  legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],   
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

```
- persistedReducer: rootReducer에 persistConfig 설정을 반영한 리듀서를 만듦
- persistor: persistStore(store)로 스토어가 유지될 수 있도록 설정된 객체

### index.js

- PersistGate: redux-persist에서 제공하는 컴포넌트로, persistor가 Redux 스토어를 유지하게 함
- store와 persistor: 전역 상태 관리를 위해 store는 Redux 스토어, persistor는 redux-persist에서 상태를 지속시키기 위한 객체

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

### redux-thunk

- yarn add redux-thunk
- Redux 미들웨어를 간단하게 요약하면 action을 dispatch로 전달하고 reducer에 도달하기 이전에 지정된 작업을 실행할 수 있게 해주는 중간자이다. 
- reducer가 dispatch 받은 액션을 처리하기 전에 할 수 있는 작업들은 다양한데 예를 들면 로깅, API 비동기 작업, 라우팅 등이 있다. 
- 비동기처리를 위한 미들웨어 : Redux Thunk
- Redux Thunk는 리덕스를 사용하는 앱에서 비동기 작업을 수행할 때 많이 사용하는 방법이다. 
- 리덕스에서 상태값을 변화시키기 위해 useDispatch 함수를 사용하여 액션 객체를 생성하여 reducer 에게 전달하게 되는데 
- Redux Thunk를 사용하면 Thunk 함수를 dispatch하고 사전에 수행해야 할 작업을 처리 후 결과 값을 함수 내부에서 다시 dispatch 하여 reducer에게 전달할 수 있다.

- store.js 추가 부분
```
const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);
```

- categoty.types 추가 부분
```
export const CATEGORIES_ACTION_TYPES = {
  FETCH_CATEGORIES_START: "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORIES_FAILED",
};
```

- categoty.reducer 추가 부분
```
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} ) => {
    const { type, payload } = action;
    
    switch (type) {
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
        return { ...state, isLoading: true };
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
        return { ...state, categories: payload, isLoading: false };
      case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
        return { ...state, error: payload, isLoading: false };
      default:
        return state;
    }
}
```

- category.action 추가 부분
```
import { CATEGORIES_ACTION_TYPES } from "./category.types";

import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";


export const fetchCategoriesStart = () => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuments("categories");  
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
}
```

- category.selector 추가 부분
```
export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
```

### redux-saga
- yarn add redux-saga
- redux-thunk 를 대체할 예제

### stripe 결제 추가
- Elements는 Stripe 컨텍스트를 제공하는 컴포넌트로, 내부적으로 Stripe API와 통신하며, 해당 컴포넌트 안에서 Stripe의 결제와 관련된 모든 컴포넌트를 사용할 수 있도록 설정해 줍니다.
- Elements는 Stripe API 키를 필요로 하며, 애플리케이션 전반에 걸쳐 Stripe 객체를 공유할 수 있도록 합니
- stripePromise는 loadStripe 함수로 생성된 Promise 객체입니다.
- Stripe API 키를 제공하여 초기화된 Stripe 객체를 비동기로 로드합니다.
- stripePromise를 Elements 컴포넌트에 전달하면 내부적으로 Stripe 객체를 생성하고 결제 관련 컴포넌트와 연결합니다.
```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```
- stripePromise는 보통 별도의 유틸리티 파일에서 정의
- loadStripe 함수에 Publishable Key를 전달하여 Stripe 객체를 초기화합니다.
(이 키는 Stripe 대시보드에서 확인 가능하며, 반드시 공개 가능한 키여야 합니다.)
- 
```
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
```

- payment-form.component.jsx
- useStripe() : Stripe 인스턴스를 반환하며, 결제를 처리할 때 사용
- Elements 컴포넌트 안에서 호출되어야 정상적으로 동작
- useElements() : CardElement와 같은 Stripe의 UI 컴포넌트를 관리하는 객체를 반환
- amount : Redux 스토어에서 총 결제 금액을 가져옵니다.
- Stripe에서는 금액을 센트 단위로 요구하므로, 100을 곱해 전달
- currentUser : 현재 로그인한 사용자 정보를 가져옵니다.
- 결제 정보에 사용자의 이름을 포함

- 결제 처리 상태 관리
- const [isProcessingPayment, setIsProcessingPayment] = useState(false);
- 결제 진행 중 상태를 관리
- 결제 버튼의 로딩 상태와 사용자 피드백에 활용

- 결제 처리 핸들러 (paymentHandler)
- 이 함수는 결제 과정을 처리하는 핵심 로직
- Stripe와 Elements 객체가 제대로 로드되지 않았을 경우 결제를 중단

- 결제 Intent 생성 요청
- 서버로 결제 Intent를 생성하는 요청을 보냅니다.
- /create-payment-intent는 서버리스 함수(예: Netlify Functions)로 구현되어 있습니다.
- 요청 본문에 결제 금액(amount * 100) 을 포함

- 클라이언트 Secret 추출
- const { paymentIntent: { client_secret } } = response;
- 서버로부터 응답받은 client_secret은 결제 Intent와 연결된 Stripe 고유 식별자
- 이 값은 결제를 인증하는 데 사용

- 결제 인증 요청 (const paymentResult)
- Stripe의 confirmCardPayment 메서드를 호출하여 실제 결제를 처리
- card: CardElement로부터 카드 정보를 가져옵니다.
- billing_details: 사용자의 이름을 포함

- 결제 결과 처리
- 성공: paymentIntent.status가 succeeded이면 결제 성공으로 처리
- 실패: paymentResult.error가 존재하면 실패 이유를 사용자에게 알립니다.

- 전체 흐름
- 사용자가 결제 정보를 입력하고 "Pay now" 버튼을 클릭합니다.
- paymentHandler가 호출
- 서버로 결제 Intent 생성 요청 → 클라이언트 Secret 반환
- Stripe로 결제 인증 요청 → 결제 결과 반환
- 결제 성공 또는 실패에 따라 사용자에게 결과를 알립니다.

- 서버리스 함수의 역할
- Endpoint: /.netlify/functions/create-payment-intent
- Stripe의 서버 API를 호출해 결제 Intent를 생성
- 클라이언트 Secret을 반환
```
const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);


    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true);

        const reponse = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }).then(res => res.json());

        const {paymentIntent: { client_secret }} = reponse;

        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: currentUser ? currentUser.displayName : 'Guest',
            },
          },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
          alert(paymentResult.error);
        } else {
          if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful');
          }
        }
    }   

    return (
      <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment: </h2>
          <CardElement />
          <PaymentButton 
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPES_CLASSES.inverted}
          > Pay now </PaymentButton>
        </FormContainer>
      </PaymentFormContainer>
    );
}

export default PaymentForm;
```