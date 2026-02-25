# AI Implementation Task Instructions
## IT Embedded / B2B Landing Page — Claude Opus 4.6 Prompts
> **Date:** 2026-02-25 · **Total Tasks:** 10 · **Sequence:** Execute in order (dependencies exist)

---

## Task Dependency Graph

```
Task 1: Project Setup & Design System
  └──▶ Task 2: Header + Hero (S0, S1)
  └──▶ Task 3: Pain Point Section (S2)
  └──▶ Task 4: Core Features Tabs (S3)
  └──▶ Task 5: Zero-Meeting Process (S4)
  └──▶ Task 6: B2B Component Demo (S5)
  └──▶ Task 7: Conversion Form (S6) + Footer (S7)
           └──▶ Task 8: Serverless API + n8n Integration
           └──▶ Task 9: AI Chatbot Integration
                    └──▶ Task 10: Final Assembly, Polish & Deployment
```

> **Parallelizable:** Tasks 2–6 can be executed in parallel after Task 1.
> **Sequential:** Tasks 8–10 must follow in order.

---

## Task 1: Project Setup & Design System Foundation

### Prompt for AI

```
You are building a React landing page for a B2B productized web service targeting IT Embedded company CEOs. The project is already initialized with Vite at: /Users/yummy/Documents/VS Code/IT-Embedded-B2B/

OBJECTIVE: Convert this Vite vanilla project to React and establish the design system foundation.

STEP 1 — Install dependencies:
npm install react react-dom framer-motion lucide-react
npm install -D @vitejs/plugin-react

STEP 2 — Configure Vite for React:
Update vite.config.js to use @vitejs/plugin-react.

STEP 3 — Create the React entry point:
- Update index.html to have a <div id="root"></div>
- Create src/main.jsx as React entry
- Create src/App.jsx as root component

STEP 4 — Create the global design system in src/styles/globals.css:
Use these exact design tokens as CSS custom properties on :root:

  --bg-primary: #0A0A0F      (page background, dark)
  --bg-card: #12121A          (card backgrounds)
  --bg-card-hover: #1A1A25    (card hover)
  --text-primary: #F0F0F5     (headings)
  --text-secondary: #8888A0   (descriptions)
  --accent: #4F7CFF           (CTAs, links)
  --accent-hover: #6B93FF     (CTA hover)
  --success: #00D68F          (positive stats)
  --danger: #FF4D6A           (negative stats)
  --border: #1E1E2A           (dividers)
  --radius-sm: 8px            (buttons, inputs)
  --radius-md: 12px           (cards)
  --radius-lg: 20px           (panels)
  --font-heading: 'Inter', sans-serif
  --font-body: 'Inter', sans-serif
  --font-mono: 'JetBrains Mono', monospace

Include:
- CSS reset (box-sizing, margin, padding)
- Google Fonts import for Inter (400, 500, 600, 700) and JetBrains Mono (400)
- Base body styles: dark background, light text, smooth scrolling
- Responsive breakpoints: 1200px (desktop), 768px (tablet), below 768px (mobile)
- Max content width: 1140px with auto centering
- Utility classes: .container, .section-label, .section-headline, .section-subtext, .accent-btn, .ghost-btn

STEP 5 — Create project folder structure:
src/
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── PainPoints/
│   ├── Features/
│   ├── Process/
│   ├── ComponentDemo/
│   ├── ConversionForm/
│   ├── Footer/
│   └── common/           (shared UI components)
├── data/                  (JSON data for specs, products, chatbot knowledge)
├── hooks/                 (custom React hooks)
├── assets/
└── styles/

Create placeholder index.jsx files in each component folder that export a named component with a <section id="section-name"> wrapper.

STEP 6 — Set up App.jsx:
Import and render all section components vertically in order:
Header → Hero → PainPoints → Features → Process → ComponentDemo → ConversionForm → Footer

VERIFICATION: Run npm run dev. The page should load with a dark background, Inter font applied, and all section placeholders visible as labeled blocks. No console errors.
```

### Expected Output
- Working React + Vite setup
- Design system with all tokens
- 8 placeholder components rendering in correct order

### Files Created/Modified
- `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`
- `src/styles/globals.css`
- 8 component folders with `index.jsx`

---

## Task 2: Global Header + Hero Section (S0 + S1)

### Prompt for AI

