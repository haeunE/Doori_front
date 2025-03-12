# Doori_front

## 📌 프로젝트 소개
Doori_front는 독립영화 예매 서비스를 제공하는 Doori 프로젝트의 프런트엔드 레포지토리입니다. 
사용자는 독립영화를 검색하고 예매할 수 있으며, 영화에 대한 평점 및 리뷰를 남길 수 있으며 볼 수 있습니다. 

## 📅 개발 기간
- **개발 시작**: 2024.11.13
- **개발 종료**: 2024.11.25

## 🛠 기술 스택
- **프레임워크**: React
- **상태 관리**: Redux Toolkit
- **스타일링**: Bootstrap
- **빌드 툴**: Vite
- **API 연동**: Axios

## 📂 주요 파일
- `App.js` : 루트 컴포넌트
- `main.js` : 애플리케이션 진입점
- `store/` : Redux 상태 관리 관련 코드
- `pages/` : 주요 페이지 컴포넌트
- `components/` : 재사용 가능한 UI 컴포넌트
- `vite.config.js` : Vite 설정 파일

## 🚀 실행 방법
1. **레포지토리 클론**
```sh
git clone https://github.com/haeunE/Doori_front.git
cd Doori_front
```
2. **패키지 설치**
```sh
yarn install  # 또는 npm install
```
3. **환경 변수 설정**
`.env.local` 파일을 생성하고 필요한 API 키 및 설정을 추가합니다.

4. **개발 서버 실행**
```sh
yarn dev  # 또는 npm run dev
```

## 📌 주요 기능
- 로그인 및 회원가입
- 독립영화관 예매 기능
- 영화 평점 및 리뷰 작성
