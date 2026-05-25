# PRD — Lux Novo (Lux.Sex Lifestyle)

## 1. Problema original
Réplica pixel-perfect de `https://lux-novo.lux.sex/` como ecossistema "Lifestyle" da marca principal:
- Editorial multi-página (Turismo, Bem Estar, Vida Noturna, Gastronomia)
- Estética escura roxa/dourada (`#050208` / `#9b30ff` / `#d4af37`)
- Homepage estilo timeline (Facebook/LinkedIn)
- Music player persistente (SoundCloud) tocando playlist privada
- Shop com Sex Shop (redirect parceiros) + Marketplace (Stripe futuro) + Bets vitrine
- Sidebar de parceiros à direita nos artigos
- Headless CMS (Sanity) controlando matérias

## 2. Arquitetura
- **Frontend**: React 19 (CRA) + TailwindCSS + shadcn/ui + React Router 7 + Context API
- **Backend**: FastAPI + Motor (MongoDB async)
- **CMS**: Sanity (project `8um1375u`, dataset `production`)
- **Audio**: SoundCloud Widget API (autoplay muted + loop)
- **Layout persistente** mantém o player e header montados entre rotas

## 3. Implementado

### 25/Mai/2026 — Sanity CMS integration ✅
- `/app/frontend/src/sanity/client.js` — Sanity client configurado (anonymous reads para published content)
- `/app/frontend/src/sanity/queries.js` — GROQ queries: all, by path, by section, by slug
- `/app/frontend/src/sanity/articles.js` — Service com normalização + fallback automático para `mockData` quando Sanity vazio
- `EditorialHome.jsx` e `BlogPage.jsx` refatorados para consumir o service
- `.env` (frontend) com `REACT_APP_SANITY_PROJECT_ID`, `REACT_APP_SANITY_DATASET`, `REACT_APP_SANITY_API_VERSION`
- `.env` (backend) com SANITY_PROJECT_ID/DATASET/READ_TOKEN para uso futuro em proxy
- Schema pronto: `/app/sanity-schemas/article.js` (para colar no Studio do usuário)
- Guia em PT-BR: `/app/SANITY_SETUP.md`
- Fix: duplo `import MusicPlayer` em `Header.jsx`

### Sessões anteriores ✅
- Réplica do site com NDA pixel-perfect
- Timeline estilo Facebook na home (sem categoria/data nos cards — só autor + tempo relativo)
- Music player no header com mute + barra de volume vertical, autoplay em loop
- Rotas dinâmicas por categoria/subcategoria
- Sidebar de Parceiros (Make Life + Farma Ponte)
- Shop Hub + Sex Shop + Marketplace + Apostas (UI completa)
- Backend: banners CRUD + likes/comments

## 4. Backlog priorizado

### P1 — Próximas tarefas
- 🟣 **Sanity Studio Setup pelo usuário**: rodar `npm create sanity@latest -- --project 8um1375u`, colar `/app/sanity-schemas/article.js`, liberar CORS no dashboard, publicar primeira matéria
- 🟣 **Stripe checkout** no Marketplace (chaves de teste já no pod)
- 🟣 **Studio deploy** opcional (`npx sanity deploy`) para acesso na nuvem

### P2 — Futuro
- Integração real de Apostas/Bets
- Painel admin de banners (ou via Sanity)
- PortableText renderer para corpo das matérias quando vindas do Sanity (página de leitura individual)
- Migrar `partnerStores` e `marketplaceProducts` para Sanity também

## 5. Endpoints
- `POST /api/posts/{id}/like`
- `POST /api/posts/{id}/unlike`
- `GET /api/posts/{id}/comments`
- `POST /api/posts/{id}/comments`
- `GET /api/banners?slot=<slot>`

## 6. Credenciais
- Sanity Project ID: `8um1375u`
- Dataset: `production`
- Read Token: salvo em `/app/backend/.env` (NÃO exposto no frontend)
