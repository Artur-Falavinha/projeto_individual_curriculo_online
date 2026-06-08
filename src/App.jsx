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
const fusoHorarioPortfolio = 'America/Sao_Paulo';
const cargosTypewriter = ['Full Stack Developer', 'React', 'Node.js', 'SQL', 'Python'];

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
        <div className="rodape__conteudo">
          <p>© 2026 arturfalavinha.dev.br</p>
          <nav className="rodape__links" aria-label="Links externos">
            <a className="retro-social-link" href={curriculo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <span className="retro-social-icon">
                <Github size={14} strokeWidth={2} />
              </span>
              <span>GitHub</span>
            </a>
            <a
              className="retro-social-link"
              href={curriculo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <span className="retro-social-icon">
                <Linkedin size={14} strokeWidth={2} />
              </span>
              <span>LinkedIn</span>
            </a>
        </nav>
        </div>
      </footer>
    </>
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

function formatarHorarioTerminal() {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: fusoHorarioPortfolio,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const obterParte = (tipo) => partes.find((parte) => parte.type === tipo)?.value ?? '';

  return `${obterParte('year')}-${obterParte('month')}-${obterParte('day')} ${obterParte('hour')}:${obterParte(
    'minute',
  )}:${obterParte('second')}`;
}

function RelogioTerminal() {
  const [horario, setHorario] = useState(formatarHorarioTerminal);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setHorario(formatarHorarioTerminal());
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, []);

  return (
    <span className="retro-terminal-time" aria-live="polite">
      {horario}
    </span>
  );
}

function TypewriterTerminal({ palavras }) {
  const [indicePalavra, setIndicePalavra] = useState(0);
  const [quantidadeCaracteres, setQuantidadeCaracteres] = useState(0);
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    const palavraAtual = palavras[indicePalavra];
    const fimDaEscrita = quantidadeCaracteres === palavraAtual.length;
    const inicioDaPalavra = quantidadeCaracteres === 0;
    const atraso = fimDaEscrita && !apagando ? 1300 : apagando ? 42 : 76;

    const timeout = window.setTimeout(() => {
      if (!apagando && fimDaEscrita) {
        setApagando(true);
        return;
      }

      if (apagando && inicioDaPalavra) {
        setApagando(false);
        setIndicePalavra((indiceAtual) => (indiceAtual + 1) % palavras.length);
        return;
      }

      setQuantidadeCaracteres((quantidadeAtual) => quantidadeAtual + (apagando ? -1 : 1));
    }, atraso);

    return () => window.clearTimeout(timeout);
  }, [apagando, indicePalavra, palavras, quantidadeCaracteres]);

  return (
    <span className="typewriter-terminal" aria-label={palavras[indicePalavra]}>
      <span>{palavras[indicePalavra].slice(0, quantidadeCaracteres)}</span>
      <span className="typewriter-terminal__cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}

function Inicio() {
  return (
    <section className="pagina pagina--inicio" aria-labelledby="titulo-inicio">
      <div className="inicio-retro">
        <article className="retro-terminal" aria-label="Apresentação profissional">
          <div className="retro-terminal-bar" aria-hidden="true">
            <span className="retro-terminal-btn retro-btn-close" />
            <span className="retro-terminal-btn retro-btn-min" />
            <span className="retro-terminal-btn retro-btn-max" />
            <span className="retro-terminal-title">artur@portfolio:~</span>
            <RelogioTerminal />
          </div>

          <div className="retro-terminal-body">
            <p className="retro-line">
              <span className="retro-prompt">$</span>
              <span className="retro-cmd"> whoami</span>
            </p>
            <p className="retro-output">Bem-vindo ao meu currículo online</p>

            <p className="retro-line">
              <span className="retro-prompt">$</span>
              <span className="retro-cmd"> cat hello.txt</span>
            </p>
            <h1 className="retro-terminal-heading" id="titulo-inicio">
              Olá, eu sou <span>Artur</span>
              <span className="retro-blink" aria-hidden="true">
                _
              </span>
            </h1>

            <div className="retro-typewriter" aria-label="Stack principal">
              <span className="retro-typewriter__prefix">//</span>
              <TypewriterTerminal palavras={cargosTypewriter} />
            </div>

            <p className="retro-line retro-line--bio">
              <span className="retro-prompt">$</span>
              <span className="retro-cmd"> cat bio.txt</span>
            </p>
            <p className="retro-bio">{curriculo.apresentacao}</p>

            <p className="retro-line retro-line--acoes">
              <span className="retro-prompt">$</span>
              <span className="retro-cmd"> ./connect.sh</span>
            </p>
            <div className="retro-terminal-actions">
              <LinkInterno rota="contact" className="retro-btn-primary">
                &gt; Entrar em contato
              </LinkInterno>
              <LinkInterno rota="about" className="retro-btn-secondary">
                &gt; Sobre mim
              </LinkInterno>
            </div>

            <p className="retro-line retro-line--cursor" aria-hidden="true">
              <span className="retro-prompt">$</span>
              <span className="retro-cursor-line" />
            </p>
          </div>
        </article>

        <div className="retro-meta" aria-label="Resumo rápido">
          <span>
            <strong>loc:</strong> Curitiba, PR · BR
          </span>
          <span>
            <strong>utc:</strong> -3
          </span>
          <span>
            <strong>status:</strong>{' '}
            <span className="retro-meta__status">
              <span className="retro-dot" aria-hidden="true" />
              disponível
            </span>
          </span>
          <span>
            <strong>stack:</strong> React · Node.js · SQL · Python
          </span>
        </div>
      </div>
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