```
You are building components for a dark-themed B2B landing page in React. The project is at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/ and already has the design system set up with CSS custom properties (see src/styles/globals.css).

Read the existing globals.css first to understand the available tokens.

OBJECTIVE: Build the Header and Hero section components.

━━━ COMPONENT 1: Header (src/components/Header/index.jsx + Header.module.css) ━━━

Layout: Full-width, fixed top, 64px height, z-index 1000.

Elements:
- Left: Logo text/monogram (can be a styled <span>)
- Center: Nav anchor links — "핵심 기능" (#features), "진행 방식" (#process), "데모" (#demo)
- Right: CTA button "무료 진단 요청 →" that scrolls to #contact form

Interactions:
- On scroll > 100px: add class that applies backdrop-filter: blur(12px) and background rgba(10,10,15,0.8)
- CTA button: subtle pulse animation every 8 seconds (CSS keyframe, box-shadow pulse using var(--accent))
- Mobile (< 768px): hamburger menu icon replaces nav links. CTA stays visible. Hamburger opens full-screen overlay with nav links.
- Use smooth scroll behavior for anchor links.

━━━ COMPONENT 2: Hero (src/components/Hero/index.jsx + Hero.module.css) ━━━

Layout: min-height: 100vh, centered content, dark background.

Background: Create an animated circuit-board grid pattern using a <canvas> element:
- Dark background (#0A0A0F)
- Draw subtle grid lines in rgba(79, 124, 255, 0.05)
- Place ~15 nodes at grid intersections
- Nodes pulse with a soft glow (var(--accent) at 20% opacity)
- Connect nearby nodes with faint lines
- Animation must pause when document is not visible (use document.hidden + visibilitychange event)
- Keep this lightweight — requestAnimationFrame, no heavy libraries.

Content (centered, max-width 720px):
1. Badge pill: "디자인 미팅 0회. 통화 0건. 결과물만 전달합니다."
   - Small, rounded pill with border, above headline
2. H1 headline: "귀사의 B2B 웹사이트를\n24시간 자동 영업 인프라로 전환합니다."
   - Large, bold, var(--text-primary)
3. Sub-headline: "MCU 스펙시트부터 RFQ 자동 접수까지.\n디자인 미팅 없이, 5일 안에 완성합니다."
   - var(--text-secondary), 1.2rem
4. Two buttons side-by-side:
   - Primary: "무료 사이트 진단 신청하기" → scrolls to #contact (use var(--accent) bg, white text)
   - Secondary: "시스템 데모 보기 →" → scrolls to #features (ghost button, border only)
5. Trust badges row: 5 items horizontally
   - "Lighthouse 98점" · "LCP 0.8초" · "리드 응답 3초" · "React + Vercel Edge"
   - Monochrome, small text, spaced evenly

Animation (use Framer Motion):
- Staggered entrance: badge (0ms) → H1 (200ms) → sub-headline (400ms) → buttons (600ms) → trust badges (800ms)
- Use fadeInUp pattern: opacity 0→1, y: 20→0

VERIFICATION: Page loads with dark circuit-board animation. Header sticks on scroll with blur effect. Hero content fades in sequentially. CTA scrolls to the correct section. Mobile hamburger works.
```

### Expected Output
- Sticky header with blur-on-scroll + hamburger mobile menu
- Full-viewport hero with canvas circuit animation + staggered content entrance

### Files Created/Modified
- `src/components/Header/index.jsx` + `Header.module.css`
- `src/components/Hero/index.jsx` + `Hero.module.css`

---

## Task 3: Pain Point Agitation Section (S2)

### Prompt for AI

```
You are building the "Pain Point Agitation" section for a dark-themed B2B React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

Read src/styles/globals.css for design tokens before starting.

OBJECTIVE: Build the Before vs After comparison section.

━━━ COMPONENT: PainPoints (src/components/PainPoints/index.jsx + PainPoints.module.css) ━━━

Section ID: id="pain-points"

Layout: Full-width section, content centered (max-width 1140px).

Section Header:
- Label: "현실 진단" (uppercase, var(--text-secondary), small, with thin line separator)
- Headline: "세계 수준의 임베디드 기술을 만들고 계십니다.\n그런데 웹사이트는 2018년에 멈춰 있습니다."
- Sub-copy: "해외 바이어가 귀사 제품을 검색했을 때 보는 것은\n최첨단 기술력이 아니라, 느리고 낡은 웹페이지입니다.\n그 3초 안에 바이어는 경쟁사로 이동합니다."

2-Column Layout (side by side on desktop, stacked on mobile):

LEFT COLUMN — "Before" (❌ YOUR SITE TODAY):
- Visual treatment: red-tinted border (var(--danger)), slightly desaturated
- Contains a placeholder screenshot area (a darkened rectangle with "기존 B2B 사이트" text, styled to look outdated)
- 5 stat rows with 🔴 indicator:
  • 로딩 속도: 평균 로딩 → "4.2초 🔴"
  • 문의 응답: RFQ 첫 응답 → "다음 영업일 🔴"
  • 데이터시트: 스펙 접근성 → "PDF 링크 깨짐 🔴"
  • 해외 바이어: 이탈률 → "78% 🔴"
  • 리드 관리: 추적 체계 → "없음 🔴"
- Caption below: "지금 귀사 웹사이트에서 일어나고 있는 일입니다."

RIGHT COLUMN — "After" (✅ WITH AUTOMATION):
- Visual treatment: accent/success-tinted border (var(--success)), vibrant
- Contains a placeholder screenshot area (bright, clean rectangle with "자동화 인프라" text)
- 5 matching stat rows with 🟢 indicator:
  • 로딩 속도: 평균 로딩 → "0.8초 🟢"
  • 문의 응답: RFQ 첫 응답 → "3초 (자동) 🟢"
  • 데이터시트: 스펙 접근성 → "1-클릭 즉시 열람 🟢"
  • 해외 바이어: 전환율 → "+340% 🟢"
  • 리드 관리: 추적 체계 → "CRM 자동 기록 🟢"
- Caption below: "자동화 인프라 적용 후 기대 수치입니다."

Animations (Framer Motion):
- Stats count-up animation when section enters viewport (use Intersection Observer)
- Numbers in the "After" column animate from 0 to their value
- "Before" side red stats pulse subtly (CSS animation)
- Columns fade in from left/right respectively

Responsive:
- Desktop (≥ 768px): 2 columns side by side with gap
- Mobile (< 768px): stack vertically, "Before" on top

VERIFICATION: Section is visible with dark background. Stats animate/count on scroll into view. Red stats pulse. Columns stack on mobile. All Korean text renders correctly.
```

### Expected Output
- Before/After comparison with animated count-up stats
- Red-tinted "Before" vs green-tinted "After" cards
- Responsive stacking on mobile

### Files Created/Modified
- `src/components/PainPoints/index.jsx` + `PainPoints.module.css`

---

## Task 4: Core Features — 3-Tab Section (S3)

### Prompt for AI

