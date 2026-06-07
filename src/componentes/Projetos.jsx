import { ExternalLink } from 'lucide-react';

export function Projetos({ projetos }) {
  return (
    <div className="grade-projetos">
      {projetos.map((projeto) => (
        <article className="projeto" key={projeto.nome}>
          <div>
            <h3>{projeto.nome}</h3>
            <p>{projeto.descricao}</p>
          </div>

          <div className="projeto__rodape">
            <ul aria-label={`Tecnologias usadas em ${projeto.nome}`}>
              {projeto.tecnologias.map((tecnologia) => (
                <li key={tecnologia}>{tecnologia}</li>
              ))}
            </ul>
            <a href={projeto.link} aria-label={`Acessar ${projeto.nome}`}>
              <ExternalLink aria-hidden="true" size={18} />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
