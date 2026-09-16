# code-sandbox

Turborepo 모노리포입니다. npm workspaces로 앱과 공유 패키지를 관리합니다.

## 구조

- `apps/web` — Vite + React 앱 (`@repo/web`)
- `packages/ui` — 공유 UI 컴포넌트 (`@repo/ui`)
- `packages/typescript-config` — 공유 TypeScript 설정 (`@repo/typescript-config`)

## 명령

루트에서 실행합니다.

```bash
npm install
npm run dev          # 모든 앱 개발 서버
npm run build        # 모든 패키지 빌드
npm run lint         # 린트
npm run check-types  # 타입 체크
```

특정 워크스페이스만 실행하려면:

```bash
npx turbo run dev --filter=@repo/web
```