```
You are building the Core Features tabbed section for a dark-themed B2B React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

Read src/styles/globals.css for design tokens. This is the most complex section — it has 3 tabs with distinct content.

OBJECTIVE: Build the Core Features section with 3 interactive tabs.

━━━ COMPONENT: Features (src/components/Features/index.jsx + Features.module.css) ━━━

Section ID: id="features"

Section Header:
- Label: "핵심 시스템 스택"
- Headline: "이것은 '웹 디자인'이 아닙니다.\n귀사의 영업 운영체제입니다."
- Sub-copy: "보기 좋은 웹사이트는 만들지 않습니다.\n바이어가 들어오고, 문의가 자동으로 접수되고,\n대표님 폰에 3초 안에 알림이 오는 시스템을 구축합니다."

TAB BAR: 3 tabs, horizontal, underline-style active indicator
  Tab 1: "⚡ 속도 & 성능"
  Tab 2: "🔄 자동화 워크플로우"
  Tab 3: "🤖 AI 고객 응대"

Create each tab as a separate sub-component for clean code.

━━━ TAB 1: SpeedTab (src/components/Features/SpeedTab.jsx) ━━━

Tab headline: "바이어는 3초 안에 판단합니다.\n0.8초 안에 보여주십시오."

2-column layout:

LEFT — Speed Comparison (animated bar race):
  - Two horizontal bars:
    - "기존 사이트" bar: fills to ~84% width (representing 4.2s), red-tinted, label "4.2초 · 바이어 이탈"
    - "자동화 인프라" bar: fills to ~16% width (representing 0.8s), accent-colored, label "0.8초 · 바이어 체류 ✓"
  - Animation: bars fill from 0 width to target width over 1.5s with ease-out
  - Trigger on tab activation AND viewport entry (whichever is later)

RIGHT — Performance Dashboard:
  - Styled to look like a Lighthouse report card
  - Show these metrics with horizontal progress bars:
    - "종합 성능 점수" — 98/100 (circular score badge at top, large number)
    - "FCP 첫 화면 표시" — 0.6초 (bar ~60%)
    - "LCP 주요 콘텐츠 로딩" — 0.8초 (bar ~40%)
    - "CLS 레이아웃 안정성" — 0.02 (bar ~2%)
    - "TTI 인터랙션 가능" — 1.1초 (bar ~55%)
  - Bars fill sequentially with 150ms stagger

BOTTOM — Edge Network strip:
  - Text: "Vercel Edge CDN — 전 세계 어디서든 빠르게."
  - 3 nodes: "서울 12ms" · "도쿄 48ms" · "샌프란시스코 126ms"

BOTTOM — Tech Badge Row:
  - "⚛️ React 19 · ⚡ Vite 7 · ▲ Vercel Edge · 🖼️ 이미지 최적화 · 📦 코드 스플리팅"

━━━ TAB 2: AutomationTab (src/components/Features/AutomationTab.jsx) ━━━

Tab headline: "RFQ가 들어왔는데 다음 날 확인하셨습니까?\n그 바이어는 이미 경쟁사에 발주했습니다."

TOP — Animated Flow Diagram:
  - 4 nodes in a horizontal row, connected by animated lines:
    Node 1: 📝 "바이어 문의 접수"
    Node 2: ⚙️ "n8n 자동 라우팅"
    Node 3: 📱 "즉시 알림 전송"
    Node 4: 📊 "CRM 자동 기록"
  - Below center: 📧 "자동 회신 발송" node connected to Node 1 and Node 4
  - Each node is a card (var(--bg-card), border, icon + label)
  - Lines between nodes: animated traveling dots (small circles moving along the path via CSS animation)
  - Nodes illuminate sequentially left->right (400ms each) on viewport entry

BOTTOM — Live Demo Panel:
  - Bordered container with dashed border
  - Title: "직접 테스트해보세요."
  - Sub: "아래 폼에 입력하면, 실제와 동일한 카카오톡 알림이 어떻게 오는지 확인할 수 있습니다."
  - Mini form (3 fields): 이름, 회사명, 이메일
  - Submit button: "🔔 알림 테스트 발송"
  - On submit: show spinner for 1.5s → slide in a simulated phone notification from the right:
    A styled card that looks like a KakaoTalk notification:
    "📱 KakaoTalk
     [새 문의 접수]
     {submitted name} / {submitted company}
     '견적 요청 - MCU 보드...'
     방금 전"
  - Below notification: "실제 서비스에서는 이 알림이 대표님과 영업팀 전원에게 동시 전송됩니다."
  - Rate-limit: button grays out after first use with text "데모는 세션당 1회만 가능합니다."
  - This form does NOT make any API calls — it's purely frontend simulation.

━━━ TAB 3: AIChatbotTab (src/components/Features/AIChatbotTab.jsx) ━━━

Tab headline: "새벽 3시, 독일 바이어가 데이터시트를 요청합니다.\nAI가 즉시 응대합니다."

2-column layout:

LEFT — Feature List:
  4 items with ✅ icons:
  1. "기술 사양 자동 응답" — "동작 온도, 입력 전압, 통신 프로토콜 — 학습된 스펙 기반으로 즉시 답변합니다."
  2. "데이터시트 즉시 제공" — "'MCU-X200 데이터시트 보여줘' → PDF 링크 또는 인라인 스펙 테이블 자동 제공."
  3. "다국어 지원 (한/영)" — "바이어의 언어를 자동 감지하여 한국어 또는 영어로 응답합니다."
  4. "복잡한 문의 → 담당자 즉시 연결" — "커스텀 펌웨어, 대량 발주 등 AI가 판단할 수 없는 문의는 자동으로 담당자에게 전달."

RIGHT — Simulated Chatbot Widget:
  - Styled as an inline chat window (NOT floating)
  - Header: "🤖 AI 기술 상담"
  - Pre-loaded with this conversation (shown immediately):
    [User]: "MCU-X200의 동작 온도 범위가 어떻게 되나요?"
    [Bot]: "MCU-X200의 동작 온도 범위는 -40°C ~ +85°C (산업용 등급)입니다.
            주요 사양:
            • CPU: ARM Cortex-M7, 480MHz
            • RAM: 512KB SRAM
            • 통신: UART, SPI, I2C, Ethernet
            • 인증: CE, FCC, KC
            📎 데이터시트 다운로드 (PDF, 2.4MB)"
  - Input field at bottom: placeholder "질문을 입력하세요..."
  - This is a STATIC mockup for now — no actual AI integration (that comes in Task 9)

BELOW CHATBOT — Suggested Prompt Pills:
  4 clickable pills: "입력 전압 범위는?", "MOQ가 어떻게 되나요?", "데이터시트 보내줘", "커스텀 펌웨어 가능한가요?"
  - For now, clicking does nothing (placeholder for Task 9 integration)

Tab switching: use React useState. Content transitions with a fade/slide animation (Framer Motion AnimatePresence).

VERIFICATION: All 3 tabs switch correctly. Speed bars animate. Flow diagram nodes illuminate. Demo form shows simulated notification. Chatbot shows pre-loaded conversation. Everything is responsive.
```

