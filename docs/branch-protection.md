# Evidência de proteção da branch main

Configuração aplicada no repositório `Artur-Falavinha/projeto_individual_curriculo_online` em 07/06/2026 via GitHub API.

Endpoint consultado:

```text
GET /repos/Artur-Falavinha/projeto_individual_curriculo_online/branches/main/protection
```

Resumo da regra ativa:

- `required_status_checks.strict`: `true`
- Status check obrigatório: `Lint e build`
- Pull Request obrigatório antes do merge: `true`
- Aprovações obrigatórias: `0`
- Aplicar regra para administradores: `true`
- Force push permitido: `false`
- Exclusão da branch permitida: `false`

Fluxo validado:

1. Alterações são feitas em branch secundária.
2. Pull Request é aberto contra `main`.
3. O workflow `CI/CD` executa lint e build.
4. O merge só é permitido após o check `Lint e build` ficar verde.
