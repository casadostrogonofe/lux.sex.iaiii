# Observabilidade — Sentry + OpenTelemetry

## Arquitetura

- Um único projeto Sentry recebe eventos do React e do FastAPI.
- React usa `@sentry/react` com Browser Tracing, sem Session Replay e sem PII padrão.
- FastAPI usa `sentry-sdk` com `OTLPIntegration`, `FastAPIInstrumentor` e `PymongoInstrumentor`.
- `/api/health` valida a disponibilidade do MongoDB sem retornar host, credenciais ou detalhes internos.
- E-mails, Bearer tokens, URIs Mongo, headers, cookies, bodies e query strings são mascarados antes do envio.

## Variáveis Vercel

Configure em Production, Preview e Development:

```text
SENTRY_DSN
SENTRY_ENVIRONMENT
SENTRY_RELEASE
REACT_APP_SENTRY_DSN
REACT_APP_SENTRY_ENVIRONMENT
REACT_APP_SENTRY_RELEASE
REACT_APP_SOUNDCLOUD_URL
```

O DSN pode ser o mesmo nos dois SDKs, conforme decisão do projeto. Valores nunca entram no Git.

## GitHub Secrets

```text
SENTRY_AUTH_TOKEN
SENTRY_ORG
SENTRY_PROJECT
CODECOV_TOKEN
```

O token Sentry deve pertencer a uma conta técnica, ter apenas os escopos necessários para releases e nunca ser reutilizado por uma pessoa.

## Configuração manual obrigatória no Sentry

1. Retenção de erros, traces e logs: **90 dias**.
2. RBAC por menor privilégio:
   - Owner: administração e cobrança;
   - Manager: regras/alertas;
   - Developer: investigação e releases;
   - Viewer: leitura.
3. Desabilitar armazenamento de IP quando disponível.
4. Não enviar request bodies, headers de autenticação, cookies ou parâmetros pessoais.
5. Criar alertas para aumento de erro 5xx, falha de `/api/health` e regressão de performance do horóscopo.

Retenção e RBAC são políticas da conta Sentry e não podem ser impostas pelo código do repositório; o Owner deve confirmá-las após criar os membros.

## Verificação pós-deploy

```bash
curl -fsS https://SEU_DOMINIO/api/health
curl -fsS "https://SEU_DOMINIO/api/horoscope/daily?sign=aries&lang=pt"
```

No Sentry, confirme eventos/traces com `environment=production` e o release do SHA publicado, sem PII.