### Expected Output
- 3-tab section with distinct interactive content per tab
- Speed bar race, flow diagram with traveling dots, chatbot mockup
- Simulated KakaoTalk notification on demo form submit

### Files Created/Modified
- `src/components/Features/index.jsx` + `Features.module.css`
- `src/components/Features/SpeedTab.jsx`
- `src/components/Features/AutomationTab.jsx`
- `src/components/Features/AIChatbotTab.jsx`

---

## Task 5: Zero-Meeting Process Section (S4)

### Prompt for AI

```
You are building the "Zero-Meeting Process" section for a dark-themed B2B React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

Read src/styles/globals.css for design tokens.

OBJECTIVE: Build a 3-step horizontal timeline showing the hassle-free process.

━━━ COMPONENT: Process (src/components/Process/index.jsx + Process.module.css) ━━━

Section ID: id="process"

Section Header:
- Label: "진행 방식"
- Headline: "미팅 없이 완성합니다.\n대표님은 자료만 보내주시면 됩니다."
- Sub-copy: "기존 웹사이트 URL, 제품 카탈로그 PDF, 로고 파일.\n이 세 가지만 보내주시면 5일 안에 완성된 시스템을 전달합니다.\n과정 중 전화 통화는 0건입니다."

TIMELINE — 3 steps displayed horizontally with connecting line:

Step 1:
  - Icon: 📤 (64px)
  - Title: "자료 전달"
  - Subtitle: "Submit Materials"
  - Description: "기존 사이트 URL, 제품 PDF,\n로고 파일을 카카오톡 또는\n이메일로 전달해 주세요.\n미팅은 없습니다."
  - Time badge: "Day 0"

Step 2:
  - Icon: ⚙️ (64px)
  - Title: "시스템 구축"
  - Subtitle: "System Build"
  - Description: "React + Vercel 기반 웹사이트,\nn8n 자동화 워크플로우,\nAI 챗봇을 구축합니다.\n중간 확인 1회. 비동기 피드백."
  - Time badge: "Day 1–4"

Step 3:
  - Icon: 🚀 (64px)
  - Title: "런칭 & 인수인계"
  - Subtitle: "Launch & Handover"
  - Description: "Vercel 배포, 도메인 연결,\nn8n 워크플로우 활성화,\nAI 챗봇 라이브.\n즉시 리드 수집 시작."
  - Time badge: "Day 5"

Step Cards:
- Glassmorphic style: rgba background with blur, subtle border
- On hover: lift up slightly (transform: translateY(-4px)) with box-shadow increase

Connecting line:
- Horizontal line connecting all 3 nodes
- Animates from left to right as section scrolls into view (using Framer Motion + Intersection Observer)
- Each node "activates" (border changes to var(--accent)) as the line reaches it

BOTTOM — Testimonial Bar:
- Styled quote block with left accent border (var(--accent))
- Text: "전체 과정에서 통화 0건. 카카오톡 메시지 3번으로 끝났습니다. 런칭 다음 날 첫 해외 문의가 들어왔습니다."
- Attribution: "— 이OO 대표, OO전자 (임베디드 보드 제조)"

RESPONSIVE:
- Desktop (≥ 768px): horizontal timeline
- Mobile (< 768px): vertical timeline, nodes stacked with vertical connecting line on the left

VERIFICATION: 3-step timeline renders. Connecting line animates on scroll. Cards have hover lift effect. Testimonial displays below. Mobile shows vertical layout.
```

### Expected Output
- Horizontal 3-step timeline with glassmorphic cards
- Scroll-triggered line animation activating nodes
- Testimonial quote bar
- Responsive vertical layout on mobile

### Files Created/Modified
- `src/components/Process/index.jsx` + `Process.module.css`

---

## Task 6: B2B Component Demo Section (S5)

### Prompt for AI

