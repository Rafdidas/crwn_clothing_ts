# CRWN CLOTHING
#### 쇼핑몰 사이트 작업 중

## 1. 소개 및 참여 인원
- 쇼핑몰을 구성하고, 로그인, 장바구니 추가, 구매기능 구현 예정
- 개인 프로젝트

## 2. 사용 기술
#### `API`
  - PokeApi
  - https://pokeapi.co/docs/v2#pokemon-species
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
- context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있다.
- context는 React 컴포넌트 트리 안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법입니다.
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
