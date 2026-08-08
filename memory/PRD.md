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

### 08/Jun/2026 — Texto + Gênero na leitura pessoal + Vercel ✅
- Subtítulo da leitura pessoal trocado: "Informe seu nome e data de nascimento e nosso astral revela em tempo real o que o céu desenha para você." (6 idiomas)
- Opção Masculino/Feminino no formulário — backend adapta a linguagem (formas gramaticais) da leitura ao gênero (testado: "Querida Carla")
- Vercel: vercel.json já presente em /app/frontend; orientação do suporte repassada (frontend no Vercel + backend na Emergent, REACT_APP_BACKEND_URL no painel do Vercel)

### 08/Jun/2026 — Bug produção: horóscopo "astros em silêncio" ✅ (diagnóstico)
- Causa raiz: o deploy em luxsexiaiii.com é ANTERIOR às rotas /api/horoscope — a API devolve o HTML do SPA e o modal cai no estado de erro. Preview 100% funcional (iteration_3.json)
- Corrigido bloqueio de deploy: .gitignore excluía .env / test_credentials.md (removido). Deployment agent: PASS
- AÇÃO DO USUÁRIO: republicar (Deploy) para o horóscopo funcionar em produção

### 08/Jun/2026 — Horóscopo no Feed da Home ✅
- Card "Horóscopo do dia" no topo do feed (HoroscopeFeedCard): visitante escolhe o signo (salvo em localStorage), vê o panorama do dia + cor/número da sorte e link para o horóscopo completo; botão "Trocar signo"; 6 idiomas
- Auto-testado via screenshot (picker, leitura, persistência após reload)

### 08/Jun/2026 — Auditoria de Segurança + Correções ✅
- Audit executado (FAIL inicial) → 3 achados corrigidos e reverificados pelo testing agent (100%, iteration_2.json):
  - SEC-001: POST/PUT/DELETE `/api/banners` agora exigem header `X-Admin-Key` (ADMIN_API_KEY no backend/.env, comparação timing-safe); GET continua público
  - SEC-002: rate limiting por IP (`rate_limit.py`): /horoscope/personal 5/min, /horoscope/daily 30/min, /i18n/article 30/min, /i18n/cards 15/min → 429
  - SEC-003: prompt hardening no horóscopo pessoal (name/birthdate/focus tratados como dados, injeção ignorada)
  - Hardening: CORS allow_credentials=False com origem '*'; logs do Sanity sem corpo da resposta; sanitização do campo focus
- Credencial admin registrada em /app/memory/test_credentials.md

### 08/Jun/2026 — Horóscopo IA (Gemini) + Compartilhamento ✅
- **`/api/horoscope/daily?sign=&lang=`** — leitura diária por signo via Gemini 3 Flash, cache MongoDB (sign/date/lang), 6 idiomas
- **`/api/horoscope/personal`** — leitura de destino personalizada (nome + nascimento + foco) com streaming SSE em tempo real
- HoroscopePage: cards dos 12 signos abrem modal com leitura IA (panorama, amor, carreira, conselho, cor e número da sorte) + seção "Sua leitura de destino" com formulário e texto streamado
- Compartilhamento renovado (PostInteractions): WhatsApp, Instagram (copia link + abre app), X, Facebook, Telegram, Copiar link e compartilhamento nativo — na matéria E nos cards do feed (cards compartilham a URL da matéria, não da home)
- emergentintegrations atualizado 0.1.0 → 0.2.0; react-icons adicionado
- Testado pelo testing agent: 100% backend e frontend (/app/test_reports/iteration_1.json)

### 08/Jun/2026 — Subtítulo da home atualizado ✅
- Subtítulo do feed (home.subtitle) trocado nos 6 idiomas para: "Moda, arte, luxo, vida premium e diversão, tudo para você, vem viver a experiência Lux.Sex"

### 26/Mai/2026 (tarde) — Tradução automática Gemini + Vídeo nas matérias ✅
- **Backend `/api/i18n/article` + `/api/i18n/cards`** — endpoints FastAPI que traduzem título/excerpt/corpo via **Gemini 3 Flash** com cache MongoDB por (slug, lang)
- Cache invalidado automaticamente quando `_updatedAt` do Sanity muda
- `emergentintegrations.llm.chat` com Emergent LLM Key universal
- Frontend: `fetchArticleBySlug(slug, lang)`, `fetchAllArticles(lang)`, `fetchArticlesBy*(*, lang)` consomem traduções automaticamente
- TimelinePostCard, EditorialHome hero, BlogPage breadcrumb/título da editoria/sub-tabs/empty/explore — todos traduzidos
- **Schema Sanity atualizado** com 2 campos novos: `videoUrl` (link YouTube/Vimeo/MP4) e `videoFile` (upload .mp4/.webm). Upload tem prioridade.
- Componente `ArticleVideo.jsx` renderiza YouTube embed, Vimeo embed, ou `<video>` HTML nativo
- ArticlePage usa vídeo como hero quando presente, senão imagem
- Guia `/app/SANITY_SETUP.md` atualizado com instruções de vídeo + tradução

### 26/Mai/2026 (manhã) — i18n 6 idiomas + player polido + Spicy Club ✅
- **i18next + react-i18next + LanguageDetector** instalados
- **6 idiomas suportados**: PT (default), EN, ES, IT, FR, DE — auto-detect via `navigator.language`, salvo em `localStorage`
- **LanguageSwitcher** no header com bandeiras + dropdown
- Componentes traduzidos: Header (menu completo), NDA AgeOverlay, Newsletter, Footer, CookieBanner, TimelinePostCard, PartnersSidebar, ArticlePage, TimelineAdCard
- `Intl.RelativeTimeFormat` para datas relativas localizadas em todas as línguas
- Player neon: nome do artista + track menores + glow rosa neon, autoplay via user gesture (mute toggle), iframe mantido off-screen (não 1x1)
- **Spicy Club** adicionado como 3º parceiro oficial → `https://www.spicyclub.com.br/`
- Logo Farma Ponte atualizado
- Suporte completo: support_agent guiou domínio nativo Emergent (instruções repassadas ao usuário)

### 25/Mai/2026 — Ads + Partners no Sanity + Player loop + ArticlePage ✅
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
- `GET /api/horoscope/daily?sign=<id>&lang=<lang>` (leitura diária IA, cache)
- `POST /api/horoscope/personal` (SSE stream, body: name/birthdate/lang/focus)
- `POST /api/posts/{id}/like`
- `POST /api/posts/{id}/unlike`
- `GET /api/posts/{id}/comments`
- `POST /api/posts/{id}/comments`
- `GET /api/banners?slot=<slot>`

## 6. Credenciais
- Sanity Project ID: `8um1375u`
- Dataset: `production`
- Read Token: salvo em `/app/backend/.env` (NÃO exposto no frontend)
