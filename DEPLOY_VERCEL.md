# Deploy no Vercel — LUX.SEX Lifestyle

App **100% frontend** (React + CRACO + Tailwind) com dados mockados. Sem backend necessário.

## ✅ Já preparado

- `frontend/vercel.json` — config de SPA (rewrites p/ react-router), cache e headers de segurança
- `frontend/.env.production` — sem sourcemaps em produção (build mais leve)
- Sem dependências de backend (tudo mock em `src/mock/mockData.js`)

## 🚀 Passo a passo

### 1. Suba o código para o GitHub
No Emergent: **Profile → GitHub → Push to GitHub** (ou faça download em ZIP e suba manualmente).

### 2. Importe no Vercel
1. Acesse <https://vercel.com/new>
2. Selecione o repositório
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Create React App` (autodetectado)
   - **Build Command**: `yarn build` (já está no vercel.json)
   - **Output Directory**: `build` (já está no vercel.json)
   - **Install Command**: `yarn install` (já está no vercel.json)

### 3. Variáveis de Ambiente
**Nenhuma necessária** — o app não usa backend nem APIs externas (apenas YouTube embeds públicos).

### 4. Deploy
Clique em **Deploy**. Em ~2 min seu site estará no ar em `https://seu-projeto.vercel.app`.

### 5. (Opcional) Domínio próprio
**Project Settings → Domains** → adicione seu domínio (ex.: `lifestyle.lux.sex`).

## 🔄 Atualizações futuras
Cada `git push` na branch `main` faz redeploy automático. Pull requests geram preview URLs.

## ⚠️ Observações
- A rota `/` redireciona para a página Lifestyle.
- O overlay 18+ persiste em `localStorage` do usuário.
- Imagens vêm de Pexels/Unsplash (CDN externo) e do customer-assets do Emergent.