```
You are building the "B2B Component Demo" section for a dark-themed B2B React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

Read src/styles/globals.css for design tokens.

OBJECTIVE: Build a showcase section demonstrating how B2B data is elegantly displayed, using sub-tabs.

━━━ COMPONENT: ComponentDemo (src/components/ComponentDemo/index.jsx + ComponentDemo.module.css) ━━━

Section ID: id="demo"

Section Header:
- Label: "데이터 시연"
- Headline: "MCU 스펙 테이블, 시스템 아키텍처, 데이터시트.\nB2B 바이어가 원하는 데이터를 즉시 보여줍니다."
- Sub-copy: "'예쁜 사진' 대신 '정확한 데이터'를 보여드립니다.\n귀사의 기술력을 바이어가 이해할 수 있는 포맷으로 구조화합니다."

SUB-TAB BAR: 3 sub-tabs
  Tab A: "📊 스펙 비교 테이블"
  Tab B: "🏗️ 아키텍처 다이어그램"
  Tab C: "📄 데이터시트 허브"

━━━ TAB A: SpecTable (src/components/ComponentDemo/SpecTable.jsx) ━━━

Caption: "클릭 한 번으로 정렬. 필터로 즉시 검색.\n바이어가 원하는 MCU를 30초 안에 찾습니다."

FIRST — Create data file: src/data/products.json
[
  {"model":"MCU-X200","cpu":"ARM Cortex-M7","ram":"512KB","tempRange":"-40~85°C","protocol":"UART, SPI","downloads":342},
  {"model":"MCU-X300","cpu":"ARM Cortex-M33","ram":"1MB","tempRange":"-40~85°C","protocol":"SPI, I2C","downloads":256},
  {"model":"MCU-X500","cpu":"ARM Cortex-A53","ram":"2GB","tempRange":"-20~70°C","protocol":"Ethernet, CAN","downloads":189},
  {"model":"SEN-T100","cpu":"—","ram":"—","tempRange":"-40~125°C","protocol":"I2C","downloads":421},
  {"model":"GW-E400","cpu":"ARM Cortex-A72","ram":"4GB","tempRange":"0~60°C","protocol":"ETH, WiFi, BLE","downloads":97}
]

Table Features:
- Columns: Model, CPU, RAM, Temp Range, Protocol, Action (📥 icon)
- Click column header to sort (ascending/descending toggle)
- Sort indicator arrow (▲/▼) on active column
- Filter bar above table:
  - "동작 온도" dropdown: [전체, -40°C 이상, 0°C 이상]
  - "통신 프로토콜" dropdown: [전체, UART, SPI, I2C, Ethernet, CAN]
  - Search input: placeholder "🔍 모델 검색"
- 📥 button on each row: shows a toast notification "데이터시트 다운로드 시작 (데모)" for 2 seconds
- Table has dark styling matching var(--bg-card), with hover row highlight
- On mobile: table scrolls horizontally with shadow indicator on scroll edge

━━━ TAB B: ArchitectureDiagram (src/components/ComponentDemo/ArchitectureDiagram.jsx) ━━━

Caption: "제품의 시스템 아키텍처를 인터랙티브하게 보여줍니다.\n노드를 hover하면 상세 스펙이 표시됩니다."

Build an SVG-based system architecture diagram showing an IoT data flow:
- 5 nodes arranged in a flow:
  [IoT Sensor] → [Edge Gateway] → [Cloud Server] → [Dashboard] → [Mobile App]
- Each node: rounded rectangle with icon + label
- On hover: node highlights (border → accent color) + tooltip shows specs
- Animated particles (small dots) traveling along connection lines (CSS animation)
- Use SVG elements, NOT heavy diagramming libraries
- Responsive: scales down on mobile

━━━ TAB C: DatasheetHub (src/components/ComponentDemo/DatasheetHub.jsx) ━━━

Caption: "바이어가 가장 많이 하는 요청: '데이터시트 보내주세요.'\n이제 바이어가 직접 다운로드합니다. 24시간."

Card grid layout (3 columns desktop, 2 tablet, 1 mobile):
  5 cards, each with:
  - PDF icon/thumbnail area (styled placeholder)
  - Model name (bold)
  - "v3.2 · PDF · 2.4MB"
  - Download count: "{N}회 다운로드"
  - Two buttons: [다운로드] [미리보기]
  - Clicking either shows a toast "데모 버전입니다. 실제 서비스에서 제공됩니다."

Use the data from src/data/products.json for model names and download counts.

VERIFICATION:Table sorts on column click. Filters work. Architecture SVG renders with hover tooltips. Datasheet cards display in grid. Toasts appear on download clicks. Responsive on all breakpoints.
```

### Expected Output
- 3 sub-tabs: sortable/filterable spec table, SVG architecture diagram, datasheet card grid
- Interactive sorting, filtering, hover tooltips
- Toast notifications on demo actions

### Files Created/Modified
- `src/components/ComponentDemo/index.jsx` + `ComponentDemo.module.css`
- `src/components/ComponentDemo/SpecTable.jsx`
- `src/components/ComponentDemo/ArchitectureDiagram.jsx`
- `src/components/ComponentDemo/DatasheetHub.jsx`
- `src/data/products.json`

---

## Task 7: Conversion Form + Footer (S6 + S7)

### Prompt for AI

