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

### 25/Mai/2026 (tarde) — Ads + Partners no Sanity + Player loop completo ✅
- **Schema `ad`** em `/app/sanity-schemas/ad.js` — 18 formatos IAB (Outdoor 970×250, Retângulo Médio 300×250, Arranha-céu 120×600, etc) + 7 placements (sidebar, timeline_inline, section_inline, section_footer, shop_top, shop_grid, lifestyle_premium)
- **Schema `partner`** em `/app/sanity-schemas/partner.js` — controla a sidebar de parceiros
- **Schema registry** em `/app/sanity-schemas/index.js`
- Service unificado em `/app/frontend/src/sanity/ads.js` — `fetchAdsByPlacement(placement)` + `fetchPartners()` + pool de imagens placeholder aleatórias
- `EditorialHome`, `BlogPage`, `PartnersSidebar` agora consomem Sanity (fallback automático: Sanity → FastAPI → mock)
- **MusicPlayer**: corrigido loop da playlist inteira — ao terminar uma track avança via `getCurrentSoundIndex` + `(index+1) % total`, garantindo todas as tracks tocarem em sequência e voltarem ao início
- **Manual do Editor** completo em PT-BR em `/app/SANITY_SETUP.md` (setup, publicar matéria, criar banner, adicionar parceiro, FAQ)
- Backend `server.py` limpo: removidos endpoints admin/articles órfãos que estavam quebrando o serviço (Sanity substitui)

### 25/Mai/2026 (manhã) — Sanity CMS integration ✅
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
