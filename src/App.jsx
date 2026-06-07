import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { Cabecalho } from './componentes/Cabecalho.jsx';
import { FundoParticulas } from './componentes/FundoParticulas.jsx';
import { curriculo } from './dados/curriculo.js';

const basePublica = import.meta.env.BASE_URL;
const rotasPermitidas = new Set(['inicio', 'about', 'stack', 'projects', 'contact']);
const titulosRotas = {
  inicio: 'Terminal',
  about: 'Sobre',
  stack: 'Stack',
  projects: 'Projetos',
  contact: 'Contato',
};

function criarHref(rota = 'inicio') {
  const caminho = rota === 'inicio' ? '' : rota;
  return `${basePublica}${caminho}`.replace(/\/{2,}/g, '/');
}

function obterRotaPeloCaminho(caminho) {
  let caminhoLocal = caminho;

  if (basePublica !== '/' && caminhoLocal.startsWith(basePublica)) {
    caminhoLocal = caminhoLocal.slice(basePublica.length);
  } else {
    caminhoLocal = caminhoLocal.replace(/^\//, '');
  }

  const rota = caminhoLocal.replace(/^\/+|\/+$/g, '') || 'inicio';
  return rotasPermitidas.has(rota) ? rota : 'inicio';
}

function obterRotaAtual() {
  if (typeof window === 'undefined') {
    return 'inicio';
  }

  return obterRotaPeloCaminho(window.location.pathname);
}

function LinkInterno({ rota, children, className }) {
  return (
    <a className={className} href={criarHref(rota)}>
      {children}
    </a>
  );
}

function AppShell({ children, rotaAtual }) {
  return (
    <>
      <FundoParticulas />
      <Cabecalho curriculo={curriculo} rotaAtual={rotaAtual} />
      <main className="conteudo">{children}</main>
      <footer className="rodape">
        <span>© 2026 arturfalavinha.dev</span>
        <nav aria-label="Links externos">
          <a href={curriculo.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={curriculo.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </footer>
    </>
  );
}

function TerminalComando({ comando, children }) {
  return (
    <div className="terminal__bloco">
      <p className="terminal__comando">$ {comando}</p>
      <div className="terminal__resposta">{children}</div>
    </div>
  );
}

function CursorTerminal({ className = '' }) {
  return <span className={`cursor-terminal ${className}`.trim()} aria-hidden="true" />;
}

function TituloComCursor({ children, id }) {
  return (
    <h1 id={id}>
      {children}
      <CursorTerminal className="cursor-terminal--titulo" />
    </h1>
  );
}

function Inicio() {
  return (
    <section className="pagina pagina--inicio" aria-labelledby="titulo-inicio">
      <div className="status-global">
        <span>arturfalavinha.dev — full stack developer · curitiba/pr</span>
        <strong>available for projects</strong>
      </div>

      <article className="terminal" aria-label="Apresentação profissional">
        <p className="terminal__prompt">artur@portfolio:~</p>

        <TerminalComando comando="whoami">
          <p>{curriculo.nome}</p>
        </TerminalComando>

        <TerminalComando comando="cat hello.txt">
          <TituloComCursor id="titulo-inicio">Full Stack Developer</TituloComCursor>
        </TerminalComando>

        <TerminalComando comando="cat bio.txt">
          <p>{curriculo.apresentacao}</p>
        </TerminalComando>

        <TerminalComando comando="./connect.sh">
          <div className="terminal__acoes">
            <LinkInterno rota="contact" className="link-terminal">
              &gt; Entrar em contato
            </LinkInterno>
            <LinkInterno rota="about" className="link-terminal">
              &gt; Sobre mim
            </LinkInterno>
          </div>
        </TerminalComando>

        <p className="terminal__cursor">$</p>
      </article>

      <dl className="resumo-rapido">
        <div>
          <dt>loc</dt>
          <dd>{curriculo.localizacao.replace(', Brasil', ' · BR')}</dd>
        </div>
        <div>
          <dt>status</dt>
          <dd>{curriculo.status}</dd>
        </div>
        <div>
          <dt>stack</dt>
          <dd>{curriculo.competencias.join(' · ')}</dd>
        </div>
      </dl>
    </section>
  );
}

function CabecalhoPagina({ rota, titulo, descricao, tituloId }) {
  return (
    <header className="pagina__cabecalho">
      <p className="breadcrumb">
        <LinkInterno rota="inicio">home</LinkInterno>
        <span>/</span>
        <span>{rota}</span>
      </p>
      <TituloComCursor id={tituloId}>{titulo}</TituloComCursor>
      <p>{descricao}</p>
    </header>
  );
}

function Sobre() {
  return (
    <section className="pagina" aria-labelledby="titulo-sobre">
      <CabecalhoPagina
        rota="about"
        titulo="Sobre mim"
        tituloId="titulo-sobre"
        descricao="Currículo online com foco em desenvolvimento full stack, interfaces web e organização de entrega."
      />

      <div className="grade-sobre">
        <article className="painel-texto painel-texto--principal">
          <p>{curriculo.resumo}</p>
          <p>
            Trabalho com uma stack direta para web: React no front-end, Node.js no back-end, SQL para dados,
            Python para automações e Git/GitHub para versionamento.
          </p>
        </article>

        <aside className="painel-lista" aria-labelledby="titulo-idiomas">
          <h2 id="titulo-idiomas">Idiomas</h2>
          <ul>
            {curriculo.idiomas.map((idioma) => (
              <li key={idioma.idioma}>
                <span>{idioma.idioma}</span>
                <strong>{idioma.nivel}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="linha-editorial">
        <section aria-labelledby="titulo-experiencia">
          <h2 id="titulo-experiencia">Experiência</h2>
          {curriculo.experiencia.map((experiencia) => (
            <article className="item-linha" key={experiencia.cargo}>
              <span>{experiencia.periodo}</span>
              <h3>{experiencia.cargo}</h3>
              <ul>
                {experiencia.atividades.map((atividade) => (
                  <li key={atividade}>{atividade}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section aria-labelledby="titulo-formacao">
          <h2 id="titulo-formacao">Formação</h2>
          {curriculo.formacao.map((formacao) => (
            <article className="item-linha" key={formacao.curso}>
              <span>{formacao.periodo}</span>
              <h3>{formacao.curso}</h3>
              <p>{formacao.instituicao}</p>
              <p>{formacao.detalhes}</p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

function Stack() {
  const categorias = [
    {
      titulo: 'Base atual',
      itens: curriculo.competencias,
    },
    {
      titulo: 'Frontend',
      itens: ['React', 'Componentização', 'CSS responsivo', 'Acessibilidade'],
    },
    {
      titulo: 'Backend e dados',
      itens: ['Node.js', 'SQL', 'APIs', 'Python'],
    },
    {
      titulo: 'Fluxo de entrega',
      itens: ['Git', 'GitHub', 'Pull Requests', 'CI/CD'],
    },
  ];

  return (
    <section className="pagina" aria-labelledby="titulo-stack">
      <CabecalhoPagina
        rota="stack"
        titulo="Stack atual"
        tituloId="titulo-stack"
        descricao="Ferramentas e práticas que uso para construir, versionar e publicar aplicações web."
      />

      <div className="grade-stack">
        {categorias.map((categoria, indiceCategoria) => (
          <article className="cartao-stack" key={categoria.titulo}>
            <span>{String(indiceCategoria + 1).padStart(2, '0')}</span>
            <h2>{categoria.titulo}</h2>
            <ul>
              {categoria.itens.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projetos() {
  return (
    <section className="pagina" aria-labelledby="titulo-projetos">
      <CabecalhoPagina
        rota="projects"
        titulo="Projetos"
        tituloId="titulo-projetos"
        descricao="Recortes de trabalho prático em interface, automação e publicação de aplicações."
      />

      <div className="lista-projetos">
        {curriculo.projetos.map((projeto, indiceProjeto) => (
          <article className="projeto" key={projeto.nome}>
            <span className="projeto__indice">{String(indiceProjeto + 1).padStart(2, '0')}</span>
            <div>
              <h2>{projeto.nome}</h2>
              <p>{projeto.descricao}</p>
            </div>
            <ul>
              {projeto.tecnologias.map((tecnologia) => (
                <li key={tecnologia}>{tecnologia}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contato() {
  const canais = [
    {
      nome: 'LinkedIn',
      valor: 'linkedin.com/in/artur-falavinha',
      href: curriculo.linkedin,
      Icone: Linkedin,
    },
    {
      nome: 'GitHub',
      valor: 'github.com/Artur-Falavinha',
      href: curriculo.github,
      Icone: Github,
    },
    {
      nome: 'Localização',
      valor: curriculo.localizacao,
      href: criarHref('about'),
      Icone: MapPin,
    },
  ];

  return (
    <section className="pagina" aria-labelledby="titulo-contato">
      <CabecalhoPagina
        rota="contact"
        titulo="Contato"
        tituloId="titulo-contato"
        descricao="Canais para acompanhar meu trabalho e iniciar uma conversa profissional."
      />

      <address className="grade-contato">
        {canais.map(({ nome, valor, href, Icone }) => (
          <a
            className="cartao-contato"
            href={href}
            key={nome}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <Icone size={20} strokeWidth={1.8} />
            <span>{nome}</span>
            <strong>{valor}</strong>
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        ))}
      </address>
    </section>
  );
}

export function App() {
  const [rotaAtual, setRotaAtual] = useState(obterRotaAtual);

  const paginaAtual = useMemo(() => {
    const paginas = {
      inicio: <Inicio />,
      about: <Sobre />,
      stack: <Stack />,
      projects: <Projetos />,
      contact: <Contato />,
    };

    return paginas[rotaAtual] ?? paginas.inicio;
  }, [rotaAtual]);

  useEffect(() => {
    document.title =
      rotaAtual === 'inicio'
        ? `${curriculo.nome} | ${curriculo.titulo}`
        : `${titulosRotas[rotaAtual]} | ${curriculo.nome}`;
  }, [rotaAtual]);

  useEffect(() => {
    function atualizarRota() {
      setRotaAtual(obterRotaAtual());
    }

    function interceptarNavegacao(evento) {
      const link = evento.target.closest('a[href]');

      if (!link || link.target || link.origin !== window.location.origin) {
        return;
      }

      const rotaDestino = obterRotaPeloCaminho(link.pathname);

      if (!rotasPermitidas.has(rotaDestino)) {
        return;
      }

      evento.preventDefault();
      window.history.pushState({}, '', link.href);
      setRotaAtual(rotaDestino);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.addEventListener('popstate', atualizarRota);
    document.addEventListener('click', interceptarNavegacao);

    return () => {
      window.removeEventListener('popstate', atualizarRota);
      document.removeEventListener('click', interceptarNavegacao);
    };
  }, []);

  return <AppShell rotaAtual={rotaAtual}>{paginaAtual}</AppShell>;
}