```
You are building the Conversion Form and Footer for a dark-themed B2B React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

Read src/styles/globals.css for design tokens.

OBJECTIVE: Build a multi-step inquiry form and minimal footer.

━━━ COMPONENT 1: ConversionForm (src/components/ConversionForm/index.jsx + ConversionForm.module.css) ━━━

Section ID: id="contact"

Section Header:
- Label: "무료 진단 신청"
- Headline: "귀사 웹사이트의 현재 상태를 무료로 진단합니다."
- Sub-copy: "아래 정보를 입력하시면 24시간 내에\n귀사 웹사이트 진단 리포트를 보내드립니다.\n부담 없이 확인만 해보세요."

2-COLUMN LAYOUT (desktop):
  LEFT — Multi-step form (60% width)
  RIGHT — Trust reinforcement panel (40% width)
  Mobile: trust panel stacks above form.

MULTI-STEP FORM (3 steps, managed with React state):

Progress bar at top: segmented, shows Step 1/2/3, fills with accent color.

Step 1 — "기본 정보 (1/3)":
  Fields:
  - 회사명 * (required, text)
  - 담당자명 * (required, text)
  - 이메일 * (required, email validation)
  - 연락처 (optional, tel)
  Button: "다음 단계 →"
  Validation: required fields must be filled, email format checked, before advancing.

Step 2 — "프로젝트 정보 (2/3)":
  Fields:
  - 현재 웹사이트 URL (text, optional)
  - 문의 유형 * (radio group):
    ○ 신규 제작 (New Build)
    ○ 리뉴얼 (Renewal)
    ○ 자동화 추가 (Add Automation Only)
  - 예상 예산 (radio group):
    ○ ~500만원
    ○ 500~1,000만원
    ○ 1,000만원 이상
    ○ 미정 (상담 후 결정)
  Buttons: "← 이전" and "다음 단계 →"

Step 3 — "추가 정보 & 제출 (3/3)":
  Fields:
  - 추가 요청사항 (textarea, 3 rows)
  - 파일 첨부 (file input, accept PDF/images, optional)
    Styled as a drag-drop area with "📎 파일 선택" text
  - ☑ 개인정보 처리방침에 동의합니다. (required checkbox)
  Buttons: "← 이전" and "🚀 무료 진단 신청하기"

Form step transitions: horizontal slide animation (300ms ease-out, use Framer Motion AnimatePresence)

Form styling:
- Inputs: dark background (var(--bg-card)), light text, accent border on focus
- Labels: var(--text-secondary)
- Error states: red border + error message below field
- var(--radius-sm) on all inputs/buttons

On submit:
- Button shows spinner (1.5s simulated delay)
- Then shows success state:
  - Checkmark animation (scale from 0 to 1, rotate 360)
  - Text: "✅ 접수 완료!\n대표님의 카카오톡으로 접수 확인 알림이 전송되었습니다.\n24시간 내에 무료 진단 리포트를 보내드리겠습니다."
  - Inquiry number: "#INQ-{YYYYMMDD}-001"
- Collect all form data into a single object (we'll connect to API in Task 8)
- For now, just console.log the form data object.

TRUST PANEL (right column):
  3 benefits with ✅ icons:
  - "디자인 미팅 0회 — 비동기로만 진행합니다."
  - "5영업일 완성 — 명확한 일정, 지연 없음."
  - "고정 가격제 — 추가 비용이 발생하지 않습니다."

  Divider, then:
  "접수 후 절차:"
  1. "제출 즉시 카카오톡으로 접수 확인 발송"
  2. "24시간 내 무료 진단 리포트 전달"
  3. "리포트 확인 후 진행 여부 결정 (부담 없음)"

  Divider, then:
  "폼 대신 카카오톡으로 바로 문의하세요."
  💬 "카카오톡 채널 바로가기 →" (styled as button, links to # for now)

━━━ COMPONENT 2: Footer (src/components/Footer/index.jsx + Footer.module.css) ━━━

Minimal dark footer:
- Logo centered
- Nav links: "핵심 기능 · 진행 방식 · 데모 · 문의하기" (anchor links matching header)
- "© 2026 All rights reserved. · 개인정보처리방침 · 이용약관"

VERIFICATION: 3-step form navigates correctly. Validation prevents advancing without required fields. Submit shows success animation. Trust panel renders correctly. Footer is minimal and responsive.
```

### Expected Output
- 3-step form with progress bar, validation, slide transitions
- Success animation on submit
- Trust panel with benefits and KakaoTalk CTA
- Minimal footer

### Files Created/Modified
- `src/components/ConversionForm/index.jsx` + `ConversionForm.module.css`
- `src/components/Footer/index.jsx` + `Footer.module.css`

---

## Task 8: Serverless API & n8n Webhook Integration

### Prompt for AI

```
You are adding backend API integration to a React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

OBJECTIVE: Create Vercel serverless functions to proxy form submissions to n8n webhooks and integrate them with the frontend form.

STEP 1 — Create the API directory structure:
api/
├── webhook-proxy.js     (form submission → n8n)
└── health.js            (health check endpoint)

STEP 2 — api/webhook-proxy.js:
- Accept POST requests only
- Validate incoming JSON body has required fields: company, name, email
- Sanitize all string inputs (strip HTML tags, trim whitespace)
- Rate limit: use a simple in-memory Map to track submissions per IP (max 5/min).
  On rate limit exceeded: return 429 with JSON { error: "Too many requests" }
- Forward sanitized payload to n8n webhook URL (from env var N8N_WEBHOOK_URL):
  POST to N8N_WEBHOOK_URL with body:
  {
    timestamp: ISO string,
    company, name, email, phone,
    inquiryType, budget, websiteUrl, message,
    source: request referrer or "direct",
    utm: { source, medium, campaign } parsed from referrer URL query params
  }
- Add CORS headers: only allow origin from ALLOWED_ORIGIN env var (or * in development)
- Handle n8n being unreachable: return 200 to user anyway (don't block UX), but log error
- Return: { success: true, inquiryId: "INQ-{YYYYMMDD}-{random3digits}" }

STEP 3 — api/health.js:
- GET endpoint
- Returns { status: "ok", timestamp: ISO string }

STEP 4 — Update vite.config.js:
- Add proxy configuration for development to forward /api/* requests to Vercel dev server

STEP 5 — Create .env.example:
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/xxxxx
ALLOWED_ORIGIN=https://your-domain.com

STEP 6 — Update the ConversionForm component (src/components/ConversionForm/index.jsx):
- Replace the console.log on submit with an actual fetch POST to /api/webhook-proxy
- Send all form data as JSON
- Handle success: show the success state with the returned inquiryId
- Handle error: show error message "⚠️ 전송에 실패했습니다.\n네트워크 연결을 확인하시고 다시 시도해 주세요." with retry button
- Handle loading state: disable submit button, show spinner

STEP 7 — Create a vercel.json in project root:
{
  "functions": {
    "api/*.js": {
      "memory": 128,
      "maxDuration": 10
    }
  }
}

VERIFICATION: Start the dev server. Submit the form — it should POST to /api/webhook-proxy. Without N8N_WEBHOOK_URL set, it should return success (graceful fail). The inquiryId should display in the success message. Health endpoint at /api/health returns 200.
```

