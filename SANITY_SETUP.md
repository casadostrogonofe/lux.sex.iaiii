# 🟣 Sanity CMS — Guia de Setup (Lux Novo)

## ✅ Status atual

Sua aplicação **já está conectada** ao Sanity Studio:
- Project ID: `8um1375u`
- Dataset: `production`

Enquanto o Sanity estiver vazio, o site mostra automaticamente o conteúdo do `mockData.js` como fallback. Assim que você publicar a primeira matéria no Studio, ela aparece no feed da home e na editoria correspondente.

---

## 📦 Passo 1 — Criar o Sanity Studio localmente

Abra o terminal e rode (substitua `~/Desktop` por onde quiser salvar):

```bash
cd ~/Desktop
npm create sanity@latest -- --project 8um1375u --dataset production --template clean --typescript false
```

Quando aparecer:
- **"Project output path"** → aceite (`lux-novo` ou nome que quiser)
- **"Use the default dataset configuration?"** → `Y`
- **"Would you like to add configuration files for a Sanity project?"** → `Y`

Aguarde a instalação.

---

## ⚙️ Passo 2 — Adicionar o schema de Matéria

1. Abra o projeto criado (`code lux-novo` ou pelo seu editor)
2. Vá em `schemaTypes/` (ou `schemas/`) e crie um arquivo chamado `article.js`
3. Copie o conteúdo de **`/app/sanity-schemas/article.js`** desse projeto e cole nesse arquivo
4. Abra `schemaTypes/index.js` (ou `index.ts`) e registre o schema:

```js
import article from './article'

export const schemaTypes = [article]
```

---

## ▶️ Passo 3 — Rodar o Studio

```bash
cd lux-novo
npm run dev
```

Acesse `http://localhost:3333` → clique em **"Matéria" → Create**.

Preencha:
- **Título**, **Slug** (gera sozinho), **Editoria (path)** (escolha da lista),
- **Imagem de capa**, **Chamada**, **Corpo**, **Autor**, **Publicado em**, **Tempo de leitura**, **Destacar** (se quiser na capa).

Clique em **Publish**. Atualize o site Lux Novo → a matéria aparece. 🎉

---

## 🌐 Passo 4 — Liberar CORS (uma vez)

Para o site preview consumir o Sanity sem bloqueio:

1. Vá em https://www.sanity.io/manage/project/8um1375u
2. **API → CORS Origins → Add CORS origin**
3. Adicione:
   - `https://premium-space-2.preview.emergentagent.com` (Allow credentials: ✓)
   - `http://localhost:3000` (Allow credentials: ✓)

---

## 🚀 Passo 5 (opcional) — Deploy do Studio

Para acessar o Studio direto na nuvem (sem rodar local):

```bash
cd lux-novo
npx sanity deploy
```

Escolha um subdomínio (ex: `luxnovo`). Acesse `https://luxnovo.sanity.studio`.

---

## 🗺️ Editorias disponíveis (campo `path`)

- `turismo/moteis` · `turismo/hoteis` · `turismo/pousadas`
- `bem-estar/beleza` · `bem-estar/cultura` · `bem-estar/saude` · `bem-estar/horoscopo` · `bem-estar/contos`
- `vida-noturna/locais` · `vida-noturna/vinhos` · `vida-noturna/charutos`
- `gastronomia/culinaria` · `gastronomia/arte` · `gastronomia/sabor`

> Cada matéria publicada com um desses paths aparece automaticamente na editoria correspondente do site.

---

## 🧪 Como saber se está funcionando?

- Abra https://8um1375u.api.sanity.io/v2024-01-01/data/query/production?query=*[_type==%22article%22]
- Se ver `"result": [ … sua matéria … ]` → tudo certo!
- Se vier `"result": []` → o site continua mostrando o mock (mas continua online).

Qualquer dúvida me chame. ✨
