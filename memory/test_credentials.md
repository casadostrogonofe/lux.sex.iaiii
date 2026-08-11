# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## Admin API Key (banners CRUD)
- Header: `X-Admin-Key`
- Value: não versionado; ler `ADMIN_API_KEY` do ambiente de teste autorizado.
- Stored in `/app/backend/.env` as `ADMIN_API_KEY` apenas no ambiente local e no secret manager do deploy.
- Required for POST/PUT/DELETE `/api/banners`; GET remains public.

## No user login system
The site is public (age-gate overlay only, no accounts).

## MongoDB Atlas
- Credencial rotacionada e validada em 09/Ago/2026.
- A URI atual fica somente em variáveis de ambiente (`backend/.env` local e `MONGO_URL` no Vercel); o valor não é registrado neste arquivo por segurança.
- Banco de produção: `luxsex`.

## Sanity bootstrap
- Tokens Editor temporários foram usados somente em memória para criar `siteSettings` e **não estão armazenados no repositório**.
- Revogar os tokens temporários após esta entrega; o frontend lê o dataset publicado sem token.