### Expected Output
- Two Vercel serverless functions (webhook-proxy, health)
- Form connected to real API with error handling
- Rate limiting and input sanitization
- Environment variable setup

### Files Created/Modified
- `api/webhook-proxy.js`, `api/health.js`
- `vercel.json`, `.env.example`
- `src/components/ConversionForm/index.jsx` (updated)

---

## Task 9: AI Chatbot Integration

### Prompt for AI

```
You are adding AI chatbot functionality to a React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

OBJECTIVE: Build a working AI chatbot demo using a local knowledge base, with optional Gemini API integration.

STEP 1 — Create knowledge base: src/data/knowledgeBase.json
{
  "products": [
    {
      "model": "MCU-X200",
      "name": "Industrial MCU Board X200",
      "specs": {
        "cpu": "ARM Cortex-M7, 480MHz",
        "ram": "512KB SRAM",
        "flash": "2MB",
        "tempRange": "-40°C ~ +85°C",
        "inputVoltage": "3.3V ~ 5V DC",
        "protocols": ["UART", "SPI", "I2C", "Ethernet"],
        "certifications": ["CE", "FCC", "KC"],
        "moq": "100 units",
        "leadTime": "2-3 weeks"
      },
      "datasheetUrl": "#",
      "datasheetSize": "2.4MB"
    },
    {
      "model": "MCU-X300",
      "name": "High-Performance MCU X300",
      "specs": {
        "cpu": "ARM Cortex-M33, 200MHz",
        "ram": "1MB SRAM",
        "flash": "4MB",
        "tempRange": "-40°C ~ +85°C",
        "inputVoltage": "1.8V ~ 3.6V DC",
        "protocols": ["SPI", "I2C", "USB"],
        "certifications": ["CE", "FCC"],
        "moq": "50 units",
        "leadTime": "2 weeks"
      },
      "datasheetUrl": "#",
      "datasheetSize": "3.1MB"
    },
    {
      "model": "MCU-X500",
      "name": "Application Processor X500",
      "specs": {
        "cpu": "ARM Cortex-A53, 1.5GHz",
        "ram": "2GB DDR4",
        "flash": "16GB eMMC",
        "tempRange": "-20°C ~ +70°C",
        "inputVoltage": "5V DC (USB-C)",
        "protocols": ["Ethernet", "CAN", "WiFi", "BLE"],
        "certifications": ["CE", "FCC", "KC", "TELEC"],
        "moq": "25 units",
        "leadTime": "3-4 weeks"
      },
      "datasheetUrl": "#",
      "datasheetSize": "5.8MB"
    }
  ],
  "faq": [
    {"q": "MOQ", "a": "제품별로 다르며, MCU-X200은 100개, MCU-X500은 25개부터 주문 가능합니다."},
    {"q": "리드타임", "a": "일반적으로 2-4주이며, 재고 상황에 따라 달라질 수 있습니다."},
    {"q": "커스텀 펌웨어", "a": "커스텀 펌웨어 개발은 별도 상담이 필요합니다. 담당 엔지니어를 연결해드리겠습니다."},
    {"q": "샘플", "a": "평가용 샘플은 유상으로 제공됩니다. 수량과 모델을 말씀해 주시면 견적을 보내드립니다."}
  ]
}

STEP 2 — Create chatbot engine: src/hooks/useChatbot.js
A custom React hook that:
- Maintains conversation history (array of { role: 'user'|'bot', content: string, timestamp: Date })
- Has a sendMessage(text) function
- Uses local keyword matching first:
  - Pattern 1: If message contains a model number (MCU-X200, etc.), look up in products array
    - If it asks about specific specs (온도, 전압, voltage, temp, protocol, 통신), return that spec
    - If it asks for datasheet (데이터시트, datasheet, PDF, spec sheet), return datasheet link
    - Otherwise return full product summary
  - Pattern 2: If message matches a FAQ keyword (MOQ, 리드타임, 커스텀, 샘플), return FAQ answer
  - Pattern 3: If no match → respond with escalation:
    "해당 문의는 커스텀 엔지니어링 영역으로, 담당 엔지니어가 직접 답변드리는 것이 정확합니다.
     지금 자동으로 담당자에게 전달하겠습니다.
     영업시간 기준 2시간 이내 회신드리겠습니다."
- Simulates typing delay: 1-2 seconds before response appears
- Has isTyping state boolean for UI

STEP 3 — Update AIChatbotTab (src/components/Features/AIChatbotTab.jsx):
- Replace the static chatbot mockup with the real useChatbot hook
- Keep the pre-loaded conversation (hard-code as initial messages)
- Enable the input field and send button to actually send messages
- Show typing indicator ("AI 분석 중...") when isTyping is true
- Suggested prompt pills: onClick → send that message to the chatbot
- Display bot responses with markdown-like formatting (bold for specs, list items)
- Auto-scroll chat to bottom on new messages
- Limit to 20 messages per session

STEP 4 — Create floating chatbot widget: src/components/ChatWidget/index.jsx + ChatWidget.module.css
- A floating button in the bottom-right corner (position: fixed, z-index 999)
- Styled as a circular button with 🤖 icon
- On click: expands to a chat window (350px wide, 500px tall)
- Contains the same chatbot UI as AIChatbotTab but standalone
- Close button in header
- Persists conversation state across open/close (don't reset on close)
- Animates open/close with scale + fade (Framer Motion)
- Only show on desktop (hide on mobile where it overlaps content)

STEP 5 — Add ChatWidget to App.jsx

VERIFICATION: Chatbot in Tab 3 accepts input, matches product queries, returns correct specs. Suggested prompts work. Escalation message shows for unknown queries. Typing indicator appears. Floating widget opens/closes. Conversation persists. Works on desktop.
```

