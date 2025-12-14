# Firebase 배포 가이드

PDF Cooker를 Firebase Hosting에 배포하는 방법입니다.

## 🚀 빠른 배포

```bash
npm run deploy
```

이 명령어는 자동으로:
1. 프로젝트 빌드 (`npm run build`)
2. Firebase Hosting에 배포 (`firebase deploy --only hosting`)

## 📋 초기 설정 (최초 1회만)

### 1. Firebase CLI 로그인

```bash
firebase login
```

브라우저가 열리면 Google 계정으로 로그인하세요.

### 2. 프로젝트 확인

`.firebaserc` 파일에 프로젝트 ID가 올바르게 설정되어 있는지 확인:

```json
{
  "projects": {
    "default": "pdf-cooker"
  }
}
```

### 3. 환경 변수 확인

`.env` 파일에 Firebase 설정이 올바른지 확인:

```env
VITE_FIREBASE_API_KEY=AIzaSyDynEmDr0EjC5pE18WloEgV8I1kcv_DS6Q
VITE_FIREBASE_AUTH_DOMAIN=pdf-cooker.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pdf-cooker
VITE_FIREBASE_STORAGE_BUCKET=pdf-cooker.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=624141976900
VITE_FIREBASE_APP_ID=1:624141976900:web:4e5ae95beccab386cd8311
VITE_FIREBASE_MEASUREMENT_ID=G-7VWWK0HP74
```

## 🔧 수동 배포 단계

원하는 경우 단계별로 수동 배포할 수 있습니다:

### 1. 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 2. 로컬 미리보기 (선택사항)

```bash
npm run preview
```

또는 Firebase 호스팅 에뮬레이터 사용:

```bash
firebase serve
```

### 3. 배포

```bash
firebase deploy --only hosting
```

## 📊 배포 후 확인사항

### 1. 배포 URL 확인

배포가 완료되면 다음과 같은 URL이 표시됩니다:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/pdf-cooker/overview
Hosting URL: https://pdf-cooker.web.app
```

### 2. 웹사이트 접속

- **기본 URL**: `https://pdf-cooker.web.app`
- **커스텀 도메인**: `https://pdf-cooker.firebaseapp.com`

### 3. Google Analytics 확인

1. [Google Analytics](https://analytics.google.com/) 접속
2. "실시간" 보고서에서 방문자 확인
3. 이벤트가 제대로 추적되는지 확인

### 4. SEO 확인

- `https://pdf-cooker.web.app/robots.txt` 접속 확인
- `https://pdf-cooker.web.app/sitemap.xml` 접속 확인
- 페이지 소스에서 메타 태그 확인

## 🌐 커스텀 도메인 연결 (선택사항)

### 1. Firebase Console에서 도메인 추가

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택 (pdf-cooker)
3. **Hosting** > **도메인 추가** 클릭
4. 도메인 입력 (예: `pdfcooker.com`)

### 2. DNS 설정

Firebase에서 제공하는 DNS 레코드를 도메인 제공업체에 추가:

```
Type: A
Name: @
Value: [Firebase에서 제공하는 IP]

Type: TXT
Name: @
Value: [Firebase에서 제공하는 인증 코드]
```

### 3. SSL 인증서 자동 발급

Firebase가 자동으로 Let's Encrypt SSL 인증서를 발급합니다 (최대 24시간 소요).

### 4. 코드 업데이트

커스텀 도메인 설정 후 다음 파일들의 URL을 업데이트:

- `index.html`: canonical URL, OG tags
- `public/robots.txt`: Sitemap URL
- `public/sitemap.xml`: 사이트 URL

## 🔄 배포 히스토리 및 롤백

### 배포 히스토리 확인

```bash
firebase hosting:channel:list
```

### 이전 버전으로 롤백

Firebase Console에서:
1. **Hosting** > **릴리스** 탭
2. 이전 버전 선택
3. **롤백** 클릭

## 🎯 배포 최적화

### 1. 빌드 크기 확인

```bash
npm run build
```

빌드 후 `dist/` 폴더 크기 확인. 일반적으로 1-2MB 이하가 적당합니다.

### 2. 캐시 설정

`firebase.json`에 캐시 헤더가 설정되어 있습니다:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### 3. 성능 측정

- [PageSpeed Insights](https://pagespeed.web.dev/)에서 성능 점수 확인
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) 실행

## ⚠️ 주의사항

### 환경 변수

- `.env` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함)
- 팀원과 공유할 때는 `.env.example` 파일을 참고하세요
- 프로덕션 환경에서는 Firebase Console에서 환경 변수 관리 가능

### 빌드 전 체크리스트

- [ ] 모든 테스트 통과
- [ ] 로컬에서 `npm run preview`로 확인
- [ ] `.env` 파일에 올바른 Firebase 설정
- [ ] `index.html`의 도메인 URL 확인
- [ ] Google Analytics 측정 ID 확인

## 🐛 문제 해결

### "Firebase CLI not found" 오류

```bash
npm install -g firebase-tools
```

### "Permission denied" 오류

```bash
firebase login --reauth
```

### 빌드 실패

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
npm run build
```

### 배포 후 변경사항이 반영되지 않음

브라우저 캐시 문제일 수 있습니다:
- 하드 새로고침: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
- 시크릿 모드에서 확인

## 📚 참고 자료

- [Firebase Hosting 문서](https://firebase.google.com/docs/hosting)
- [Vite 빌드 가이드](https://vitejs.dev/guide/build.html)
- [Firebase CLI 참조](https://firebase.google.com/docs/cli)

---

## 🎉 배포 완료!

배포가 성공적으로 완료되면:

1. ✅ `https://pdf-cooker.web.app` 접속 가능
2. ✅ Google Analytics 데이터 수집 시작
3. ✅ SEO 최적화 적용됨
4. ✅ SSL 인증서 자동 적용

이제 사용자들이 안전하게 PDF Cooker를 사용할 수 있습니다! 🚀
