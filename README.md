# Currículo Online

Currículo online estático de Artur Lachoman Falavinha, publicado com GitHub Pages e estruturado com ambiente Docker, validação automatizada e fluxo de versionamento por Pull Request.

## Produção

https://artur-falavinha.github.io/projeto_individual_curriculo_online/

## Rotas

- `/` - apresentação em formato terminal.
- `/about` - resumo profissional, experiência e formação.
- `/stack` - stack atual e práticas de entrega.
- `/projects` - projetos e recortes de trabalho.
- `/contact` - canais de contato profissional.

## Tecnologias

- React com Vite para geração do site estático.
- Docker e Docker Compose para ambiente local isolado.
- ESLint para análise estática.
- GitHub Actions para lint, build e deploy no GitHub Pages.

## Execução local com Docker

Requisitos:

- Docker
- Docker Compose

Subir o ambiente:

```bash
docker compose up --build
```

A aplicação fica disponível em:

```text
http://localhost:8080
```

Encerrar o ambiente:

```bash
docker compose down
```

## Execução local sem Docker

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run lint
npm run build
npm run preview
```

O `postbuild` copia `dist/index.html` para `dist/404.html` para manter as rotas internas funcionando no GitHub Pages.

## Governança de Git

O projeto segue o fluxo:

1. Criar uma branch secundária para cada alteração.
2. Usar mensagens no padrão Conventional Commits.
3. Abrir Pull Request para integrar alterações na `main`.
4. Exigir o status check `Lint e build` antes do merge.
5. Manter a branch `main` protegida contra push direto.

## Proteção da branch main

Configuração aplicada no GitHub:

- Alvo da regra: branch `main`.
- Bloqueio de exclusão da branch.
- Bloqueio de force push.
- Pull Request obrigatório antes do merge.
- Status check obrigatório: `Lint e build`.
- Política de status check estrita para validar a branch atualizada antes do merge.

Evidência visual da regra:

`docs/branch-protection.png`
