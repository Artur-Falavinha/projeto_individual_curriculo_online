export function Cabecalho({ curriculo }) {
  const itensNavegacao = [
    ['inicio', 'Início'],
    ['perfil', 'Sobre'],
    ['competencias', 'Stack'],
    ['projetos', 'Projetos'],
    ['formacao', 'Formação'],
    ['contato', 'Contato'],
  ];

  return (
    <header className="cabecalho">
      <a className="marca" href="#inicio" aria-label="Voltar ao inicio">
        <img className="marca__foto" src={curriculo.foto} alt="Foto de Artur Lachoman Falavinha" />
        <span className="marca__nome">{curriculo.nome}</span>
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
