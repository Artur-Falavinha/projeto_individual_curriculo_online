import { CheckCircle2 } from 'lucide-react';

export function PerfilCompetencias({ resumo, competencias, idiomas }) {
  return (
    <div className="perfil-competencias">
      <article className="perfil">
        <h3>Perfil profissional</h3>
        <p>{resumo}</p>

        <div className="idiomas">
          <h4>Idiomas</h4>
          <ul>
            {idiomas.map(({ idioma, nivel }) => (
              <li key={idioma}>
                <strong>{idioma}</strong>
                <span>{nivel}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className="competencias">
        {competencias.map((competencia) => (
          <div className="competencia" key={competencia}>
            <CheckCircle2 aria-hidden="true" size={18} />
            <span>{competencia}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