### Expected Output
- Knowledge base JSON with 3 products + FAQ
- Custom hook with keyword-matching chatbot logic
- Working chatbot in Features Tab 3
- Floating chatbot widget (desktop)

### Files Created/Modified
- `src/data/knowledgeBase.json`
- `src/hooks/useChatbot.js`
- `src/components/Features/AIChatbotTab.jsx` (updated)
- `src/components/ChatWidget/index.jsx` + `ChatWidget.module.css`
- `src/App.jsx` (updated)

---

## Task 10: Final Assembly, Performance Polish & Deploy Readiness

### Prompt for AI

```
You are doing the final polish on a React landing page at /Users/yummy/Documents/VS Code/IT-Embedded-B2B/.

OBJECTIVE: Ensure all sections work together, optimize performance, add SEO, and prepare for Vercel deployment.

STEP 1 — Scroll-to-section smooth scrolling:
Review all anchor links across Header, Footer, Hero CTAs, and sticky CTA.
Ensure all use smooth scroll behavior and correct section IDs:
  #features → Features section
  #process → Process section
  #demo → ComponentDemo section
  #contact → ConversionForm section
  Clicking header logo → scroll to top

STEP 2 — SEO & Meta:
Update index.html:
  <title>B2B 웹사이트 자동화 | IT Embedded 전문 — 24시간 자동 영업 인프라</title>
  <meta name="description" content="IT Embedded / B2B 기업을 위한 웹사이트 자동화 서비스. 디자인 미팅 0회, 5일 완성. RFQ 자동 접수, AI 기술 상담, CRM 자동 연동.">
  Open Graph tags (og:title, og:description, og:image, og:type)
  Twitter Card tags
  JSON-LD structured data for Organization + Service
  <link rel="icon" type="image/svg+xml" href="/favicon.svg"> (create a simple SVG favicon — a small circuit node icon)

Create public/robots.txt:
  User-agent: *
  Allow: /
  Sitemap: https://your-domain.com/sitemap.xml

Create public/sitemap.xml (basic single-page sitemap)

STEP 3 — Performance optimization:
- Lazy load the heavy components (Features, ComponentDemo, ChatWidget) using React.lazy() + Suspense
- Add loading="lazy" to any images
- Ensure Canvas animation in Hero pauses on hidden tab
- Review CSS: remove any unused styles
- Check that Framer Motion animations only trigger once (not re-trigger on every scroll pass)

STEP 4 — Accessibility:
- All interactive elements have aria-labels
- Tab panels have role="tabpanel" and aria-labelledby
- Form inputs have associated <label> elements
- Focus styles visible on all interactive elements (outline on :focus-visible)
- Skip-to-content link at very top of page

STEP 5 — Final review of responsive behavior:
Test these viewport widths in your mind:
  360px (phone)
  768px (tablet)
  1200px (desktop)
  1440px (large desktop)

Ensure:
- Header hamburger works on mobile
- All sections stack vertically on mobile
- Spec table scrolls horizontally on mobile
- Form trust panel moves above form on mobile
- Timeline becomes vertical on mobile
- No horizontal overflow at any breakpoint (check every section)

STEP 6 — Create a public/favicon.svg:
A simple SVG icon: small circle with node connections (circuit-board style), using #4F7CFF color.

STEP 7 — Update package.json scripts:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext js,jsx"
}

STEP 8 — Create .gitignore updates if needed:
Ensure node_modules, dist, .env are ignored.

VERIFICATION:
1. Run `npm run build` — must succeed with no errors
2. Run `npm run preview` — load the built site, verify:
   - All sections render correctly
   - Smooth scroll works for all anchor links
   - Tab switching works in Features and ComponentDemo
   - Form validation and multi-step navigation works
   - Chatbot responds to queries
   - No console errors
   - Page title and meta tags are correct (check with view-source)
3. Check Lighthouse score in browser DevTools (target: ≥ 90 performance)
```

### Expected Output
- SEO meta tags and structured data
- Lazy-loaded heavy components
- Accessibility improvements
- Favicon, robots.txt, sitemap.xml
- Clean production build
- Deploy-ready project

### Files Created/Modified
- `index.html` (updated with SEO)
- `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`
- Multiple component files (accessibility updates)
- `package.json` (scripts)
- `.gitignore`

---

## Quick Reference — Execution Checklist

| Task | Est. Complexity | Depends On | Status |
|---|---|---|---|
| 1. Project Setup & Design System | ⬜⬜ Low | — | ☐ |
| 2. Header + Hero | ⬜⬜⬜ Medium | Task 1 | ☐ |
| 3. Pain Points | ⬜⬜ Low | Task 1 | ☐ |
| 4. Core Features (3 Tabs) | ⬜⬜⬜⬜⬜ High | Task 1 | ☐ |
| 5. Zero-Meeting Process | ⬜⬜ Low | Task 1 | ☐ |
| 6. B2B Component Demo | ⬜⬜⬜⬜ Medium-High | Task 1 | ☐ |
| 7. Conversion Form + Footer | ⬜⬜⬜ Medium | Task 1 | ☐ |
| 8. Serverless API + n8n | ⬜⬜⬜ Medium | Task 7 | ☐ |
| 9. AI Chatbot | ⬜⬜⬜⬜ Medium-High | Task 4 | ☐ |
| 10. Polish & Deploy | ⬜⬜⬜ Medium | All | ☐ |
