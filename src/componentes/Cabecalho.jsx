export function Cabecalho({ nome }) {
  const itensNavegacao = [
    ['inicio', 'Início'],
    ['perfil', 'Perfil'],
    ['competencias', 'Competências'],
    ['projetos', 'Projetos'],
    ['formacao', 'Formação'],
    ['contato', 'Contato'],
  ];

  return (
    <header className="cabecalho">
      <a className="marca" href="#inicio" aria-label="Voltar ao inicio">
        <span className="marca__sinal" aria-hidden="true">
          AF
        </span>
        <span className="marca__nome">{nome}</span>
        <span className="marca__subtitulo">Currículo Online / DS881</span>
      </a>

      <nav className="navegacao" aria-label="Navegação principal">
        {itensNavegacao.map(([idSecao, rotulo], indice) => (
          <a key={idSecao} href={`#${idSecao}`}>
            <span aria-hidden="true">{String(indice + 1).padStart(2, '0')}</span>
            {rotulo}
          </a>
        ))}
      </nav>
    </header>
  );
}
