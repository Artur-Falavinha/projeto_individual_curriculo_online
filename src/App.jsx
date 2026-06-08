import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Accessibility,
  Atom,
  Briefcase,
  Braces,
  ChevronRight,
  Database,
  FileCode2,
  GitBranch,
  GitPullRequest,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Palette,
  SquareTerminal,
  Workflow,
} from 'lucide-react';
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

function LinkInterno({ rota, children, className, ...propriedades }) {
  return (
    <a className={className} href={criarHref(rota)} {...propriedades}>
      {children}
    </a>
  );
}

function BreadcrumbRota({ rota, rotulo }) {
  return (
    <nav className="breadcrumb-rota" aria-label="breadcrumb">
      <ol>
        <li>
          <LinkInterno rota="inicio" className="breadcrumb-rota__link" aria-label="Início">
            <Home size={16} strokeWidth={2} />
          </LinkInterno>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={14} strokeWidth={2} />
        </li>
        <li>
          <span>{rotulo ?? rota}</span>
        </li>
      </ol>
    </nav>
  );
}

function CabecalhoRota({ rota, titulo, descricao, largura = 'estreita' }) {
  return (
    <header className={`rota-cabecalho rota-cabecalho--${largura}`}>
      <div className="rota-cabecalho__breadcrumb">
        <BreadcrumbRota rota={rota} rotulo={titulo} />
      </div>
      <h1 className="rota-titulo" id={`titulo-${rota}`}>
        {titulo}
      </h1>
      <p>{descricao}</p>
    </header>
  );
}

function TagRetro({ children }) {
  return <span className="tag-retro">{children}</span>;
}

const iconesFerramentas = {
  React: Atom,
  'HTML/CSS': Braces,
  'CSS responsivo': Braces,
  Acessibilidade: Accessibility,
  'Experiência de uso': Palette,
  'Node.js': Network,
  SQL: Database,
  Python: SquareTerminal,
  APIs: FileCode2,
  Git: GitBranch,
  GitHub: Github,
  'Pull Requests': GitPullRequest,
  'CI/CD': Workflow,
};

