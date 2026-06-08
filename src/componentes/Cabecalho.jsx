import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const chaveTema = 'theme';

function obterTemaInicial() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const temaSalvo = window.localStorage.getItem(chaveTema);

  if (temaSalvo === 'dark' || temaSalvo === 'light') {
    return temaSalvo;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function aplicarTema(tema) {
  document.documentElement.classList.toggle('dark', tema === 'dark');
  window.localStorage.setItem(chaveTema, tema);
}

export function Cabecalho({ curriculo, rotaAtual }) {
  const base = import.meta.env.BASE_URL;
  const [tema, setTema] = useState(obterTemaInicial);
  const [menuAberto, setMenuAberto] = useState(false);
  const itensNavegacao = [
    ['about', 'Sobre'],
    ['stack', 'Stack'],
    ['projects', 'Projetos'],
    ['contact', 'Contato'],
  ];

  const criarHref = (rota = '') => `${base}${rota}`.replace(/\/{2,}/g, '/');
  const estaEscuro = tema === 'dark';

  useEffect(() => {
    aplicarTema(tema);
  }, [tema]);

  useEffect(() => {
    setMenuAberto(false);
  }, [rotaAtual]);

  function alternarTema() {
    setTema((temaAtual) => (temaAtual === 'dark' ? 'light' : 'dark'));
  }

  return (
    <header className="cabecalho retro-header">
      <nav className="cabecalho__nav" aria-label="Navegação principal">
        <a className="marca retro-brand" href={criarHref()} aria-current={rotaAtual === 'inicio' ? 'page' : undefined}>
          Artur Falavinha
          <span className="marca__cursor cursor-terminal" aria-hidden="true" />
        </a>

        <span className="cabecalho__divisor retro-divider" aria-hidden="true">
          │
        </span>

        <ul className="navegacao navegacao--desktop">
          {itensNavegacao.map(([rota, rotulo]) => (
            <li key={rota}>
              <a className="retro-nav-link" href={criarHref(rota)} aria-current={rotaAtual === rota ? 'page' : undefined}>
                {rotulo}
              </a>
            </li>
          ))}
        </ul>

        <div className="cabecalho__espaco" aria-hidden="true" />

        <div className="cabecalho__controles">
          <div className="cabecalho__controle">
            <button
              className="retro-ctrl-btn"
              type="button"
              title="Alternar tema"
              aria-label="Alternar tema"
              onClick={alternarTema}
            >
              {estaEscuro ? <Moon size={16} strokeWidth={2} /> : <Sun size={16} strokeWidth={2} />}
            </button>
          </div>

          <div className="cabecalho__menu-mobile">
            <button
              className="retro-ctrl-btn"
              type="button"
              aria-expanded={menuAberto}
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuAberto((aberto) => !aberto)}
            >
              {menuAberto ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>

            {menuAberto && (
              <div className="menu-mobile" role="menu">
                {itensNavegacao.map(([rota, rotulo]) => (
                  <a
                    className="menu-mobile__item"
                    href={criarHref(rota)}
                    key={rota}
                    role="menuitem"
                    aria-current={rotaAtual === rota ? 'page' : undefined}
                  >
                    {rotulo}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="cabecalho__status retro-statusbar" aria-label="Resumo profissional">
        <span>arturfalavinha.dev.br — {curriculo.titulo.toLowerCase()} · curitiba/pr</span>
        <span className="retro-status">
          <span className="retro-dot" aria-hidden="true" />
          disponível para projetos
        </span>
      </div>
    </header>
  );
}
