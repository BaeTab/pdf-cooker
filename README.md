# PDF Cooker 🔥

**무료 온라인 PDF 편집 도구** - 브라우저에서 안전하게 PDF를 편집하세요!

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.7-646cff.svg)](https://vitejs.dev/)

## 🌟 주요 특징

- ✅ **100% 안전**: 모든 처리는 브라우저 내에서만 수행 (서버 업로드 없음)
- 🚀 **빠른 처리**: 서버 없이 즉시 처리
- 💯 **완전 무료**: 회원가입 불필요, 사용 제한 없음
- 🎨 **직관적인 UI**: 드래그 앤 드롭으로 간편한 파일 업로드
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원

## 🛠️ 핵심 기능

### 1. PDF 합치기 (Merge)
여러 PDF 파일을 하나의 문서로 병합합니다.
- 드래그 앤 드롭으로 여러 파일 업로드
- 파일 순서 변경 가능
- 즉시 다운로드

### 2. PDF 나누기 (Split)
PDF를 페이지별로 분할합니다.
- 모든 페이지를 개별 파일로 분리
- 특정 페이지만 추출 (예: 1,3-5,7)
- 페이지 정보 미리보기

### 3. PDF를 이미지로 변환 (Convert)
PDF 페이지를 JPG 또는 PNG 이미지로 변환합니다.
- JPG/PNG 포맷 선택
- 품질 조절 (1x ~ 3x)
- ZIP 파일로 일괄 다운로드

## 🚀 빠른 시작

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/pdf_cooker.git
cd pdf_cooker

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📦 기술 스택

### Core
- **React 19** - UI 라이브러리
- **Vite 7** - 빌드 도구

### Styling
- **Tailwind CSS 3** - 유틸리티 CSS 프레임워크

### PDF Processing
- **pdf-lib** - PDF 병합, 분할 등 문서 구조 조작
- **pdfjs-dist** - PDF 렌더링 및 이미지 변환

### Utilities
- **file-saver** - 파일 다운로드
- **jszip** - 이미지 압축
- **react-dropzone** - 드래그 앤 드롭 UI
- **lucide-react** - 아이콘

## 📁 프로젝트 구조

```
pdf_cooker/
├── public/
│   ├── robots.txt              # SEO: 검색 엔진 크롤러 설정
│   ├── sitemap.xml             # SEO: 사이트맵
│   └── og-image.jpg            # SEO: Open Graph 이미지
├── src/
│   ├── components/
│   │   ├── FileUploader.jsx   # 공통 파일 업로드 컴포넌트
│   │   ├── MergeFeature.jsx   # PDF 합치기 기능
│   │   ├── SplitFeature.jsx   # PDF 나누기 기능
│   │   └── ConvertFeature.jsx # PDF → 이미지 변환 기능
│   ├── utils/
│   │   ├── pdfHandler.js      # PDF 처리 핵심 로직
│   │   └── cn.js              # 클래스명 유틸리티
│   ├── App.jsx                # 메인 앱 컴포넌트
│   ├── main.jsx               # 앱 진입점
│   └── index.css              # Tailwind CSS 설정
├── index.html                 # HTML 템플릿 (SEO 메타 태그 포함)
├── tailwind.config.js         # Tailwind 설정
└── package.json
```

## 🔐 보안 및 프라이버시

PDF Cooker는 사용자의 개인정보 보호를 최우선으로 생각합니다.

- ✅ **클라이언트 사이드 처리**: 모든 PDF 처리는 JavaScript를 사용하여 브라우저 내에서만 실행
- ✅ **메모리 내 처리**: 업로드된 파일은 브라우저 메모리(RAM)에만 로드
- ✅ **네트워크 전송 없음**: 파일 관련 HTTP 요청이 전혀 없음
- ✅ **오픈소스 라이브러리**: pdf-lib와 PDF.js 같은 검증된 라이브러리 사용

## 📝 사용 방법

### PDF 합치기
1. "PDF 합치기" 탭 선택
2. 여러 PDF 파일을 드래그 앤 드롭
3. 원하는 순서로 파일 정렬 (위/아래 버튼)
4. "PDF 합치기" 버튼 클릭
5. 병합된 PDF 다운로드

### PDF 나누기
1. "PDF 나누기" 탭 선택
2. PDF 파일 업로드
3. 분할 방식 선택:
   - 모든 페이지를 낱개로 분리
   - 특정 페이지만 추출 (예: 1,3-5)
4. "PDF 나누기" 버튼 클릭
5. 분할된 PDF 다운로드

### PDF를 이미지로
1. "PDF를 이미지로" 탭 선택
2. PDF 파일 업로드
3. 이미지 포맷 선택 (JPG/PNG)
4. 품질 조절 (1x ~ 3x)
5. "이미지로 변환" 버튼 클릭
6. images.zip 파일 다운로드

## 🌐 SEO 최적화

PDF Cooker는 검색 엔진 최적화를 위해 다음을 구현했습니다:

- ✅ **메타 태그**: 상세한 title, description, keywords
- ✅ **Open Graph**: Facebook, LinkedIn 등 소셜 미디어 공유 최적화
- ✅ **Twitter Cards**: Twitter 공유 최적화
- ✅ **JSON-LD**: 구조화된 데이터 (Schema.org)
- ✅ **Sitemap.xml**: 검색 엔진 크롤링 가이드
- ✅ **Robots.txt**: 크롤러 접근 제어
- ✅ **시맨틱 HTML**: header, main, footer, article 등 사용
- ✅ **한국어 최적화**: lang="ko", 한국어 키워드

## 🎯 활용 사례

### 📚 교육
- 여러 강의 자료를 하나의 PDF로 병합
- 교재의 특정 챕터만 추출
- 시험 문제를 이미지로 변환

### 💼 비즈니스
- 여러 부서의 보고서를 하나로 병합
- 계약서에서 필요한 조항만 추출
- 제안서를 이미지로 변환하여 포트폴리오에 게시

### 🏛️ 법률/행정
- 여러 증빙 서류를 하나의 PDF로 병합
- 판례집에서 관련 판례만 추출
- 법률 문서를 이미지로 변환

## 🐛 알려진 이슈

- 대용량 PDF 파일(100MB 이상) 처리 시 브라우저 메모리 제한으로 느려질 수 있습니다
- PDF.js Worker는 CDN을 사용하므로 오프라인 환경에서는 작동하지 않을 수 있습니다
- 암호화된 PDF는 현재 지원하지 않습니다

## 🤝 기여하기

기여를 환영합니다! Pull Request를 보내주세요.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📧 문의

프로젝트 링크: [https://github.com/yourusername/pdf_cooker](https://github.com/yourusername/pdf_cooker)

---

**💡 Tip**: 이 애플리케이션은 완전히 클라이언트 사이드에서 작동하므로, 인터넷 연결 없이도 사용할 수 있습니다 (최초 로드 후).

Made with ❤️ for secure PDF editing
