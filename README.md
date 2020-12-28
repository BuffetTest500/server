# 워런버핏테스트500

## Table Contents
- Introduction
- Features
- Tech Stack
- Installation
- Deploy
- Project Process
- Version Control
- Things to do
___
## Introduction
![시뮬레이터 gif](https://user-images.githubusercontent.com/62005112/103144242-50f05d00-4769-11eb-82ab-ed263528af98.gif)
### 보유 주식을 등록하면 성향에 맞추어 다른 사람의 포트폴리오와 투자할 만한 회사를 추천해주고 시각화해주는 주식 포트폴리오 웹서비스입니다.
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
## Deploy
- Client : Netlify
- Server : AWS Elastic Beanstalk & AWS Code Pipeline for Deployment automation
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