function IconeFerramenta({ nome }) {
  const Icone = iconesFerramentas[nome] ?? FileCode2;

  return <Icone size={22} strokeWidth={1.8} />;
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

function Sobre() {
  const caminhoFoto = `${basePublica}${curriculo.foto.replace(/^\//, '')}`.replace(/\/{2,}/g, '/');

  return (
    <section className="pagina pagina-rota pagina-rota--estreita" aria-labelledby="titulo-sobre">
      <CabecalhoRota
        rota="about"
        titulo="Sobre mim"
        descricao="Currículo online com foco em desenvolvimento full stack, interfaces web e organização de entrega."
      />

      <article className="perfil-retro">
        <a className="perfil-retro__avatar" href={curriculo.linkedin} target="_blank" rel="noreferrer">
          <img src={caminhoFoto} alt="Foto de Artur Lachoman Falavinha" />
        </a>
        <div className="perfil-retro__conteudo">
          <p className="eyebrow-retro">full stack developer</p>
          <h2>{curriculo.nome}</h2>
          <p>{curriculo.localizacao}</p>
          <div className="perfil-retro__tags">
            {curriculo.competencias.slice(1, 5).map((competencia) => (
              <TagRetro key={competencia}>{competencia}</TagRetro>
            ))}
          </div>
        </div>
      </article>

      <div className="prosa-retro">
        <p>{curriculo.resumo}</p>
        <p>
          Trabalho com uma stack direta para web: React no front-end, Node.js no back-end, SQL para dados,
          Python para automações e Git/GitHub para versionamento.
        </p>
      </div>

      <section className="secao-retro" aria-labelledby="titulo-habilidades">
        <h2 id="titulo-habilidades" className="secao-retro__titulo">
          Habilidades &amp; Tecnologias
        </h2>
        <div className="grade-habilidades-retro">
          {[
            ['// Frontend', ['React', 'Componentização', 'CSS responsivo', 'Acessibilidade']],
            ['// Backend', ['Node.js', 'APIs', 'Python', 'SQL']],
            ['// Ferramentas & DevOps', ['Git', 'GitHub', 'Pull Requests', 'CI/CD']],
            ['// Qualidade', ['Código limpo', 'Versionamento', 'Documentação', 'Deploy']],
          ].map(([titulo, itens]) => (
            <article className="habilidade-retro" key={titulo}>
              <h3>{titulo}</h3>
              <div>
                {itens.map((item) => (
                  <TagRetro key={item}>{item}</TagRetro>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="secao-retro" aria-labelledby="titulo-experiencia">
        <h2 id="titulo-experiencia" className="secao-retro__titulo">
          Experiência
        </h2>
        <div className="lista-retro">
          {curriculo.experiencia.map((experiencia) => (
            <article className="item-retro" key={experiencia.cargo}>
              <Briefcase size={20} strokeWidth={1.8} />
              <div>
                <div className="item-retro__topo">
                  <h3>{experiencia.cargo}</h3>
                  <span>{experiencia.periodo}</span>
                </div>
                <ul>
                  {experiencia.atividades.map((atividade) => (
                    <li key={atividade}>{atividade}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="secao-retro" aria-labelledby="titulo-formacao">
        <h2 id="titulo-formacao" className="secao-retro__titulo">
          Formação
        </h2>
        <div className="lista-retro">
          {curriculo.formacao.map((formacao) => (
            <article className="item-retro" key={formacao.curso}>
              <GraduationCap size={20} strokeWidth={1.8} />
              <div>
                <div className="item-retro__topo">
                  <h3>{formacao.curso}</h3>
                  <span>{formacao.periodo}</span>
                </div>
                <p>{formacao.instituicao}</p>
                <p>{formacao.detalhes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function Stack() {
  const categorias = [
    {
      titulo: 'Frontend',
      descricao: 'Interface, componentização e responsividade',
      itens: ['React', 'HTML/CSS', 'Acessibilidade', 'Experiência de uso'],
    },
    {
      titulo: 'Backend e Dados',
      descricao: 'APIs, automações e persistência',
      itens: ['Node.js', 'SQL', 'Python', 'APIs'],
    },
    {
      titulo: 'Fluxo de Entrega',
      descricao: 'Versionamento e publicação',
      itens: ['Git', 'GitHub', 'Pull Requests', 'CI/CD'],
    },
  ];

  return (
    <section className="pagina pagina-rota pagina-rota--larga" aria-labelledby="titulo-stack">
      <CabecalhoRota
        rota="stack"
        titulo="Stack"
        descricao="Ferramentas e práticas que uso para construir, versionar e publicar aplicações web."
        largura="larga"
      />

      <div className="lista-ferramentas-retro">
        {categorias.map((categoria) => (
          <section className="ferramentas-retro" key={categoria.titulo}>
            <div>
              <p>{categoria.titulo}</p>
              <span>{categoria.descricao}</span>
            </div>
            <div className="grade-ferramentas-retro">
              {categoria.itens.map((item) => (
                <article className="ferramenta-retro" key={item}>
                  <span>
                    <IconeFerramenta nome={item} />
                  </span>
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function Projetos() {
  return (
    <section className="pagina pagina-rota pagina-rota--estreita" aria-labelledby="titulo-projetos">
      <CabecalhoRota
        rota="projects"
        titulo="Projetos"
        descricao="Recortes de trabalho prático em interface, automação e publicação de aplicações."
      />

      <div className="lista-blog-retro">
        {curriculo.projetos.map((projeto) => (
          <article className="post-retro" key={projeto.nome}>
            <div className="post-retro__tags">
              {projeto.tecnologias.map((tecnologia) => (
                <TagRetro key={tecnologia}>{tecnologia}</TagRetro>
              ))}
            </div>
            <h2>{projeto.nome}</h2>
            <p>{projeto.descricao}</p>
            <a href={projeto.link} className="post-retro__link">
              Ver detalhes <ArrowUpRight size={14} strokeWidth={2} />
            </a>
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
      descricao: 'Vamos nos conectar profissionalmente.',
      valor: 'linkedin.com/in/artur-falavinha',
      href: curriculo.linkedin,
      Icone: Linkedin,
    },
    {
      nome: 'GitHub',
      descricao: 'Confira meus projetos e contribuições.',
      valor: 'github.com/Artur-Falavinha',
      href: curriculo.github,
      Icone: Github,
    },
    {
      nome: 'Email',
      descricao: 'Canal direto para conversas profissionais.',
      valor: 'Disponível mediante contato',
      href: criarHref('about'),
      Icone: Mail,
    },
    {
      nome: 'Localização',
      descricao: 'Baseado em Curitiba, Paraná.',
      valor: curriculo.localizacao,
      href: criarHref('about'),
      Icone: MapPin,
    },
  ];

  return (
    <section className="pagina pagina-rota pagina-rota--estreita" aria-labelledby="titulo-contato">
      <CabecalhoRota
        rota="contact"
        titulo="Contato"
        descricao="Quer conversar sobre tecnologia, projetos ou oportunidades? Estes são meus canais profissionais."
      />

      <address className="grade-contato-retro">
        {canais.map(({ nome, descricao, valor, href, Icone }) => (
          <a
            className="contato-retro"
            href={href}
            key={nome}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <Icone size={22} strokeWidth={1.8} />
            <span>
              <strong>{nome}</strong>
              <small>{descricao}</small>
              <em>{valor}</em>
            </span>
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
