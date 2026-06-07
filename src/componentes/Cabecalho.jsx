export function Cabecalho({ curriculo, rotaAtual }) {
  const base = import.meta.env.BASE_URL;
  const itensNavegacao = [
    ['about', 'Sobre'],
    ['stack', 'Stack'],
    ['projects', 'Projetos'],
    ['contact', 'Contato'],
  ];

  const criarHref = (rota = '') => `${base}${rota}`.replace(/\/{2,}/g, '/');
  const caminhoFoto = `${base}${curriculo.foto.replace(/^\//, '')}`.replace(/\/{2,}/g, '/');

  return (
    <header className="cabecalho">
      <nav className="cabecalho__nav" aria-label="Navegação principal">
        <a className="marca" href={criarHref()} aria-current={rotaAtual === 'inicio' ? 'page' : undefined}>
          <img className="marca__foto" src={caminhoFoto} alt="Foto de Artur Lachoman Falavinha" />
          <span className="marca__nome">
            Artur Falavinha
            <span className="marca__cursor" aria-hidden="true" />
          </span>
        </a>

        <span className="cabecalho__divisor" aria-hidden="true">
          |
        </span>

        <ul className="navegacao">
          {itensNavegacao.map(([rota, rotulo]) => (
            <li key={rota}>
              <a href={criarHref(rota)} aria-current={rotaAtual === rota ? 'page' : undefined}>
                {rotaAtual === rota ? `[${rotulo}]` : rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="cabecalho__status" aria-label="Resumo profissional">
        <span>{curriculo.titulo}</span>
        <span>{curriculo.localizacao.replace(', Brasil', '/BR')}</span>
      </div>
    </header>
  );
}
