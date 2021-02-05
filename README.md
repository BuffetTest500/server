# 워런버핏테스트500

## Table Contents
- Introduction
- Deploy
- Features
- Tech Stack
- Installation
- Project Process
- Version Control
- Things to do
___
## Introduction
![시뮬레이터 gif](https://user-images.githubusercontent.com/62005112/103144242-50f05d00-4769-11eb-82ab-ed263528af98.gif)
### 보유 주식을 등록하면 성향에 맞추어 다른 사람의 포트폴리오와 투자할 만한 회사를 추천해주고 시각화해주는 주식 포트폴리오 웹서비스입니다.
___
## Deploy
- 배포주소 https://www.warrenbuffetttest500.site/
- Client : Netlify
- Server : AWS Elastic Beanstalk & AWS Code Pipeline for Deployment automation
___
## Features
- 보유 주식을 등록 하면 실시간 가격과 비교해 수익, 수익률을 분석해주고 차트로 시각화해서 보여줍니다.
- 등록한 보유주식 기준 혹은 설정한 투자성향 기준으로 다른 사람의 포트폴리오를 추천해줍니다.
- 사이트에서 최근 많이 검색한 기준으로 검색어 순위를 보여줍니다.
- 검색기능을 통해 검색한 주식의 실시간 그래프와 상세정보를 볼 수 있습니다.
- 검색한 주식과 같은 분야, 산업, 시가총액을 기준으로 주식을 추천 받을 수 있습니다.
- 채팅방을 통해 관심 주식이 같은 유저끼리 대화를 할 수 있습니다.
___
## Tech Stack

### Frontend
- Javascript (ES2015+)
- React, for component-based-architecture
- Routing using react-router-dom
- State management using redux(toolkit)
- D3, for data-driven-manipulation of documents
- Sass, for clearer and easy-to-understand stylesheet
- ESLint
- Firebase Realtime Database

### Backend
- Node.js
- Using express, simple and flexible Node.js web application framework
- MySQL
- sequelize
- JSON Web Token
- Google Cloud
___
## Challenge
### 📊 S&P500 기업으로 한정

- 주식 정보에 직접 접근할 수 없어 외부 api에 의존해야 하는 상황에서 api마다 제공하는 정보가 각기 파편적이라는 문제에 부딪쳤습니다.
- 특히 어떤 상장사들이 있는지 한 번에 조회할 수 있는 api를 찾기가 힘들었습니다. 특정 기업을 조회한 이용자에게 비슷한 기업들을 추천하려면 상장사 전체 목록이 꼭 필요했습니다.
- 그래서 서비스를 제공하는 기업을 S&P500에 포함된 기업으로 한정하기로 결정하고 데이터베이스를 직접 구축했습니다.
- companyProfiles라는 테이블을 만들어 각 기업의 섹터, 산업, 시가총액 등을 저장했습니다.
- 실제 서비스라면 시가총액처럼 실시간으로 변화하는 정보는 데이터베이스에 담으면 안 되겠지만 api 요청을 내보내는 횟수를 줄이려 고육책을 썼습니다.

### 💾 MySQL

- 이전까지 mongoDB만 쓰다가 관계형 데이터베이스를 처음으로 다뤄서 애를 먹었습니다.
- NoSQL의 sub-schema에 익숙하고 자바스크립트를 이용하면서 nested array 또는 nested object를 중심으로 사고를 하는 탓에 모델을 짜는 데 시간이 많이 걸렸습니다. 테이블 단위로 생각을 하려니 '관계형' 데이터베이스를 사용하는데 관계가 끊기는 느낌이 들었습니다.
- 특히 user 모델이 이용자의 portfolio나 portfolioItems를 참조하도록 만들고 싶었으나 결국 portfolioItems 각각에 userUid를 foreign key로 달았습니다. 따라서 특정 이용자의 포트폴리오를 찾고자 한다면 portfolioItems를 모두 훑으며 where로 해당 이용자에게 소속한 행들만 뽑아내야 합니다.
- 그래도 ACID 속성 등 SQL의 강점을 엿볼 수 있었습니다. 회원탈퇴 기능을 추가한다면 cascade 기능을 유용하게 쓸 수 있을 것 같았습니다.
- Join 등 SQL 데이터베이스의 특징이 두드러지는 문법 자체는 공부했으나 어떤 상황에서 사용해야 하는지 아직 감을 잡지 못해 프로그램 안에서 실사용하지 못 한 점이 아쉽습니다.
- 추후에 쿼리를 최적화하는 작업도 시도해보고자 합니다.

### 🎨 D3

- 외부 프레임워크나 라이브러리를 쓸 때 종종 어려움을 겪습니다. 뒤에서 어떤 일이 벌어지는지 확실히 모르는 채 외부 라이브러리를 쓰기보다는 직접 코드를 쓰는 편을 선호합니다.
- D3는 특히나 리액트와 함께 쓰면서 초반에 애를 먹었습니다.
- 예를 들면 포트폴리오페이지에서 포트폴리오에 기업을 추가하거나 주식 정보를 수정하면 스테이트가 바뀌는 데 맞춰 원 그래프도 다시 그려져야 했는데 파이 크기는 변하지만 기존 텍스트와 새로운 텍스트가 겹쳐서 나타나는 문제가 발생했습니다. 실제 DOM에 기존 텍스트가 남아 있었기 때문입니다.
- 이 문제를 해결하기 위해 원 그래프를 그리기 직전에 svg에서 이전 정보를 모두 삭제하는 코드를 추가해야 했습니다.

### 🗃 Item-based Collaborative Filtering

- 추천 알고리즘은 대표적으로 content-based filtering과 collaborative filtering이 존재한다고 공부했습니다. 그리고 collaborative filtering은 다시 user-based collaborative filtering과 item-based collaborative filtering으로 나뉩니다.
- Content-based와 user-based는 구현을 했지만 item-based는 시간이 모자라고 복잡해서 알고리즘을 짜지 못 한 점이 아쉽습니다.
- Item-based collaborative filtering은 아마존이 도입했습니다. User-based가 이용자들을 각각 비교해 추천을 한다면 item-based는 item 각각, 워런버핏테스트500에 적용한다면 주식 각각을 비교해서 추천을 합니다. 방향이 User → item이 아니라 item → user로 반대인 셈입니다.

### 🥇 실시간 인기 주식

- 실시간 인기 주식 기능을 마지막에 넣고 보니 이전 인기 주식 목록과 비교해서 순위 등락을 표시해 주면 좋겠다는 생각이 들었습니다. 그러나 생각보다 작업이 클 것 같아서 실행하진 못했습니다.
- 우선 실시간 인기 주식을 이전 순위와 비교하려면 당연히 이전 정보를 들고 있어야 합니다. 현재는 1분 마다 클라이언트에서 요청을 보내 스테이트를 업데이트하고 있습니다.
- 그러나 순위를 비교하려고 하면 순위 정보를 순전히 클라이언트 쪽에서 스테이트로 관리하면 안 되겠다고 생각했습니다. 이용자가 최초로 접속했을 땐 이전 순위 정보가 없기 때문입니다.
- 또한 등락을 보여주지 않을 땐 그때그때 정보만 서버에서 클라이언트로 보내주기 때문에 이용자들 사이에 순위가 다르게 뜨는 것이 문제가 되지 않았는데 순위 등락을 보여주려니 이용자들 사이(특히 방금 접속한 이용자)에 등락이 다르게 나타나는 문제가 생길 것 같았습니다.
- 이런 문제를 해결하려면 데이터베이스에 trendingStocks와 같은 테이블을 새로 만들고 previous와 current 행을 계속해서 업데이트해야 한다고 생각했습니다.

___

## Installation

### Client
1. clone
```
git clone https://github.com/BuffetTest500/client.git
cd client
npm install
npm start
```
2. environment

**Root 디렉토리에 .env파일을 생성 후 .env.sample 파일 형식에 맞춰 환경변수 값을 입력합니다.**
- [rapidapi](https://rapidapi.com/alphavantage/api/alpha-vantage)
- [firebase](https://firebase.google.com/)

### Server
1. clone
```
git clone https://github.com/BuffetTest500/server.git
cd server
npm install
npm run dev
```
2. creating mockdata
```
//MySQL workbench
CREATE database buffettTest;
```
```
node .\utils\save.js
```
3. environment

**Root 디렉토리에 .env파일을 생성 후 .env.sample 파일 형식에 맞춰 환경변수 값을 입력합니다.**
- [MySQL](https://www.mysql.com/)
- [sequelize](https://sequelize.org/)
___
## Project Process
  ### 1주차
  - 프로젝트 아이디어 회의
  - 목업
  - 데이터 베이스 모델링
  - 기술 검토
  - 일정 분배
  - 깃 저장소 설정
  - mysqlDB연결, Es-lint, 리덕스툴킷 등 셋팅 및 목데이터 구축
  ### 2주차
  - firebase 와 jwt 토큰을 이용한 로그인 구현
  - 추천 알고리즘 구현
  - 주식 검색 기능 구현
  - d3 이용한 주식 차트 구현
  - firebase 실시간 데이터 베이스 이용한 채팅방 구현
  ### 3주차
  - 리팩토링 , 스타일링
  - AWS Elastic Beanstalk 벡엔드 배포
  - Netlify 프론트 배포
___


## Version Control
- git 사용
- 개발 시 별도의 브랜치 생성 후, 각 기능 구현 후 dev 브랜치에 병합
___

## Things to do
- unit test, component
- 데이터 양의 증가에 따른 성능 최적화
- 반응형 Web application 구현
