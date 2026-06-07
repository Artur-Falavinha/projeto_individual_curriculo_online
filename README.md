# Currículo Online DS881

Projeto individual da disciplina DS881, desenvolvido como um currículo online estático com conteinerização, pipeline de CI/CD e publicação via GitHub Pages.

## Produção

Depois do deploy no GitHub Pages, atualize este link:

`https://SEU_USUARIO.github.io/ds881-curriculo-GRR99999999/`

## Tecnologias

- React com Vite para geração do site estático.
- Docker e Docker Compose para ambiente local isolado.
- ESLint para análise estática.
- GitHub Actions para lint, build e deploy no GitHub Pages.

## Execução local com Docker

Requisitos:

- Docker
- Docker Compose

Comandos:

```bash
docker compose up --build
```

A aplicação ficará disponível em:

`http://localhost:8080`

Para encerrar:

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

## Governança de Git

O fluxo adotado para o projeto deve seguir:

1. Criar branches secundárias para alterações, por exemplo `feat/curriculo-online`.
2. Usar mensagens de commit no padrão Conventional Commits.
3. Abrir Pull Request para integrar alterações na `main`.
4. Exigir pipeline verde antes do merge.
5. Manter a branch `main` protegida.

## Proteção da branch main

Configuração recomendada no GitHub:

- Acessar `Settings > Branches > Add branch ruleset`.
- Definir o alvo como `main`.
- Ativar bloqueio de push direto.
- Exigir status checks antes de merge.
- Selecionar o check `Lint e build`.
- Salvar a regra.

Adicione aqui o print da configuração aplicada no GitHub antes da entrega:

`docs/branch-protection.png`

## Personalização do currículo

As informações exibidas no site ficam centralizadas em:

`src/dados/curriculo.js`

Edite esse arquivo para ajustar nome, resumo, projetos, formação, experiência, contatos e links.
