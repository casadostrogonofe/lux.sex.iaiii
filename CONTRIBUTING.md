# Contribuindo com o Lux.Sex

Este arquivo define regras obrigatórias para pessoas, agentes e automações. Ele é protegido por `CODEOWNERS` e só pode ser alterado por uma Pull Request de governança, vinculada a uma Issue e aprovada pelo responsável do repositório.

## 1. Fluxo de trabalho obrigatório

### Antes de escrever código

1. Crie uma Issue para **toda** correção, melhoria, nova função, refatoração ou mudança de infraestrutura.
2. Use o template adequado e informe:
   - contexto/problema;
   - escopo e fora de escopo;
   - riscos;
   - critérios de aceite verificáveis;
   - plano de testes e observabilidade.
3. Crie uma branch a partir da `main` atualizada:
   - `fix/<issue>-descricao`;
   - `feat/<issue>-descricao`;
   - `chore/<issue>-descricao`.

### Pull Request e deploy

- Todo deploy ocorre por Pull Request. Commit ou push direto na `main` é proibido.
- O corpo da PR deve conter `Closes #N`, `Fixes #N` ou `Resolves #N`.
- Uma PR sem Issue vinculada falha no job `policy`.
- A PR deve listar os critérios de aceite e evidências de teste.
- O merge exige todos os checks verdes e revisão obrigatória de `CODEOWNERS`.
- `CONTRIBUTING.md`, `.github/**`, regras de segurança e observabilidade exigem revisão do responsável do repositório.
- O GitHub deve proteger a `main`: exigir PR, conversa resolvida, branch atualizada, revisão de Code Owner e os checks `policy`, `gitleaks`, `frontend-quality`, `backend-quality` e `e2e`.

### Segredos

- Gitleaks roda em toda PR. Nunca commite DSNs, tokens, senhas, chaves, URIs autenticadas ou arquivos `.env`.
- DSN/token Sentry, MongoDB, Gemini, Sanity e chaves administrativas ficam apenas em GitHub Secrets, Vercel Environment Variables ou `.env` local ignorado.
- Use os arquivos `.env.example` somente com nomes e valores vazios.
- Se um segredo aparecer no Git, rotacione-o imediatamente; apagar o arquivo não remove o histórico.

## 2. Motion e UX obrigatórios

Referência oficial: [Design Motion Principles](https://github.com/kylezantos/design-motion-principles). O link legado `kylezantos/design-principles` foi substituído pelo repositório acima.

### Princípios

- **Utilidade antes de decoração:** pergunte se a animação melhora orientação, continuidade ou feedback. Não anime por padrão.
- **Polimento sutil:** evite spring elástico em ações utilitárias, `scale(0)`, blur excessivo, pulso constante, hover-scale em tudo, stagger repetitivo e fade uniforme em conteúdo estático.
- **Tokens únicos:** use `--motion-fast` (150ms), `--motion-standard` (220ms) e `--motion-slow` (300ms), com easing explícito.
- **Entrada e saída:** conteúdo condicional relevante deve preservar continuidade com `AnimatePresence` ou transição CSS equivalente.
- **Acessibilidade:** toda animação deve respeitar `prefers-reduced-motion`; a experiência reduzida permanece completa e sem movimento essencial.
- **Performance:** anime `opacity` e `transform`; evite animar layout, filtros caros ou propriedades que provoquem reflow contínuo.

### Estados assíncronos

Toda interface que busca ou processa dados deve implementar:

- **loading:** skeleton estável, sem deslocamento de layout;
- **erro:** mensagem acionável e tentativa novamente quando segura;
- **vazio:** estado explícito, sem confundir ausência com falha;
- **sucesso:** entrada sutil e feedback acessível;
- **progresso:** percentual apenas quando o total é conhecido. Streaming mostra conteúdo recebido/estado real, nunca barra ou número fictício.

Rotas são lazy-loaded. Novas páginas devem usar o boundary global ou um boundary local mais específico.

## 3. Qualidade e observabilidade

### Sentry + OpenTelemetry

- Sentry é a única plataforma de APM. Não adicione Datadog, New Relic, Jaeger exporter ou outro APM.
- Frontend: `@sentry/react`; backend: `sentry-sdk` + `OTLPIntegration`, instrumentação FastAPI e PyMongo.
- `sendDefaultPii=false`; headers, cookies, bodies, query strings, e-mails, Bearer tokens e URIs Mongo são removidos/mascarados.
- Não registre documentos Mongo completos, prompts, nomes, datas de nascimento ou conteúdo pessoal.
- No Sentry, configure retenção de erros, traces e logs para **90 dias**, RBAC por menor privilégio e token CI dedicado.
- Session Replay fica desabilitado por padrão.

### Lint e código morto

Execute no diretório `frontend`:

```bash
yarn biome check src
yarn knip
```

Biome é o lint principal para JS/JSX; Knip detecta arquivos, exports e dependências não utilizados. Arch-contract só entra com justificativa arquitetural aprovada. Commitlint e Stryker não fazem parte do padrão.

### Testes e cobertura

- Unitários/componentes: Vitest + Testing Library.
- Integração backend: Pytest.
- E2E: Playwright.
- Cobertura: Codecov.
- Meta global: **80%**. A adoção é gradual: o baseline total não pode cair e cada PR deve buscar 80% no código alterado.

Comandos locais:

```bash
cd frontend
yarn vitest run --coverage
yarn playwright test
yarn build

cd ../
pytest backend/tests/test_vercel_horoscope.py backend/tests/test_observability.py --cov=backend
```

## 4. Definition of Done

Uma tarefa só está pronta quando:

- Issue e critérios de aceite existem;
- PR contém `Closes #N`;
- nenhum segredo foi adicionado;
- loading, erro, vazio, sucesso e reduced motion foram avaliados;
- logs não contêm PII;
- testes unitários/integração/E2E foram adicionados ou atualizados;
- lint, Knip, testes, cobertura e build passam;
- documentação e variáveis de ambiente foram atualizadas;
- evidência pós-deploy confirma `/api/health` e o fluxo alterado.