# 🟣 Manual do Editor — Sanity CMS Lux Novo

Este painel controla TUDO do site:
- 📰 **Matérias** (Turismo, Bem Estar, Vida Noturna, Gastronomia)
- 💎 **Publicidade** (banners em todos os tamanhos)
- 🤝 **Parceiros** (logos na lateral das matérias)

---

## ⚡ Setup inicial (uma única vez)

### 1. Criar o Studio local

No Mac, abra o Terminal e rode:

```bash
cd ~/Desktop
npm create sanity@latest -- --project 8um1375u --dataset production --template clean --typescript false
```

Aceite os defaults. Quando terminar:

```bash
cd lux-novo   # ou o nome que você deu
```

### 2. Colar os schemas

Abra a pasta `schemaTypes/` no Finder ou editor. Apague o que estiver lá e copie estes 4 arquivos do projeto Lux Novo (estão em `/app/sanity-schemas/`):

- `article.js`
- `ad.js`
- `partner.js`
- `index.js`

### 3. Liberar CORS

Acesse https://www.sanity.io/manage/project/8um1375u → **API → CORS Origins → Add CORS origin**

Adicione (Allow credentials: ✓):
- `https://premium-space-2.preview.emergentagent.com`
- `http://localhost:3000`
- `http://localhost:3333`

### 4. Rodar o Studio

```bash
npm run dev
```

Abre em `http://localhost:3333`. Pronto, painel rodando! 🎉

### 5. (Opcional) Deploy do Studio

Para ter o painel online sem precisar rodar o Mac:

```bash
npx sanity deploy
```

Escolha um subdomínio (ex: `luxnovo`). Acesse depois em `https://luxnovo.sanity.studio`.

---

## 📰 Como publicar uma matéria

1. Studio → clique em **"Matéria" → Create**
2. Preencha:
   - **Título** — ex: "Os Novos Speakeasies de SP"
   - **Slug** — gera sozinho ao clicar "Generate"
   - **Editoria (path)** — escolha da lista (ex: `vida-noturna/locais`)
   - **Chamada / Resumo** — frase curta que aparece no card (até 280 caracteres)
   - **Imagem de capa** — upload (recomendado 1600×900px). Usada como capa **quando não houver vídeo**.
   - 🎥 **Vídeo de capa (link)** — cola URL do YouTube, Vimeo ou .mp4 direto. Aparece como hero da matéria.
   - 🎥 **Vídeo de capa (upload)** — alternativa: faz upload de .mp4/.webm. **Se preencher os dois, o upload tem prioridade.**
   - **Corpo** — escreva o texto com formatação rica (h2, h3, negrito, links, imagens no meio)
   - **Autor** — ex: "Marina Rezende"
   - **Publicado em** — data de publicação (deixa hoje por padrão)
   - **Tempo de leitura (min)** — ex: 8
   - **Destacar em capa** — ✓ se quiser que apareça em destaque na editoria
   - **Conteúdo adulto** — ✓ apenas para Contos Eróticos
3. Clique em **Publish** (botão verde no rodapé)
4. Abra o site → atualize a página → a matéria aparece na editoria e no feed da home
5. 🌍 **Tradução automática**: se um visitante mudar o idioma (EN/ES/IT/FR/DE), o site **traduz o título, chamada e corpo via IA Gemini** uma única vez e mantém em cache. Não precisa fazer nada manualmente.

> **Atualizou a matéria?** O cache de tradução é invalidado automaticamente — a próxima visita em outro idioma regenera com o conteúdo novo.

> **Dica**: se você desmarcar **Publish**, a matéria some do site sem ser apagada.

> **Schema atualizado**: se você criou o Studio antes de 26/Mai, substitua o `schemaTypes/article.js` pela versão mais recente em `/app/sanity-schemas/article.js` (agora com campos de vídeo) e rode `npx sanity deploy` para atualizar o painel.

---

## 💎 Como criar um banner publicitário

