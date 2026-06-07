export function Cabecalho({ nome }) {
  const itensNavegacao = [
    ['inicio', 'Inicio'],
    ['perfil', 'Perfil'],
    ['competencias', 'Competencias'],
    ['projetos', 'Projetos'],
    ['formacao', 'Formacao'],
    ['contato', 'Contato'],
  ];

  return (
    <header className="cabecalho">
      <a className="marca" href="#inicio" aria-label="Voltar ao inicio">
        <span className="marca__nome">{nome}</span>
        <span className="marca__subtitulo">Curriculo Online</span>
      </a>

      <nav className="navegacao" aria-label="Navegacao principal">
        {itensNavegacao.map(([idSecao, rotulo]) => (
          <a key={idSecao} href={`#${idSecao}`}>
            {rotulo}
          </a>
        ))}
      </nav>
    </header>
  );
}
