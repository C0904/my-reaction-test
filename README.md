# 반응 속도 테스트 서비스

이 프로젝트는 사용자의 반응 속도를 측정하고, 전체 사용자 중 최고 기록을 실시간으로 공유하는 웹 애플리케이션입니다.
https://speedyreact.com

## 주요 기능

1. 반응 속도 측정: 화면이 초록색으로 변할 때 클릭하여 반응 속도를 측정합니다.
2. 연령대별 비교: 측정된 반응 속도를 연령대별로 비교합니다.
3. 전체 최고 기록: WebSocket을 통해 모든 사용자의 최고 기록을 실시간으로 공유합니다.
4. 재미있는 요소: 너무 빨리 클릭할 경우 20% 확률로 다른 웹사이트로 리다이렉트됩니다. (현재 비활성화)

## 기술 스택

### 프론트엔드
- React
- TypeScript
- shadcn-ui@0.8.0
- Framer Motion (애니메이션)
- Socket.IO Client (실시간 통신)

### 백엔드
- NestJS
- TypeScript
- Socket.IO (WebSocket 구현)
- https://github.com/C0904/my-reaction-test-server

## 설치 및 실행 방법

### 프론트엔드

1. 프로젝트 클론:
   ```
   git clone https://github.com/C0904/my-reaction-test
   cd my-reaction-test
   ```

2. 의존성 설치:
   ```
   npm install
   ```

3. 개발 서버 실행:
   ```
   npm run dev
   ```

### 백엔드
- https://github.com/C0904/my-reaction-test-server

1. 의존성 설치:
   ```
   npm install
   ```

2. 개발 서버 실행:
   ```
   npm run start:dev
   ```

## 환경 설정

1. 프론트엔드의 `.env` 파일에서 백엔드 서버 URL 설정:
   ```
   ex> NEXT_PUBLIC_SERVER_DOMAIN=http://localhost:3001
   ```

## 기여 방법

1. 이 저장소를 포크합니다.
2. 새 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
