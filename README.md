## 프로젝트 개요

최근 관심을 가지게 된 클린 아키텍처를 적용하며 구현하는 것을 목표로 개발했습니다.
cursor를 이용하였고 ai가 생성한 코드는 전부 리뷰 후 수정/보완했습니다.


## 실행 방법 및 환경 설정

node : v22.22.0

```
npm install
npm run dev
```

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/f7648bb6-668b-46fd-82ab-18b6bba282a1" />
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/03378d68-6b0e-4263-a712-a2d5acb2d7ca" />
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/593800ff-971f-4a0b-be91-d85bc517f2cf" />
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/161c630d-5083-4525-93e7-32bf9ac1b23a" />

## 폴더 구조 및 주요 코드 설명

### 폴더 구조

components : 리엑트 컴포넌트
constants : 상수
domain : FE 도메인 모델
infra
- http
- storage
  - localstorage
- application
  - policies : 어플리케이션 정책
  - ports : 어플리케이션 외부 포트
  - usecases : 유즈케이스
- interfaces
  - controller : FE 값 정제
  - presenter : FE 도메인 모델 => 표현값 매핑
  - react-query
  - stores : zustand
- api
  - kakao/books : 카카오 book api 프록시

### 구현

1. 도메인

도서 기본 정보
- 제목
- 저자명
- 출판사

도서 가격
- 할인가

2. 어플리케이션

- 도서 검색 (or)
  - 제목
  - 저자명
  - 출판사
- 도서 목록 조회
- 도서 상세 조회
  - 구매하기 페이지로 이동

- 도서 찜하기
- 찜한 도서 목록 조회

3. UI

3.1 컴포넌트

검색
- 기본 검색 서치바
  - 입력
    - 유저 입력 검증
    - 검색 디바운싱 : 2초
  - 검색 기록
    - 검색 기록 삭제 가능
- 상세 검색 팝업

목록
- 도서 리스트
- 도서 아이템
- 페이지네이션 

찜하기 목록
- 도서 리스트
- 도서 아이템
- 페이지네이션

3.2 페이지

도서 목록
찜한 도서

4. api

GET books

5. react-query

도서 검색 목록
- 최대 8개 저장 
- 초과 시 오래된 것 삭제 (lru cache)
  - 캐싱값 검색바에서 삭제 가능

찜한 도서 목록

## 라이브러리 선택 이유

shadcn : css를 디자인되어 가볍고 server component로 마이그레이션 시 용이합니다.
react query : 서버 상태를 관리하기 용이합니다.
zustand : prop drilling을 피할 수 있고, selector를 이용해 불필요한 리렌더링을 방지할 수 있습니다.

## 강조하고 싶은 기능

- 서치바 키보드 인터렉션 지원
- 상세보기 열기/닫기 시 화면 떨림 없음

## 개선해야 될 부분

좋아요 기능을 고려하지 않고 검색 기능을 개발해, 검색 페이지의 검색바, 페이지네이션이 검색 기능에 강하게 결합되었고, 좋아요 페이지에서 재사용이 어려운 형태로 개발됐습니다. presentational component를 별도로 분리하지 않은 것이 원인입니다.

분리된 비즈니스에서 관리하는 데이터와 UI 상태 값이 분리됨에 따라 복잡도가 증가했습니다.
경계가 모호한 부분을 잘 정의하고 어디에서 에러를 처리할 것인지, UI 상태를 어떻게 연결할 것인지에 대한 정의가 필요한 것 같습니다.
