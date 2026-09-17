# 🌟 Lux Sex IA III | Portal Editorial & Plataforma Multimídia

Uma plataforma web moderna, full-stack e altamente interativa que combina um portal de conteúdo editorial, player de áudio integrado, leituras astrológicas, e-commerce/marketplace e ferramentas baseadas em inteligência artificial.

---

## 🛠️ Tecnologias e Arquitetura

O projeto adota uma arquitetura desacoplada (Headless CMS + API Backend + Frontend SPA):

### **Frontend**
* **Framework:** React com suporte a roteamento dinâmico (`react-router-dom`).
* **Estilização:** Tailwind CSS e componentes customizados inspirados em design systems modernos.
* **Internacionalização (i18n):** Suporte nativo a múltiplos idiomas (`pt`, `en`, `es`, `fr`, `de`, `it`).
* **Gestão de Conteúdo:** Integração com **Sanity CMS** para artigos, banners, anúncios e perfis.
* **Qualidade e Testes:** Vitest, Testing Library e Playwright (E2E).

### **Backend**
* **Framework:** Python com **FastAPI** para alta performance e validação automática de dados.
* **Módulos de IA e Serviços:** Rotas dedicadas para tradução, geração de horóscopos, observabilidade e controle de taxa (*rate limiting*).
* **Segurança:** Configurações de CORS, validação de requisições e tratamento centralizado de erros.

### **Deploy e Infraestrutura**
* Configurado para deploy otimizado na **Vercel** (com rotas serverless para a API em Python e hospedagem estática para o frontend).

---

## 📂 Estrutura do Repositório

```text
├── api/                    # Rotas Serverless (compatíveis com Vercel / Python)
├── backend/                # API em FastAPI (routers de horóscopo, tradução, etc.)
│   ├── routers/            # Endpoints específicos da aplicação
│   └── tests/              # Testes automatizados do backend (Pytest)
├── frontend/               # Aplicação React
│   ├── src/
│   │   ├── components/     # Componentes de UI, players, banners e modais
│   │   ├── i18n/           # Arquivos de tradução multilíngue
│   │   ├── pages/          # Páginas principais (Home, Artigos, Horóscopo, Shop)
│   │   └── sanity/         # Clientes e queries de integração com o Sanity
└── sanity-schemas/         # Definições de schemas do Sanity CMS# Here are your Instructions
