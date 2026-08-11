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
- **Deploy produção**: Vercel full-stack — CRA em `frontend/build` + FastAPI serverless em `api/index.py`
- **Banco produção**: MongoDB Atlas via `MONGO_URL`/`DB_NAME` configurados no Dashboard Vercel
- **CMS**: Sanity (project `8um1375u`, dataset `production`)
- **Audio**: SoundCloud Widget API (autoplay muted + loop)
- **Layout persistente** mantém o player e header montados entre rotas

## 3. Implementado

### 11/Ago/2026 — Correção Vercel independente de arquivos `.env` ✅
- Usuário informou ter sobrescrito arquivos no Sanity Studio externo, mas o erro do site foi isolado e não depende desses arquivos: o bundle Vercel continuava sem as três variáveis públicas Sanity
- GitHub raw confirmou que `frontend/.env.production` seguia ausente (404), mesmo com regra de re-inclusão; o fluxo Save to GitHub não publicou o arquivo untracked
- Correção definitiva movida para arquivos JSON rastreados: `vercel.json` raiz e `frontend/vercel.json` injetam project ID, dataset e API version públicas diretamente no ambiente do `yarn build`
- Nenhum token Sanity ou segredo foi adicionado; `.env` locais permanecem ignorados
- Build reproduzido em cópia sem `frontend/.env` e sem `frontend/.env.production`: compilou e, servido isoladamente, montou `#root` e age-gate sem erro Sanity
- Testing agent iteration_9 validou ambos os formatos Vercel (raiz e Root Directory frontend), Biome, Vitest, build e navegador; produção atual permanece no bundle antigo até novo commit/redeploy
- Gitleaks v8.28 pós-teste: 704 KB analisados, zero leaks
- Backup dos schemas permanece versionado em `/sanity-schemas`; sobrescrever o Studio externo não apagou os arquivos de recuperação do projeto

### 11/Ago/2026 — Incidente de tela preta em produção corrigido no código ✅
- Incidente reproduzido em `luxsexiaiii.com`: HTML respondia 200, mas `#root` permanecia vazio e o console mostrava `Configuração Sanity incompleta.`
- Causa raiz: `frontend/src/sanity/client.js` passou a exigir env no import, porém `frontend/.env.production` continuava ignorado e não foi incluído no GitHub/Vercel
- `.gitignore` corrigido: arquivos `.env` com segredos continuam ignorados, mas `frontend/.env.production`, `frontend/.env.example` e `backend/.env.example` são explicitamente versionáveis
- `frontend/.env.production` recriado somente com flags de build e identificadores públicos Sanity; nenhum token, senha ou URI autenticada foi adicionado
- `frontend/src/index.js` agora carrega `App` com `React.lazy` + `Suspense` dentro do `Sentry.ErrorBoundary`, evitando root vazio em futura falha de módulo
- Build production simulado em cópia sem `frontend/.env` local: compilação e montagem do React/age-gate aprovadas
- Testing agent iteration_8 confirmou RCA, build limpo, root montado, age-gate, Biome e Vitest; domínio de produção permanece no bundle antigo até redeploy
- Gitleaks v8.28 executado após o agent: 699 KB analisados, zero leaks

### 11/Ago/2026 — Rádio SoundCloud restaurada e configurável pelo Sanity ✅
- Causa da regressão: a URL havia sido externalizada para `REACT_APP_SOUNDCLOUD_URL`; ambientes sem essa variável faziam `MusicPlayer` retornar `null` e a rádio sumia do header
- Criado singleton publicado no Sanity: `_id=siteSettings`, `_type=siteSettings`, campo `soundcloudUrl`; conteúdo atual criado e validado por leitura pública sem expor a URL
- `useSoundCloudUrl` prioriza Sanity publicado, valida HTTPS/domínios oficiais SoundCloud, usa env como fallback e oferece retry em falha/vazio
- `MusicPlayer` mantém loading, indisponível e sucesso no layout; URL dinâmica remonta o iframe com `key`, aplica `encodeURIComponent` e preserva mute/unmute, gesto do age-gate e loop
- Schemas versionados: `sanity-schemas/siteSettings.js`, `structure.js` singleton e registro em `index.js`; `SANITY_SETUP.md` atualizado para troca editorial do link
- Cliente Sanity agora falha rápido sem `REACT_APP_SANITY_PROJECT_ID`, `REACT_APP_SANITY_DATASET` e `REACT_APP_SANITY_API_VERSION`; defaults hardcoded removidos
- URL privada histórica removida de `test_result.md`; tokens Editor temporários nunca foram salvos; Gitleaks v8.28 reexecutado sem leaks
- Testing agent iteration_7 confirmou no preview: rádio e mute visíveis/funcionais, singleton público válido, query/hook/fallback/player corretos, Vitest 9/9, build, Playwright 3/3 e backend 6/6
- Após os achados do agent: exposição histórica sanitizada, cliente Sanity endurecido, Gitleaks real aprovado e todos os gates reexecutados
- Cobertura frontend subiu de 1,58% para 5,78% com testes do hook e MusicPlayer

