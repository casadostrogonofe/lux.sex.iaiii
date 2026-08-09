# Regra obrigatória para `main`

Configure em **Settings → Rules → Rulesets**:

1. alvo: branch `main`;
2. bloquear force push e exclusão;
3. exigir Pull Request e ao menos uma aprovação;
4. dispensar aprovação quando houver novos commits;
5. exigir revisão de `CODEOWNERS`;
6. exigir conversas resolvidas e branch atualizada;
7. exigir checks: `policy`, `gitleaks`, `frontend-quality`, `backend-quality`, `e2e`;
8. não permitir bypass, exceto conta de recuperação documentada;
9. Vercel deve produzir Preview na PR e Production somente após merge na `main`.

O GitHub não permite versionar a ativação do Ruleset no próprio repositório; o arquivo documenta a configuração que deve ser aplicada uma vez por Owner.