import { CircleDot } from 'lucide-react';

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
        {competencias.map((competencia, indice) => (
          <div className="competencia" key={competencia}>
            <span className="competencia__indice">{String(indice + 1).padStart(2, '0')}</span>
            <CircleDot aria-hidden="true" size={18} />
            <span>{competencia}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