### 09/Ago/2026 — Padrões obrigatórios de engenharia, Motion e qualidade ✅
- `CONTRIBUTING.md` criado como fonte normativa para pessoas/agentes: Issue obrigatória com critérios de aceite, branch por Issue, deploy somente via PR com `Closes #N`, proibição de commit direto na `main`, segredo nunca versionado e Definition of Done
- Governança GitHub adicionada: templates de Correção/Nova função/Melhoria, template de PR, `CODEOWNERS`, instrução de Branch Protection e CI que exige Issue vinculada
- Gitleaks configurado em toda PR; credenciais históricas removidas dos arquivos versionáveis; SoundCloud e Sentry externalizados para `.env`; scan local real com Gitleaks v8.28 aprovado sem leaks
- CI em `.github/workflows/ci.yml`: jobs bloqueantes `policy`, `gitleaks`, `frontend-quality`, `backend-quality`, `e2e` e release Sentry após merge
- Qualidade frontend: Biome, Knip, Vitest/Testing Library, Playwright e Codecov; meta 80% com adoção gradual e baseline protegido
- Baseline atual: frontend 1,58% linhas / 9,61% funções / 10,16% branches; backend 53,15%; Codecov exige 80% no patch e impede queda do projeto
- Qualidade backend: Pytest + pytest-cov; gate mínimo atual de 50%; consulta de traduções limitada a 500 artigos e projeção Mongo exclui `_id`
- Motion Principles documentados com referência atualizada; tokens globais 150/220/300ms, `prefers-reduced-motion`, lazy routes, Suspense skeleton, transições de página e remoção de motion contínuo/decorativo desnecessário
- Estados de horóscopo reforçados: skeleton estável, erro acionável, retry, sucesso animado e streaming exibindo progresso real sem percentuais falsos
- Header/menu e estados críticos receberam `data-testid` estáveis; Playwright cobre age-gate, reduced motion e drawer principal
- Sentry único para React/FastAPI: `@sentry/react`, ErrorBoundary, Browser Tracing, `sentry-sdk` + `OTLPIntegration`, FastAPI/PyMongo instrumentation e `/api/health`
- PII masking ativo em frontend/backend para user, headers, cookies, bodies, query strings, e-mail, Bearer token e URI Mongo; Session Replay desativado
- `docs/OBSERVABILITY.md` documenta variáveis, retenção 90 dias, RBAC mínimo, alertas e verificação pós-deploy
- Testes finais: Biome check ✅, Knip ✅, Vitest 5/5 ✅, Playwright 3/3 ✅, Pytest 8/8 com 53,15% ✅, React build ✅, uv Python 3.12/96 pacotes ✅, Gitleaks sem leaks ✅, deployment agent PASS
- Testing agent iteration_6 validou backend/preview/horóscopo e apontou Biome, warning i18n e test IDs; todos foram corrigidos e revalidados por autotestes

### 09/Ago/2026 — Rotação MongoDB Atlas validada ✅
- Nova credencial Atlas validada com `ping`, leitura da coleção `banners` e conexão ao banco `luxsex`
- Backend local atualizado via `MONGO_URL`/`DB_NAME` sem versionar a URI em código ou testes
- Fluxos confirmados após a rotação: banners (7 registros), horóscopo diário com cache Atlas e leitura pessoal SSE
- **Ação externa pendente**: atualizar `MONGO_URL` no Dashboard Vercel e fazer novo deploy; a senha anterior deixou de ser válida

