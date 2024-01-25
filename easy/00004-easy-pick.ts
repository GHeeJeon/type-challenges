/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #쉬움 #union #built-in

  ### 질문

  `T`에서 `K` 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

  예시:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > GitHub에서 보기: https://tsch.js.org/4/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ 풀이 _____________ */
/*
  TypeScript에서 제공하는 Pick<T, K>를 사용하지 않고,
  비슷한 기능을 하는 MyPick<T, K> 만들기

  그렇다면 Pick<T, K> 란?
  객체 T에서 일부 프로퍼티를 선택할 때 사용

  예시)
  // 전체 Todo 인터페이스
  
  interface Todo {
  title: string
  description: string
  completed: boolean
  // 많은 다른 프로퍼티들...
  }

  // TodoPreview는 Todo 인터페이스에서 일부 프로퍼티만 선택하여 만든 새로운 타입
  type TodoPreview = Pick<Todo, 'title' | 'completed'>;

  // TodoPreview를 사용하는 예제
  const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
  };
  예시 끝)

  테스트 케이스에 따르면,
  MyPick<Todo, 'title'> 은 다음과 같아야 한다.
  
  interface Expected1 {
  title: string
  }

  그 제네릭 타입을 어떻게 만들건데?
  우선, K 의 값은 T에 존재해야 한다, 즉 T 의 key 중 일부이다. (K extends keyof T)
  유니온 타입인 K 의 key 를 순환한다. ([key in K])
  그 key 의 타입은 T 에서 key 의 타입이다. (T[key])

  정답과 함께 보자!
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>> 일 때,
  
  type MyPick<T, K extends keyof T> = {  // T 의 key 중 일부인 title 이다.
  [key in K]: T[key]                     // title: 어떤타입이냐면?
  }                                      // title: T[title] 이므로 title: string
  
*/

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/4/answer/ko
  > 정답 보기: https://tsch.js.org/4/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/
