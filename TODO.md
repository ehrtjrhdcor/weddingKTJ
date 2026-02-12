# 📝 TODO List

## 🔴 필수 작업

### 1. 사진 준비
- [ ] 메인 이미지 (images/메인이미지.svg)
- [ ] 갤러리 사진 9장
  - [ ] images/4.jpg
  - [ ] images/10.jpg
  - [ ] images/11.jpg
  - [ ] images/45.jpg
  - [ ] images/22.jpg
  - [ ] images/24.jpg
  - [ ] images/32.jpg
  - [ ] images/26.jpg
  - [ ] images/17.jpg
- [ ] 썸네일 이미지 (images/썸네일.jpg)

### 2. Firebase 설정 (방명록 기능)
1. Firebase Console 접속: https://console.firebase.google.com
2. 새 프로젝트 생성
3. Firestore Database 활성화
   - 규칙: 테스트 모드로 시작 (나중에 보안 규칙 설정)
4. 웹 앱 등록
5. Firebase 설정 정보 복사
6. `index.html` Line 30-38 수정:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.firebasestorage.app",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
   };
   ```

### 3. Kakao Developers 설정 (공유하기 기능)
1. Kakao Developers 접속: https://developers.kakao.com
2. 애플리케이션 추가하기
3. 앱 설정 > 플랫폼 > Web 추가
   - 사이트 도메인: `https://ehrtjrhdcor.github.io`
4. JavaScript 키 복사
5. `script.js` Line 1305 수정:
   ```javascript
   Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');
   ```
6. 카카오톡 공유 이미지 URL 설정
   - `script.js` Line 1322: `imageUrl` 수정
   - `script.js` Line 1324-1325, 1332-1333: 청첩장 URL 수정
     ```javascript
     imageUrl: 'https://ehrtjrhdcor.github.io/weddingKTJ/images/썸네일.jpg',
     mobileWebUrl: 'https://ehrtjrhdcor.github.io/weddingKTJ/',
     ```

### 4. Naver Maps API 설정 (지도 기능)
1. Naver Cloud Platform 접속: https://www.ncloud.com
2. Console > Services > AI·NAVER API > AI·NAVER API
3. Application 등록
4. Maps > Web Dynamic Map 선택
5. 서비스 URL 등록: `https://ehrtjrhdcor.github.io`
6. Client ID 복사
7. `index.html` Line 20 수정:
   ```html
   <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"></script>
   ```

## 🟡 선택 작업

### 5. 부모님 이름 입력
- [ ] `index.html` Line 99: 신랑 부모님 이름
- [ ] `index.html` Line 100: 신부 부모님 이름

### 6. 계좌번호 입력
- [ ] `index.html` Line 277-293: 신랑측 계좌
- [ ] `index.html` Line 302-318: 신부측 계좌

### 7. 약도 이미지 (선택사항)
- [ ] images/map-guide.jpg

## ✅ 완료된 작업
- [x] 기본 템플릿 생성
- [x] 이름 입력 (김태진 & 강소현)
- [x] 결혼식 정보 입력 (3월 22일, 신도림 라마다 호텔)
- [x] 불필요한 기능 제거 (오프닝, 배경음악, 스냅)
- [x] GitHub Pages 배포

---

## 📌 참고사항

### GitHub Pages URL
https://ehrtjrhdcor.github.io/weddingKTJ/

### 배포 시간
- GitHub Pages는 push 후 1-5분 정도 소요됩니다
- Settings > Pages에서 배포 상태 확인 가능

### 로컬 테스트
```bash
# Live Server 등으로 로컬 테스트 가능
# Firebase, Kakao API는 실제 도메인에서만 작동할 수 있음
```
