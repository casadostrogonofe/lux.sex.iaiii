# Test Credentials
# Agent writes here when creating/modifying auth credentials (admin accounts, test users).
# Testing agent reads this before auth tests. Fork/continuation agents read on startup.

## Admin API Key (banners CRUD)
- Header: `X-Admin-Key`
- Value: `51a2bc8844a60c5679d42b6e52a3f45f1ef17bde77bc3269`
- Stored in `/app/backend/.env` as `ADMIN_API_KEY`
- Required for POST/PUT/DELETE `/api/banners`; GET remains public.

## No user login system
The site is public (age-gate overlay only, no accounts).
