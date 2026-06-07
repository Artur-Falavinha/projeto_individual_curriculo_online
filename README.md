# Curriculo Online DS881

Projeto individual da disciplina DS881, desenvolvido como um curriculo online estatico com conteinerizacao, pipeline de CI/CD e publicacao via GitHub Pages.

## Producao

Depois do deploy no GitHub Pages, atualize este link:

`https://SEU_USUARIO.github.io/ds881-curriculo-GRR99999999/`

## Tecnologias

- React com Vite para geracao do site estatico.
- Docker e Docker Compose para ambiente local isolado.
- ESLint para analise estatica.
- GitHub Actions para lint, build e deploy no GitHub Pages.

## Execucao local com Docker

Requisitos:

- Docker
- Docker Compose

Comandos:

```bash
docker compose up --build
```

A aplicacao ficara disponivel em:

`http://localhost:8080`

Para encerrar:

```bash
docker compose down
```

## Execucao local sem Docker

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

## Governanca de Git

O fluxo adotado para o projeto deve seguir:

1. Criar branches secundarias para alteracoes, por exemplo `feat/curriculo-online`.
2. Usar mensagens de commit no padrao Conventional Commits.
3. Abrir Pull Request para integrar alteracoes na `main`.
4. Exigir pipeline verde antes do merge.
5. Manter a branch `main` protegida.

## Protecao da branch main

Configuracao recomendada no GitHub:

- Acessar `Settings > Branches > Add branch ruleset`.
- Definir o alvo como `main`.
- Ativar bloqueio de push direto.
- Exigir status checks antes de merge.
- Selecionar o check `Lint e build`.
- Salvar a regra.

Adicione aqui o print da configuracao aplicada no GitHub antes da entrega:

`docs/branch-protection.png`

## Personalizacao do curriculo

As informacoes exibidas no site ficam centralizadas em:

`src/dados/curriculo.js`

Edite esse arquivo para ajustar nome, resumo, projetos, formacao, experiencia, contatos e links.
