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
        <span className="marca__nome">{nome}</span>
        <span className="marca__subtitulo">Currículo Online</span>
      </a>

      <nav className="navegacao" aria-label="Navegação principal">
        {itensNavegacao.map(([idSecao, rotulo]) => (
          <a key={idSecao} href={`#${idSecao}`}>
            {rotulo}
          </a>
        ))}
      </nav>
    </header>
  );
}
