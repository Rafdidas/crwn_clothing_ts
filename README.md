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