### 09/Ago/2026 — Correção definitiva do build Vercel + Horóscopo ✅
- Causa raiz reproduzida com o mesmo resolvedor do Vercel: `uv` recusava o LiteLLM fornecido como dependência URL indireta por `emergentintegrations`, impedindo a criação da função Python; sem função, o fallback React entregava `index.html` em `/api/*`
- `api/requirements.txt` corrigido para declarar a wheel LiteLLM como requisito URL direto; resolução Python 3.12 validada com 79 pacotes
- `vercel.json` reforçado: `/api/:path*` é processado antes do fallback SPA, `backend/**` entra explicitamente no bundle e testes/memória são excluídos
- Python fixado em 3.12; `yarn.lock` incluído para builds frontend determinísticos
- FastAPI migrou de `on_event` depreciado para `lifespan`; credenciais Atlas removidas dos testes e substituídas por `ATLAS_TEST_MONGO_URL`/`ATLAS_TEST_DB_NAME`
- Age-gate ganhou seletores estáveis; warnings de Sanity, i18n, SoundCloud e build foram reduzidos; frontend lint/build sem erros
- Testing agent iteration_5: API diária JSON, leitura pessoal SSE e interface do horóscopo aprovadas no preview; pytest final 5/5 e `uv` OK
- **Produção atual ainda depende de novo deploy**: `luxsexiaiii.com/api/horoscope/daily` continua servindo HTML do deployment anterior até o commit corrigido ser publicado

### 08/Jun/2026 — Chave Gemini própria + Fallback ✅
- Usuário forneceu chave Gemini própria (GEMINI_API_KEY no backend/.env)
- Novo helper `/app/backend/llm.py`: `send_with_fallback` / `stream_with_fallback` — chave Gemini do usuário como PRIMÁRIA; se falhar/estourar cota, troca automática para EMERGENT_LLM_KEY
- Aplicado nos 3 serviços de IA: tradução (i18n), horóscopo diário e leitura pessoal (streaming)
- Testado via curl: daily + personal + translation OK pela chave primária; fallback validado com chave inválida (trocou para Emergent)

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
- 🔴 **Salvar os `vercel.json` corrigidos no GitHub e redeploy sem cache**; só então a produção deixa o ErrorBoundary e volta ao age-gate
- 🟡 **Restaurar o Studio externo a partir de `/sanity-schemas`** quando necessário; essa restauração é separada do incidente Vercel
- 🔴 **PUBLICAR IMEDIATAMENTE o commit da tela preta e redeploy Vercel**; depois confirmar `#root > *` e ausência de `Configuração Sanity incompleta.` no console de `luxsexiaiii.com`
- 🔴 **Revogar imediatamente os tokens Sanity Editor temporários** usados no bootstrap; nenhum deles é necessário para a leitura pública do site
- 🔴 **Publicar o schema no Sanity Studio existente**: copiar `siteSettings.js`, `structure.js`, atualizar `index.js` e rodar `npx sanity deploy`; o documento já existe no dataset
- 🔴 **Publicar esta correção via Issue + PR** e redeploy Vercel; o singleton Sanity já está publicado, mas o frontend de produção precisa do novo hook/player
- 🔴 **Abrir a Issue de bootstrap e publicar esta mudança por PR** com `Closes #N`; não enviar diretamente à `main`
- 🔴 **Ativar o Ruleset da `main` no GitHub** conforme `.github/BRANCH_PROTECTION.md`, exigindo os cinco checks bloqueantes e revisão CODEOWNERS
- 🔴 **Configurar GitHub Secrets**: `CODECOV_TOKEN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG` e `SENTRY_PROJECT`; sem eles, upload Codecov/release Sentry não é executável no GitHub
- 🔴 **Configurar Sentry Dashboard**: retenção 90 dias, RBAC por menor privilégio, IP/PII desabilitados e alertas; essas políticas não são impostas por código
- 🔴 **Adicionar variáveis no Vercel**: `SENTRY_*`, `REACT_APP_SENTRY_*` e `REACT_APP_SOUNDCLOUD_URL` em Production/Preview/Development antes do novo deploy
- 🟡 **Elevar cobertura gradualmente até 80%**: priorizar App/Layout, Header/MusicPlayer, horóscopo e serviços Sanity a cada Issue
- 🔴 **Publicar o commit corrigido no Vercel e validar produção**: confirmar `application/json` em `/api/horoscope/daily?sign=aries&lang=pt`
- 🔴 **Atualizar `MONGO_URL` no Vercel** com a credencial Atlas rotacionada e gerar um novo deployment
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