1. Studio → clique em **"Publicidade (Banner)" → Create**
2. Preencha:
   - **Nome interno** — ex: "Make Life Janeiro 2026"
   - **Formato** — escolha o tamanho IAB (Outdoor 970×250, Retângulo Médio 300×250, etc)
   - **Onde aparece no site** — escolha a posição:
     - **Sidebar de Parceiros**: pequeno banner na lateral direita das matérias
     - **Entre matérias da Timeline**: banner horizontal entre cards no feed da home
     - **Início da editoria**: faixa fina logo no topo da editoria
     - **Fim da editoria**: faixa antes do Newsletter
     - **Topo do Shop**: banner grande na vitrine
     - **Dentro da grade do Shop**: card entre as lojas
     - **Lifestyle · destaque grande**: card editorial com imagem
   - **Imagem do banner** — upload (peça já no formato escolhido)
   - **Anunciante** — ex: "Velvet Noire"
   - **Título** — texto que aparece sobre/ao lado do banner
   - **Descrição curta** — 1 ou 2 linhas
   - **Texto do botão (CTA)** — ex: "Comprar agora", "Saber mais", "Reservar"
   - **Link de destino** — URL completa (com https://)
   - **Prioridade** — 0 a 1000. Quanto maior, mais cedo aparece (use 100 para campanhas premium, 50 padrão)
   - **Começa em / Termina em** — opcionais (se preencher, o banner fica ativo só nesse período)
   - **Ativo** — ✓ para mostrar
3. Clique em **Publish**

> **Sem imagem?** O site coloca automaticamente uma imagem aleatória do pool. Mas o ideal é subir a peça no formato exato.

### Tabela de formatos disponíveis

| Formato | Tamanho | Onde usar bem |
|---|---|---|
| Outdoor | 970×250 | Topo de páginas grandes |
| Cabeçalho Grande | 970×90 | Faixa horizontal |
| Cabeçalho | 728×90 | Faixa horizontal padrão |
| Meia-página | 300×600 | Sidebars longas |
| Retângulo Médio | 300×250 | Sidebar / inline |
| Retângulo Grande | 336×280 | Sidebar / inline |
| Quadrado | 250×250 | Inline / Shop |
| Quadrado Pequeno | 200×200 | Sidebar |
| Banner | 468×60 | Faixa fina |
| Banner Grande Mobile | 320×100 | Topo mobile |
| Cabeçalho Mobile | 320×50 | Topo mobile fino |
| Arranha-céu | 120×600 | Lateral fixa |
| Arranha-céu Largo | 160×600 | Lateral fixa larga |
| Retrato | 300×1050 | Lateral muito longa |
| Banner Vertical | 120×240 | Vertical pequeno |
| Botão | 125×125 | Quadrado mini |
| Meio-banner | 234×60 | Inline |
| Retângulo Pequeno | 180×150 | Inline |

---

## 🤝 Como adicionar um Parceiro Oficial (sidebar)

1. Studio → **"Parceiro (Sidebar)" → Create**
2. Preencha:
   - **Nome** — ex: "Make Life"
   - **Logo** — upload do logo (PNG transparente preferencial)
   - **Link de destino** — URL completa
   - **Cor de fundo do logo** — hex (ex: `#ffffff` ou `#1c4eaa`). Use uma cor que destaque o logo.
   - **Ativo** — ✓
   - **Ordem de exibição** — número (maior = mais alto na lista)
3. **Publish**

Parceiros aparecem na lateral direita de todas as páginas de matéria.

---

## 🎵 Som / Playlist

A playlist do SoundCloud é fixa (configurada uma vez no código). O player toca a playlist **inteira em loop** automaticamente. Ao final do último track, volta para o primeiro.

> Para trocar a playlist, é uma mudança no código — me chame.

---

## ❓ Perguntas frequentes

**Como retiro uma matéria do ar sem apagar?**
Abra a matéria → clique no menu "..." no topo → **Unpublish**. Para republicar depois, **Publish**.

**Como agendo um banner?**
Preencha **Começa em** e **Termina em**. O site mostra apenas no período.

**A imagem fica cortada estranho?**
Use o **hotspot**: no upload de imagem, clique na bolinha azul e arraste para o ponto principal da foto. O site usa esse ponto como centro do crop responsivo.

**Como vejo se está funcionando?**
Acesse https://8um1375u.api.sanity.io/v2024-01-01/data/query/production?query=*[_type==%22article%22]
Deve listar suas matérias.

**Editores podem editar sem rodar o terminal?**
Sim — depois que você fizer `npx sanity deploy` uma vez, qualquer pessoa convidada como **Editor** no projeto pode acessar via `https://luxnovo.sanity.studio` e publicar.

Convide editores em https://www.sanity.io/manage/project/8um1375u → **Members → Invite member** (papel: Editor).

---

## 🆘 Suporte

Schemas em `/app/sanity-schemas/` (article, ad, partner, index).
Service no frontend em `/app/frontend/src/sanity/` (articles, ads, client, queries).

Qualquer coisa me chame. ✨
