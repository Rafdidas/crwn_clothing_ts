# CRWN CLOTHING
#### TypeScript로 변경 중

## 1. 소개 및 참여 인원
- 개인 프로젝트

## 2. 사용 기술
#### `Front-end`
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## 3. TypeScript로 변경 

## reducer.utils.ts

```
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
};
```
### 1. Matchable 타입
- Matchable은 actionCreator 함수에 추가적인 속성과 메서드를 부여하는 타입
- type: 해당 actionCreator가 반환하는 action 객체의 type 속성을 가리킵니다.
- match(action: AnyAction): 전달된 action 객체의 type이 해당 actionCreator의 type과 동일한지 확인하는 타입 가드 함수

```
export function withMatcher<AC extends () => 
    AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => 
    AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function ) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}
```
### 2. withMatcher 함수
- 기존의 actionCreator 함수에 type과 match 메서드를 추가
- 이를 통해 action 객체를 생성하는 동시에 해당 action의 type을 쉽게 비교

```
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
};
```
### 3. ActionWithPayload 및 Action 타입
- ActionWithPayload: type과 payload를 가진 action 객체의 타입
- Action: payload 없이 type만 있는 간단한 action 객체의 타입

```
export function createAction<T extends string, P>(
    type: T, 
    payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
    type: T, 
    payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
};
```
### 4. createAction 함수
- createAction의 역할:
- Redux의 action 객체를 생성
- 두 가지 오버로드 시그니처를 제공
- payload가 있는 경우: ActionWithPayload 타입을 반환
- payload가 없는 경우: Action 타입을 반환
- 실제 구현: 오버로드로 정의된 모든 경우를 처리하는 하나의 실제 함수 정의가 필요
- 위의 오버로드 시그니처를 실제 코드로 구현한 것이 세 번째 createAction 함수

## category.action.ts
```
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;
```
### 1. FetchCategoriesStart, FetchCategoriesSuccess, FetchCategoriesFailed 타입
- edux 액션 객체의 타입을 정의
- 각 타입은 액션의 **type**과 payload 구조를 명확히 지정

```
export const fetchCategoriesStart = withMatcher((
): FetchCategoriesStart => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((
  categories: Category[]
): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, 
    categories
  ));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));
```
### 2. fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed 액션 생성자
- withMatcher를 사용하는 이유:
- Redux 액션 생성자를 확장하여 type 속성과 match 메서드를 추가
- 이를 통해 생성된 액션의 타입을 타입 가드로 확인하거나, type 값을 쉽게 사용할 수 있습니다.
- createAction의 역할:
- type과 payload를 포함하는 액션 객체를 생성

#### fetchCategoriesStart
- 카테고리 데이터를 가져오기 시작할 때 호출되는 액션 생성자
- type만 포함된 액션 객체를 반환

#### fetchCategoriesSuccess
- 카테고리 데이터를 성공적으로 가져온 후 호출
- categories라는 데이터를 payload로 포함하는 액션 객체를 반환

#### fetchCategoriesFailed
- 데이터를 가져오는 데 실패했을 때 호출
- 실패 이유(Error 객체)를 payload로 포함하는 액션 객체를 반환

## categoty.selector.ts
- rootReducer 완성 후
```
```

## Cart.reducer.ts, Cart.type.ts, Cart.action.ts
- 생략
```
```

## firebase.utils.ts
- 생략
```
```

## User.reducer.ts, User.type.ts, User.action.ts
- 생략
```
```

## button.component.tsx
- Button은 React.FC 타입을 사용하여 선언
- FC는 "Function Component"의 약자로, TypeScript에서 React 컴포넌트를 작성할 때 사용
  
```
const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => 
    ({
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInbutton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType] as typeof BaseButton);

export type ButtonProps = {
    buttonType?: BUTTON_TYPES_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
}

export default Button;
```
## form-input.component.tsx
- InputHTMLAttributes<HTMLInputElement>를 상속받아 HTML <input>의 모든 속성을 지원
- FormInputProps는 label 속성과 HTML <input> 요소에서 사용할 수 있는 속성들을 조합하여 정의된 타입
- InputHTMLAttributes<HTMLInputElement>: HTML <input> 요소에서 사용할 수 있는 속성들을 포함합니다. 예를 들어, type, value, onChange 등을 사용
- FC<FormInputProps>: FormInput 컴포넌트가 FormInputProps 타입의 props를 받는다는 것을 명시
  
```
type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
    return (
      <Group>
        <Input {...otherProps} />
        {label && (
          <FormInputLabel
            shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' &&  otherProps.value.length)}>
            {label}
          </FormInputLabel>
        )}
      </Group>
    );
}

export default FormInput;
```

## custom.d.ts
```
declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
```

## cart-dropdown.coponent.tsx
- useCallback 함수 사용
```
const goToCheckoutHandler = useCallback(() => {
  navigate('/checkout');
}, []);
```
- navigate 함수는 React Router에서 페이지 이동을 처리하는 함수
- goToCheckoutHandler는 의존성 배열이 빈 배열([])이므로, 컴포넌트가 렌더링될 때 한 번만 생성
- useCallback을 사용하지 않으면, goToCheckoutHandler가 컴포넌트가 리렌더링될 때마다 새롭게 생성되어 버튼(Button) 컴포넌트가 불필요하게 리렌더링될 가능성이 있습니다.

## useCallback이 필요한 이유
- React 컴포넌트가 렌더링될 때마다 컴포넌트 내부에서 정의한 모든 함수가 새로 생성됩니다. 이는 불필요한 리렌더링을 유발하거나 성능 문제를 초래할 수 있습니다.
- 예를 들어, 하위 컴포넌트가 props로 함수를 받을 때 이 함수가 새로 생성되면 하위 컴포넌트는 이 props가 변경된 것으로 간주하여 다시 렌더링됩니다. useCallback은 이를 방지하여 동일한 함수 참조를 유지

## useCallback을 사용할 때와 사용하지 않을 때
- 사용하지 않을 때: 함수가 새로 생성되어 하위 컴포넌트가 불필요하게 렌더링될 가능성이 있음.
- 사용할 때: 함수가 메모이제이션되어 불필요한 렌더링을 방지. 특히, props로 함수를 전달하거나 비싼 연산이 포함된 콜백을 사용할 경우 성능 최적화에 효과적.

- useCallback은 성능 최적화를 위해 함수 참조를 고정하고, React 앱의 렌더링 효율성을 높이는 데 유용합니다. 하지만 항상 사용하는 것이 아니라, 하위 컴포넌트에 props로 함수가 전달되는 경우나 복잡한 연산이 포함된 경우에만 사용하는 것이 좋습니다.